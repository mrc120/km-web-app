var router = require("express").Router();
const stanowisko = require("../controllers/stanowisko.controller.js");
module.exports = app => {  
    router.get("/", stanowisko.findAll);
  
    app.use("/api/stanowisko", router);
  }