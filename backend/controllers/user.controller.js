const User = require('../modules/user.model')
const Coach = require('../modules/coach.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
//create user
const createuser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        req.body.email = req.body.email.toLowerCase()
        const hashedPassword = await bcrypt.hash(req.body.password,  salt); 
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        console.log(req.body);
        console.log('user is created!!');
        res.status(201).json(user)
    } catch (err) {
        console.error('Error creating user:', err.message); // Log the actual error message
        res.status(500).json({ error: 'User creation failed.' }); // Return a response to the client
    }
};

//get all users
const getusers = async (req,res) =>{
  try{
    const users = await User.find({}, { password: 0 });

    res.status(200).json(users)
  }catch(err){
    res.status(500).json(err)
  }
}
//get one user
const getuser = async(req,res)=>{
  try{
  const {id} = req.params
  const user =await User.findById(id)
  res.status(200).json(user)
}catch(err){
  console.log(err)
}
}
//update user
const updateuser = async (req,res)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id)
        if(!user){
          return res.status(404).json({msg:"there is no user with this id"})
        }
        await user.set(req.body)
        res.status(200).json({msg:"user is updated "})
    }catch(err){
      console.log(err)
    }
}
//delete
const deleteuser = async (req, res) => {
    try {
      const { id } = req.params; 
      console.log(`Attempting to delete user with ID: ${id}`);
      const user = await User.findOne({
        where: { id: id },
      });
  
      if (!user) {
        return res.status(404).json({ msg: 'This user does not exist' });
      }
  
      // Delete the user
      await user.destroy();
      res.status(200).json({ msg: 'User is deleted !!' });
    } catch (err) {
      console.error('Error occurred while deleting user:', err); 
      res.status(500).json({ error: 'An error occurred while deleting the user' }); 
    }
  };
  //login
  const loginuser = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
const coach = await Coach.findOne({ email: req.body.email.toLowerCase() });

if (!user && !coach) {
    return res.status(404).json({ msg: 'User or Coach not found' });
}
if(user){
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const accessToken = jwt.sign({ email: user.email}, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
      } else {
        res.status(403).send('Invalid credentials');
      }}
      else if(coach){
        const match = await bcrypt.compare(req.body.password, coach.password);
      if (match) {
        const accessToken = jwt.sign({ email: coach.email}, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
      } else {
        res.status(403).send('Invalid credentials');
      }
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  
  module.exports = {
    loginuser,
    createuser,
    getuser,  
    getusers,    
    updateuser,
    deleteuser,     
};