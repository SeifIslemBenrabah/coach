const express = require('express');
const Authjwt = require('../middleware/authjwt.js');
const router = express.Router();
const {createuser,getusers,getuser,updateuser,deleteuser} =require('../controllers/user.controller.js')
//add
router.post('/',Authjwt(),createuser)
//get all
router.get('/', Authjwt(),getusers)
//get one
router.get('/:id',getuser)
//delete
router.delete('/:id',Authjwt(),deleteuser)
//update
router.put('/:id',Authjwt(),updateuser)


module.exports =router;