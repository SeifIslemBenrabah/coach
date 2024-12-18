const File = require('../modules/file.model')
const User = require('../modules/user.model')
const path = require('path');
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
        const {id} = req.params;  // `userId` is passed as the first parameter, `fileId` is the second

        // Find the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Find the file for the specific user
        const file = await File.findOne({ user: id });
        if (!file) {
            return res.status(404).json({ msg: "File not found for this user" });
        }

        // Set response headers and send the file
        res.set({
            'Content-Type': 'multipart/form-data',
            'X-Custom-Header': 'CustomHeaderValue',
        });

        const filePath = path.join('C:/Users/admin/Desktop/DEV/coach/backend/', file.filepath);  // Corrected file path
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).json({ msg: "Error sending the file." });
            }
        });
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
const deletefile = async(req,res)=>{
    try{
        const {id} = req.params
        const file = await File.findById(id)
        if(!file){
            res.status(404).json({msg:"there is no fiche with this id"})
        }
        await File.findByIdAndDelete(id)
        res.status(200).json({msg:"the file is deleted"})
    }
    catch(err){
        res.status(500).json({msg:err})
    }
}
module.exports = {
    addfile,
    updatefile,
    deletefile,
    getfile
}