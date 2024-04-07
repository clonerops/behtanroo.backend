const multer = require('multer')

const maxSize = 10 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './resources/static/uploads/document');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
})

module.exports = uploadFile; 