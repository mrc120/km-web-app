
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
}