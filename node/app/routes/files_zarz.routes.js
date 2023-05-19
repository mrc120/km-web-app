module.exports = app => {
    var router = require("express").Router();
    const fileController = require("../controllers/file.controller");
    const upload = require("../middleware/upload");

    router.get("/files_zarz/", fileController.getListFiles_zarz);

    router.get("/files_zarz/:name", fileController.openFile)



    router.post("/upload_zarz", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), fileController.uploadFiles_zarz);

    router.put("/files_zarz/:id", fileController.update_file_zarz);

    router.delete("/files_zarz/:id", fileController.delete_file_zarz)

    app.use("/api", router);
}