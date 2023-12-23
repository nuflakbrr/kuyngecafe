const multer = require('multer');
const path = require('path');

const storageMenu = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/");
  },
  filename: (req, file, cb) => {
    cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadMenu = multer({ storage: storageMenu });
module.exports = uploadMenu;
