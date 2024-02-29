const multer = require("multer");
const multerStorage = require("../helpers/multerStorage");

const upload = multer({ storage: multerStorage });

const multerMiddleware = (req, res, next) => {
  upload.array("images")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err);
      return next(err);
    }
    // console.log('Multer middleware passed, proceeding to the controller.');
    next();
  });
};

module.exports = multerMiddleware;
