const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get(
    "/u/panel_administracyjny",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard, 
  );

  app.get(
    "/u/upload_user",
    [authJwt.verifyToken,  authJwt.isAdmin],
     controller.adminBoard,  
  );

  app.get(
    "/u/upload_file",
    [authJwt.verifyToken, authJwt.isFile, authJwt.isAdmin],
    controller.upload_file, controller.adminBoard, 
  );


  
};