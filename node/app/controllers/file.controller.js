const fs = require("fs");
const { title } = require("process");
const { Buffer } = require('buffer');
const db = require("../models");
const File = db.file;
const File_podst = db.file_podst;
const File_zarz = db.file_zarz;
const Op = db.Sequelize.Op;

const baseUrl = "http://localhost:8080/api/files"
const baseUrl_zarz = "http://localhost:8080/api/files_zarz"
const baseUrl_podst = "http://localhost:8080/api/files_podst"

//PAGINATION 

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems,
          rows : entries     }  = data;
  const currentPage = page ? + page : 0;
  const totalPages  = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, entries,};
};


//UPLOAD
exports.uploadFiles = async (req, res) => {

  try {
    File.create({
      title: req.body.title,
      description: req.body.description,
      name: req.files['file'][0].originalname,
      nameAtt: req.files['file_attachment'][0].originalname,
      data: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.files['file'][0].filename, 'UTF-8'
      ),

      attachment: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.files['file_attachment'][0].filename, 'UTF-8'
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.name,
        file.data
      );
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.name,
        file.attachment
      );

      // console.log(req.files['file'][0].originalname)
      // console.log(req.files['file'][0].fieldname)
      return res.send(`Plik został wysłany.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
};

exports.uploadFiles_zarz = async (req, res) => {

  try {
    File_zarz.create({
      title: req.body.title,
      description: req.body.description,
      name: req.files['file'][0].originalname,
      nameAtt: req.files['file_attachment'][0].originalname,
      data: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.files['file'][0].filename, 'UTF-8'
      ),

      attachment: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.files['file_attachment'][0].filename, 'UTF-8'
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.name,
        file.data
      );
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.nameAtt,
        file.attachment
      );

      // console.log(req.files['file'][0].originalname)
      // console.log(req.files['file'][0].fieldname)
      return res.send(`Plik został wysłany.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
};

exports.uploadFiles_podst = async (req, res) => {
 
  try {
    File_podst.create({
      title: req.body.title,
      description: req.body.description,
      name: req.files['file'][0].originalname,
      nameAtt: req.files['file_attachment'][0].originalname,
      data: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.files['file'][0].filename, 'UTF-8'
      ),

      attachment: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.files['file_attachment'][0].filename, 'UTF-8'
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.name,
        file.data
      );
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.nameAtt,
        file.attachment
      );
      return res.send(`Plik został wysłany.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
};

//GETLIST

exports.getListFiles = (req, res) => {
//pagination
const { page, size, title } = req.query;
var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
const { limit, offset } = getPagination(page, size);

const directoryPath = __basedir + "/app/resources/static/assets/uploads/";

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    res.status(500).send({
      message: "Błąd w wydobyciu plików!",
    });
  }

  File.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      let fileInfos = [];
      files.forEach((file) => {
        fileInfos.push({
          url: baseUrl + file,
        });
      });
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
})
};

exports.getListFiles_zarz = (req, res) => {
  //pagination
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  const directoryPath = __basedir + "/app/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Błąd w wydobyciu plików!",
      });
    }

    File_zarz.findAndCountAll({ where: condition, limit, offset })
      .then(data => {
        const response = getPagingData(data, page, limit);
        let fileInfos = [];
        files.forEach((file) => {
          fileInfos.push({
            url: baseUrl + file,
          });
        });
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  })
};

exports.getListFiles_podst = (req, res) => {
   //pagination
   const { page, size, title } = req.query;
   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
   const { limit, offset } = getPagination(page, size);
 
   const directoryPath = __basedir + "/app/resources/static/assets/uploads/";
 
   fs.readdir(directoryPath, function (err, files) {
     if (err) {
       res.status(500).send({
         message: "Błąd w wydobyciu plików!",
       });
     }
 
     File_podst.findAndCountAll({ where: condition, limit, offset })
       .then(data => {
         const response = getPagingData(data, page, limit);
         let fileInfos = [];
         files.forEach((file) => {
           fileInfos.push({
             url: baseUrl + file,
           });
         });
         res.send(response);
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while retrieving tutorials."
         });
       });
   })
};

//Potrzebne to w ogóle?

// exports.getSingleFile = (req, res) => {

//   const id = req.params.id;
//   File.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Nie przywrocono danych po id:" + id
//       });
//     });
// };

exports.openFile = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/app/resources/static/assets/uploads/";
  res.sendFile(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Nie można otworzyć pliku, błąd: " + err,
      });
    }
  });
};

//UPDATE 
exports.update_file = (req, res) => {
  const id = req.params.id;
  try {


    File.update({
      title: req.body.title,
      description: req.body.description,

    }, { where: { id: id } })
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
  return res.send(`Plik został wysłany.`);
};

exports.update_file_zarz = (req, res) => {
  const id = req.params.id;
  try {
    File_zarz.update({
      title: req.body.title,
      description: req.body.description,
    }, { where: { id: id } })
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
  return res.send(`Plik został wysłany.`);
};

exports.update_file_podst = (req, res) => {
  const id = req.params.id;
  try {
    File_podst.update({
      title: req.body.title,
      description: req.body.description,
    }, { where: { id: id } })
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
  return res.send(`Plik został wysłanXDy.`);
};

//DELETE_FILE

exports.delete_file = (req, res) => {

  const id = req.params.id;
  File.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pozycja została usunięta!"
        });
      } else {
        res.send({
          message: `Nie można usunąć id=${id}.`
        });

      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nie można usunąć" + id
      });
    });
};

exports.delete_file_zarz = (req, res) => {

  const id = req.params.id;
  File_zarz.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pozycja została usunięta!"
        });
      } else {
        res.send({
          message: `Nie można usunąć id=${id}.`
        });

      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nie można usunąć" + id
      });
    });
};

exports.delete_file_podst = (req, res) => {

  const id = req.params.id;
  File_podst.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pozycja została usunięta!"
        });
      } else {
        res.send({
          message: `Nie można usunąć id=${id}.`
        });

      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Nie można usunąć" + id
      });
    });
};

