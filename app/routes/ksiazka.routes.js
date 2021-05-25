module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
   
    const ksiazka_crud = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    router.post("/", ksiazka_crud.create);

    router.get("/", ksiazka_crud.findAll)

    router.get("/published", ksiazka_crud.findAllPublished);

    router.get("/:id", ksiazka_crud.findOne);

    router.put("/:id", ksiazka_crud.update);

    router.delete("/:id", ksiazka_crud.delete);

    router.delete("/", ksiazka_crud.deleteAll);

    app.use("111.111.111.122/api/ksiazka", router);
}