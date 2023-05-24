module.exports = app => {
    var router = require("express").Router();
    const File_uchwaly = require("../../controllers/files/file_uchwaly.controller");
    const upload = require("../../middleware/upload");
    const openPdf = require("../../controllers/files/openFile.controller")

    router.get("/files/", File_uchwaly.getAll);

    router.get("/files/:name", openPdf.openFile);

    router.post("/upload", upload.fields([{ name: "file", maxCount: 1 },
    { name: "file_attachment", maxCount: 1 }
    ]), File_uchwaly.uploadFiles);

    app.use("/api", router);
}