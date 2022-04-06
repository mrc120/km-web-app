module.exports = app => {
    var router = require("express").Router();
    const uploadController = require("../controllers/file.controller");
    const upload = require("../middleware/upload");

    router.get("/files/", uploadController.getListFiles);

    router.get("/files/:name", uploadController.openFile);

    router.post("/upload", upload.single("file"), uploadController.uploadFiles);

    app.use("/api", router);
}