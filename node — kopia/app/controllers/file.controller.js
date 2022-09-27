const fs = require("fs");
const { title } = require("process");
const request = require('request');

const db = require("../models");

const File = db.file;
const File_pol = db.file_pole;
const File_zarz = db.file_zarz;


const baseUrl = "http://localhost:8080/api/files"
const baseUrl_zarz = "http://localhost:8080/api/zarzadzenia"
const baseUrl_pole = "http://localhost:8080/api/polecenia_sluzb"

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`Musisz wybrac plik.`);
    }

    File.create({
      title: req.body.title,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((file) => {
      fs.writeFileSync(
        __basedir + "/app/resources/static/assets/tmp/" + file.name,
        file.data
      );

      return res.send(`Plik został wysłany.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/app/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Błąd w wydobyciu plików!",
      });
    }

    File.findAll()
      .then(state => {
        res.send(state);
        let fileInfos = [];
        files.forEach((file) => {
          fileInfos.push({
            url: baseUrl + file,
          });
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Wystąpił błąd podczas wydobywania danych."
        });
      });

  });
};

const openFile = (req, res) => {
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

module.exports = {
  uploadFiles,
  getListFiles,
  openFile
};