module.exports = app => {
    var router = require("express").Router();
    const File_zarzadzenia = require("../../controllers/files/file_zarzadzenia.controller");
    const upload = require("../../middleware/upload");
    const openPdf = require("../../controllers/files/openFile.controller");

    router.get("/files_zarz/", File_zarzadzenia.getListFiles_zarz);

    router.get("/files_zarz/:name", openPdf.openFile);

    router.post("/upload_zarz", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), File_zarzadzenia.uploadFiles_zarz);

    app.use("/api", router);
}
