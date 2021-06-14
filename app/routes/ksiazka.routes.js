module.exports = app => {
  const ksiazka = require("../controllers/ksiazka.controller.js");
  var router = require("express").Router();

  router.post("/", ksiazka.create);

  router.get("/", ksiazka.findAll);

  router.get("/:id", ksiazka.findOne);

  router.put("/:id", ksiazka.update);

  router.delete("/:id", ksiazka.delete);

  app.use("/api/ksiazka", router);
}