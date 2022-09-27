const multer = require("multer");

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('application/pdf')) {
    cb(null, true);
  } else {
    cb("Tylko pliki PDF są przyjmowane ", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/app/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`   );
  },

});

var uploadFile = multer({ storage: storage, fileFilter: pdfFilter });
module.exports = uploadFile;