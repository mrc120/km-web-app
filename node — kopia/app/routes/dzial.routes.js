
module.exports = app => {
    const dzial = require("../controllers/dzial.controller.js");
    var router = require("express").Router();
    
    router.get("/", dzial.findAll);
  
    app.use("/api/dzial", router);
  }