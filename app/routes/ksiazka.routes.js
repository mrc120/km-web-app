module.exports = app => {
    const ksiazka_crud = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    router.post("/table", ksiazka_crud.create);

    router.get("/table", ksiazka_crud.findAll);

    router.get("/published", ksiazka_crud.findAllPublished);

    router.get("/table:id", ksiazka_crud.findOne);

    router.put("/table:id", ksiazka_crud.update);

    router.delete("/table:id", ksiazka_crud.delete);

    router.delete("/table", ksiazka_crud.deleteAll);
    
    //app.use("/api/ksiazka", router);
    app.use("/api/table", router);
}