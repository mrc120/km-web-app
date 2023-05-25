module.exports = app => {
    var router = require("express").Router();
    const upload = require("../../middleware/upload");
    const { getAllPodstawy, openFile, uploadFilePodst } = require("../../controllers/files/file_uchwaly.controller");

    router.get("/files_podst/", getAllPodstawy);

    router.get("/files_podst/:name", openFile);

    router.post("/upload_podst", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), uploadFilePodst);

    app.use("/api", router);
}