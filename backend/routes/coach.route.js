const express = require('express');
const Authjwt = require('../middleware/authjwt.js');
const router = express.Router();
const {createcoach,getcoach,updatecoach} =require('../controllers/coach.controller.js')
//add
router.post('/',createcoach)
//get
router.get('/:id',Authjwt(),getcoach)
//update
router.put('/:id',Authjwt(),updatecoach)


module.exports =router;