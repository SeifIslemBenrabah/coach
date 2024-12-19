const express = require('express')
const router =express.Router()
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    }
  });
  
  const upload = multer({ storage: storage });
const Authjwt = require('../middleware/authjwt.js');
const { addfile,getfile,deletefile} = require('../controllers/file.controller.js')
//add
router.post('/',Authjwt(),upload.single('file'),addfile)
//getfilesofuser
router.get('/:id',getfile)
router.delete('/:id',deletefile)
module.exports = router