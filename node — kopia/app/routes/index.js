const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/file.controller");
const upload = require("../middleware/upload");

let routes = (app) => {
    router.get("/files", uploadController.getListFiles);

    router.get("/files/:name", uploadController.openFile);
  
    router.post("/upload", upload.single("file"), uploadController.uploadFiles);
  
    return app.use("/api", router);
  };
  
  module.exports = routes;
