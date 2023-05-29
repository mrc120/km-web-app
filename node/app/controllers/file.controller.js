const fs = require("fs");
const db = require("../models");
const Op = db.Sequelize.Op;

const File_uchwaly = db.file_uchwaly;
const File_zarzadzenia = db.file_zarz;
const File_podstawy = db.file_podst

const baseUrl = "http://localhost:8080/api/uchwaly"

//UPLOAD
const uploadFiles = (FileModel) => async (req, res) => {
    try {
        await FileModel.create({
            title: req.body.title,
            description: req.body.description,
            name: req.files['file'][0].originalname,
            nameAtt: req.files['file_attachment'] ?
                req.files['file_attachment'][0].originalname : null,
            data: fs.readFileSync(__basedir + "/app/resources/static/assets/uploads/" +
                req.files['file'][0].filename),
            attachment: req.files['file_attachment'] ?
                fs.readFileSync(__basedir + "/app/resources/static/assets/uploads/" +
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
        return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
    };
}
const uploadFileUchwaly = uploadFiles(File_uchwaly);
const uploadFileZarz = uploadFiles(File_zarzadzenia);
const uploadFilePodst = uploadFiles(File_podstawy);

//GET
const getAll = (FileModel) => async (req, res) => {
    const { page, size, title } = req.query;         //pagination
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const directoryPath = __basedir + "/app/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Błąd w wydobyciu plików!",
            });
        }
        FileModel.findAll({
            where: condition,
            attributes: ['id', 'title', 'description', 'name', 'nameAtt']
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
                message: err.message || `Wystąpił błąd ${err}`
            });
        });
    })
}
const getAllUchwaly = getAll(File_uchwaly);
const getAllZarzadzenia = getAll(File_zarzadzenia);
const getAllPodstawy = getAll(File_podstawy);


//UPDATE 
const update_file = (FileModel) => async (req, res) => {
    try {
        const id = req.params.id;
        await FileModel.update({
            description: req.body.description,
            title: req.body.title
        }, { where: { id: id } })
        return res.send(`Plik został wysłany.`);
    } catch (error) {
        console.log(error);
        return res.send(`Błąd podczas wysyłki pliku do serwera: ${error}`);
    }
};
const updateFileUchwaly = update_file(File_uchwaly);
const updateFileZarzadzenia = update_file(File_zarzadzenia);
const updateFilePodstawy = update_file(File_podstawy);

//DELETE_FILE
const delete_file = (FileModel) => async (req, res) => {
    try {
        const id = req.params.id;
        await FileModel.destroy({ where: { id: id } })
            .then((num) => {
                if (num == 1) {
                    res.send({ message: "Pozycja została usunięta!" });
                } else {
                    res.send({ message: `Nie można usunąć id=${id}.` });
                }
            }).catch((err) => {
                res.status(500).send({
                    message: "Nie można usunąć" + id,
                    error: err,
                });
            });
    } catch (error) {
        res.status(500).send({
            message: "Błąd podczas usuwania pliku: " + error,
        });
    }
};
const deleteFileUchwaly = delete_file(File_uchwaly);
const deleteFileZarzadzenia = delete_file(File_zarzadzenia);
const deleteFilePodstawy = delete_file(File_podstawy);

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
}
module.exports = {
    uploadFileUchwaly, uploadFileZarz, uploadFilePodst,
    getAllUchwaly, getAllZarzadzenia, getAllPodstawy,
    updateFileUchwaly, updateFileZarzadzenia, updateFilePodstawy,
    deleteFileUchwaly, deleteFileZarzadzenia, deleteFilePodstawy,
    openFile
}
