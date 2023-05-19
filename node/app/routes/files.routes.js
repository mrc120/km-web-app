module.exports = app => {
    var router = require("express").Router();
    const fileController = require("../controllers/file.controller");
    const upload = require("../middleware/upload");

    router.get("/files", fileController.findAll);
    router.get("/files/:id_uchwaly", fileController.openFile);
    router.post("/upload",
        upload.fields([
            { name: "file", maxCount: 1 },
            { name: "file_attachment", maxCount: 1 }
        ]), fileController.uploadFiles);

    router.put("/files/:id", fileController.update_file);

    router.delete("/files/:id", fileController.delete_file);

    app.use("/api", router);
} 