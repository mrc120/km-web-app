const upload = require("../middleware/upload");

const multipleUpload = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.files);

        if (req.files ) {
            return res.send(`Musisz zaznaczyć minimum 1 plik`);
        }
        return res.send(`Plik został pomyślnie przesłany`);

    } catch(error) {
        console.log(error);

        if (error.code === "LIMIT_UNEXPECTED_FILE"){
            return res.send("Za duzo plików do przesłania (MAX 10)");
        }
        return res.send(`Bład podczas próby wysłania wielu plików: ${error}`)
    }
};
module.exports = {
    multipleUpload: multipleUpload
};
