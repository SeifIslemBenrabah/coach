const File = require('../modules/file.model')
const User = require('../modules/user.model')
const path = require('path');
const fs = require('fs');
//add
const addfile = async (req, res) => {
    try {
        const {user,type} =req.body
        const filepath = req.file ? 'uploads/' + req.file.filename : null; 
        if(!user){
            return res.status(404).json({msg:"need user"})
        }
        const userID = await User.findById(user)
        if(!userID){
            return res.status(404).json({msg:"there is no user"})
        }
        const existingFile = await File.findOne({ user, type });
        if (existingFile) {
            return res.status(400).json({ msg: "File of this type already exists for the user" });
        }
        const file = await File.create({filepath,type,user});
        await User.findByIdAndUpdate(user, {
            $push: { file: file._id }
        });
        console.log(req.body);  
        console.log('file is added!!');
        res.status(201).json(file)
    } catch (err) {
        console.log(err)
    }
};

  
//get
const getfile = async (req, res) => {
    try {
        const {id} = req.params; 
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const file = await File.find({ user: id });
        if (!file) {
            return res.status(404).json({ msg: "File not found for this user" });
        };
        console.log(file);
        res.status(203).json(file)
    } catch (err) {
        res.status(500).json({ msg: "Error fetching file", error: err });
    }
};
const updatefile = async(req,res)=>{
    try{
        const {id} =req.params
        const file = await File.findById(id)
        if(!file){
            res.status(404).json({msg:"there is no file with this id"})
        }
        await File.set(req.body)
        res.status(200).json({msg:"the file is updated"})
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
const deletefile = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the file in the database
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ msg: "There is no file with this ID" });
        }

        // Construct the full file path
        const filePath = path.join("C:\\Users\\admin\\Desktop\\DEV\\coach\\backend\\", file.filepath);

        // Delete the file from the filesystem
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error('Failed to delete file:', err);
                return res.status(500).json({ error: 'Failed to delete file from server',filePath });
            }

            // Delete the file record from the database
            await File.findByIdAndDelete(id);
            return res.status(200).json({ message: 'File deleted successfully' });
        });
    } catch (err) {
        console.error('Error deleting file:', err);
        res.status(500).json({ msg: "Server error", error: err });
    }
};

module.exports = {
    addfile,
    updatefile,
    deletefile,
    getfile
}