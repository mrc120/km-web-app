const fs = require("fs");
const { title } = require("process");
const request = require('request');

const db = require("../models");

const File = db.file;
const File_podst = db.file_podst;
const File_zarz = db.file_zarz;


const baseUrl = "http://localhost:8080/api/files"
const baseUrl_zarz = "http://localhost:8080/api/files_zarz"
const baseUrl_podst = "http://localhost:8080/api/files_podst"

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`Musisz wybrac plik.`);
    }

    File.create({
      title: req.body.title,
      description: req.body.description,
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

const uploadFiles_zarz = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`Nie wybrano pliku.`);
    }

    File_zarz.create({
      title: req.body.title,
      description: req.body.description,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/app/resources/static/assets/uploads/" + req.file.filename, 'UTF-8'
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

const uploadFiles_podst = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`Musisz wybrac plik.`);
    }

    File_podst.create({
      title: req.body.title,
      name: req.file.originalname,
      description: req.body.description,
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
    //uchwaly
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


const getListFiles_zarz = (req, res) => {
  const directoryPath_zarz = __basedir + "/app/resources/static/assets/uploads/";

  fs.readdir(directoryPath_zarz, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Błąd w wydobyciu plików!",
      });
    }
    //uchwaly
    File_zarz.findAll()
      .then(state => {
        res.send(state);
        let fileInfos = [];
        files.forEach((file) => {
          fileInfos.push({
            url: baseUrl_zarz + file,
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

const getListFiles_podst = (req, res) => {
  const directoryPath = __basedir + "/app/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Błąd w wydobyciu plików!",
      });
    }
    //uchwaly
    File_podst.findAll()
      .then(state => {
        res.send(state);
        let fileInfos = [];
        files.forEach((file) => {
          fileInfos.push({
            url: baseUrl_podst + file,
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
  uploadFiles_zarz,
  uploadFiles_podst,

  getListFiles,
  getListFiles_zarz,
  getListFiles_podst,

  openFile
};