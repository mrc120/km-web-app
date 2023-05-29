module.exports = app => {
    var router = require("express").Router();
    const upload = require("../../middleware/upload");
    const { getAllZarzadzenia, openFile, uploadFileZarz,
        updateFileZarzadzenia, deleteFileZarzadzenia } = require("../../controllers/file.controller");

    router.get("/files_zarz/", getAllZarzadzenia);

    router.get("/files_zarz/:name", openFile);

    router.post("/upload_zarz", upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file_attachment", maxCount: 1 }
    ]), uploadFileZarz);

    router.put("/files_zarz/:id", updateFileZarzadzenia)

    router.delete("/files_zarz/:id", deleteFileZarzadzenia);

    app.use("/api", router);
}
