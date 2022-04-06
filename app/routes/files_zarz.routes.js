module.exports = app => {
    var router = require("express").Router();
    const uploadController = require("../controllers/file.controller");
    const upload = require("../middleware/upload");

    router.get("/files_zarz/", uploadController.getListFiles_zarz);

    router.get("/files_zarz/:name", uploadController.openFile);

    router.post("/upload_zarz", upload.single("file"), uploadController.uploadFiles_zarz);

    app.use("/api", router);
}