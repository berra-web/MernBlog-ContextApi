const router = require('express').Router();
const multer = require('multer');  // Med multer vi kan upload file or image


// Med den här functionen vi laddar upp file i Client side
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'image')
    },
    filename: (req, file, cb) => {
      cb(null, 'Hello.jpeg')
    }
  });

  const upload = multer({storage: storage});

  router.post('/upload', upload.single('file'), (req, res) => {
      try {
         res.status(200).json('File has been uplpoaded!') 
      } catch (error) {
          res.status(500).json(error)
      }
  })


  module.exports = router;