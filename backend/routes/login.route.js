const express = require('express');
const router = express.Router();
const {loginuser} = require('../controllers/user.controller.js')

router.post('/',loginuser)
module.exports =router;