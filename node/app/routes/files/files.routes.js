module.exports = app => {
    var router = require("express").Router();
    const File_uchwaly = require("../../controllers/files/file_uchwaly.controller");
    const upload = require("../../middleware/upload");
    const openPdf = require("../../controllers/files/openFile.controller")

    router.get("/files/", File_uchwaly.getAll);

    router.get("/files/:name", openPdf.openFile);

    router.post("/upload", upload.single("file"), File_uchwaly.uploadFiles);

    app.use("/api", router);
}