const Coach = require('../modules/coach.model.js')
const bcrypt = require('bcryptjs');
//create coach
const createcoach = async(req,res)=>{
    try {
        const salt = await bcrypt.genSalt();
        req.body.email = req.body.email.toLowerCase()
        const hashedPassword = await bcrypt.hash(req.body.password,  salt); 
        req.body.password = hashedPassword;
        const coach = await Coach.create(req.body);
        console.log(req.body);
        console.log('user is created!!');
        res.status(201).json(coach)
    } catch (err) {
        console.error('Error creating user:', err.message); 
        res.status(500).json({ error: 'User creation failed.' }); 
    }
}
//get coach
const getcoach = async(req,res)=>{
    try{
        const {id} = req.params
        const coach =await Coach.findById(id)
        res.status(200).json(coach)
      }catch(err){
        console.log(err)
      }
}
//update coach
const updatecoach = async (req,res) =>{
    try{
        const {id} = req.params
        const coach = await Coach.findById(id)
        if(!coach){
          return res.status(404).json({msg:"there is no user with this id"})
        }
        await coach.set(req.body)
        res.status(200).json({msg:"user is updated "})
    }catch(err){
      console.log(err)
    }
}
module.exports = {
    createcoach,
    getcoach,
    updatecoach    
};