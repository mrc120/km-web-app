module.exports = app => {
    var router = require("express").Router();
    const fileController = require("../controllers/file.controller");
    const upload = require("../middleware/upload");

    router.get("/files_podst/", fileController.getListFiles_podst);

    router.get("/files_podst/:name", fileController.openFile);

    router.post("/upload_podst", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), fileController.uploadFiles_podst);

    router.put("/files_podst/:id", fileController.update_file_podst);

    router.delete("/files_podst/:id", fileController.delete_file_podst)

    app.use("/api", router);
}