
module.exports = app => {
    const stanowisko = require("../controllers/stanowisko.controller.js");
    var router = require("express").Router();
    
    router.get("/", stanowisko.findAll);
  
    app.use("/api/stanowisko", router);
  }