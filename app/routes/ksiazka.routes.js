module.exports = app => {
    const ksiazka_crud = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    router.post("/", ksiazka_crud.create);

    router.get("/", ksiazka_crud.findAll);

    router.get("/published", ksiazka_crud.findAllPublished);

    router.get("/:id", ksiazka_crud.findOne);

    router.put("/:id", ksiazka_crud.update);

    router.delete("/:id", ksiazka_crud.delete);

    router.delete("/", ksiazka_crud.deleteAll);

    app.use("/api/ksiazka", router);
}