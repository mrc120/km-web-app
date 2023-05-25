module.exports = app => {
    var router = require("express").Router();
    const File_zarzadzenia = require("../../controllers/files/file_zarzadzenia.controller");
    const upload = require("../../middleware/upload");
    const { getAllZarzadzenia, openFile, uploadFileZarz } = require("../../controllers/files/file_uchwaly.controller");

    router.get("/files_zarz/", getAllZarzadzenia);

    router.get("/files_zarz/:name", openFile);

    router.post("/upload_zarz", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), uploadFileZarz);

    app.use("/api", router);
}
