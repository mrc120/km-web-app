const fs = require("fs");
const db = require("../../models");
const File_podst = db.file_podst;
const Op = db.Sequelize.Op;

const baseUrl = "http://localhost:8080/api/files_podst"

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
        __basedir + "/app/resources/static/assets/uploads/" + file.name,
        file.data
      );
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + file.nameAtt,
        file.attachment
      );
      return res.send(`Plik został wysłany.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
};


//GET
exports.getListFiles_podst = (req, res) => {

  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const directoryPath = __basedir + "/app/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Błąd w wydobyciu plików!",
      });
    }
    File_podst.findAndCountAll({
      where: condition, 
      attributes: ['id', 'title', 'description', 'name']
    })
      .then(data => {
        const response = data;
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
            err.message || "Wystąpił błąd."
        });
      });
  })
};

//UPLOAD
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

//DELETE
exports.delete_file_podst = (req, res) => {
  const id = req.params.id;
  File_podst.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: "Pozycja została usunięta!"
        });
      } else {
        res.send({
          message: `Nie można usunąć id=${id}.`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Nie można usunąć" + id
      });
    });
};

