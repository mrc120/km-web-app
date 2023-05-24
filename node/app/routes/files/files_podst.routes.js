module.exports = app => {
    var router = require("express").Router();
    const File_polecenia = require("../../controllers/files/file_polecenia.controller");
    const upload = require("../../middleware/upload");
    const openPdf = require("../../controllers/files/openFile.controller");

    router.get("/files_podst/", File_polecenia.getListFiles_podst);

    router.get("/files_podst/:name", openPdf.openFile);

    router.post("/upload_podst", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), File_polecenia.uploadFiles_podst);

    app.use("/api", router);
}