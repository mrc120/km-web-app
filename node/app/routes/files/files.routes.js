module.exports = app => {
    var router = require("express").Router();
    const { getAllUchwaly, openFile, uploadFileUchwaly,
        deleteFileUchwaly, updateFileUchwaly } = require("../../controllers/file.controller");
    const upload = require("../../middleware/upload");


    router.get("/files_uchw", getAllUchwaly);

    router.get("/files_uchw/:name", openFile);

    router.post("/upload_uchw", upload.fields([{ name: "file", maxCount: 1 },
    { name: "file_attachment", maxCount: 1 }
    ]), uploadFileUchwaly);

    router.put("/files_uchw/:id", updateFileUchwaly)

    router.delete("/files_uchw/:id", deleteFileUchwaly)


    app.use("/api", router);


}