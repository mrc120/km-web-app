const fs = require("fs");
const db = require("../../models");

const Op = db.Sequelize.Op;

const File_uchwaly = db.file_uchwaly;
const File_zarzadzenia = db.file_zarz;
const File_podstawy = db.file_podst

const baseUrl = "http://localhost:8080/api/uchwaly"


//UPLOAD
const uploadFiles = (FileModel) => {
    return async (req, res) => {
        try {
            FileModel.create({
                title: req.body.title,
                description: req.body.description,
                name: req.files['file'][0].originalname,
                nameAtt: req.files['file_attachment'] ? req.files['file_attachment'][0].originalname: null,
                data: fs.readFileSync(__basedir + "/app/resources/static/assets/uploads/" +
                    req.files['file'][0].filename),
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
    // Utworzenie funkcji findOne dla trzech modeli plików
}
const uploadFileUchwaly = uploadFiles(db.file_uchwaly);
const uploadFileZarz = uploadFiles(db.file_zarz);
const uploadFilePodst = uploadFiles(db.file_podst);

module.exports = { uploadFileUchwaly, uploadFileZarz, uploadFilePodst };




//GET
exports.getAll = async (req, res) => {
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
        File_uchwaly.findAndCountAll({
            where: condition,
            attributes: ['id_uchwaly', 'title', 'description', 'name', 'nameAtt']
        }).then(data => {
            const response = data;
            let fileInfos = [];
            files.forEach((file) => {
                fileInfos.push({
                    url: baseUrl + file,
                });
            });
            res.send(response);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving "
            });
        });
    })
};

//UPDATE 
exports.update_file = async (req, res) => {
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

//DELETE_FILE
exports.delete_file = async (req, res) => {
    const id = req.params.id;
    File.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Pozycja została usunięta!" });
            } else {
                res.send({ message: `Nie można usunąć id=${id}.` });
            }
        }).catch(err => {
            res.status(500).send({
                message: "Nie można usunąć" + id
            });
        });
};