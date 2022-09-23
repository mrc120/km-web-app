module.exports = app => {
    const Ksiazka = require("../controllers/ksiazka.controller.js");
    var router = require("express").Router();
  
    router.post("/", Ksiazka.create);
    
    router.get("/", Ksiazka.findAll);
    
    router.get("/:id", Ksiazka.findOne);
  
    router.put("/:id", Ksiazka.update);
  
   router.delete("/:id", Ksiazka.delete);
  
    app.use("/api/ksiazka", router);
  }