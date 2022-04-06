module.exports = app => {
    var router = require("express").Router();
    const uploadController = require("../controllers/file.controller");
    const upload = require("../middleware/upload");

    router.get("/files_podst/", uploadController.getListFiles_podst);

    router.get("/files_podst/:name", uploadController.openFile);

    router.post("/upload_podst", upload.single("file"), uploadController.uploadFiles_podst);

    app.use("/api", router);
}