const fs = require("fs");
const db = require("../../models");
const File_zarz = db.file_zarz;
const Op = db.Sequelize.Op;

const baseUrl = "http://localhost:8080/api/files_zarz"

//UPLOAD
exports.uploadFiles_zarz = async (req, res) => {
    try {
        File_zarz.create({
            title: req.body.title,
            description: req.body.description,
            name: req.files['file'][0].originalname,
            nameAtt: req.files['file_attachment'] ? req.files['file_attachment'][0].originalname : null,
            data: fs.readFileSync(__basedir + "/app/resources/static/assets/uploads/" + req.files['file'][0].filename),
            attachment: req.files['file_attachment'] ? fs.readFileSync(__basedir + "/app/resources/static/assets/uploads/" +
                req.files['file_attachment'][0].filename) : null,
        }).then((file) => {
            fs.writeFileSync(
                __basedir + "/app/resources/static/assets/tmp/" + file.name,
                file.data
            );
            file.attachment ? fs.writeFileSync(
                __basedir + "/app/resources/static/assets/tmp/" + file.nameAtt,
                file.attachment
            ) : null;
            return res.send(`Plik został wysłany.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
    }
};

//GETLIST
exports.getListFiles_zarz = async (req, res) => {
    //pagination
    const { page, size, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const directoryPath = __basedir + "/app/resources/static/assets/uploads/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Błąd w wydobyciu plików!",
            });
        }

        File_zarz.findAll({
            where: condition,
            attributes: ['id', 'title', 'description', 'name', 'nameAtt']
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
                        err.message || "Some error occurred while retrieving "
                });
            });
    })
};

//UPDATE
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

//DELETE
exports.delete_file_zarz = (req, res) => {

    const id = req.params.id;
    File_zarz.destroy({
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

