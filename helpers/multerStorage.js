const multer = require("multer");

module.exports = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
