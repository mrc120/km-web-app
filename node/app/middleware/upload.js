const multer = require("multer");
const path = require("path")

const fileFilter = (req, file, cb) => {

// ZMIENNE MIME TYPE DLA TYPU PLIKU 
const PDF = file.mimetype.startsWith('application/pdf')
const X7Z = file.mimetype.startsWith('application/x-7z-compressed')
const ZIP = file.mimetype.startsWith('application/zip')

  if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('application/zip')) {
    cb(null, true);
  } else {
    cb("Tylko pliki PDF, 7z oraz ZIP są przyjmowane ", false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __basedir + "/app/resources/static/assets/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var uploadFile = multer({
  storage: storage,

})
module.exports = uploadFile;