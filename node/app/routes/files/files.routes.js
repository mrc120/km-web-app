module.exports = app => {
    var router = require("express").Router();
    const {getAll, openFile, uploadFileUchwaly} = require("../../controllers/files/file_uchwaly.controller");
    const upload = require("../../middleware/upload");
    const openPdf = require("../../controllers/files/openFile.controller")

    // router.get("/files", getAll);

    // router.get("/files/:name", openFile);

    // router.post("/upload", upload.fields([{ name: "file", maxCount: 1 },
    // { name: "file_attachment", maxCount: 1 }
    // ]), File_uchwaly.uploadFiles);
    router.post("/upload", upload.fields([{ name: "file", maxCount: 1 },
    { name: "file_attachment", maxCount: 1 }
    ]), uploadFileUchwaly);
console.log(router.post)
    app.use("/api", router);


}