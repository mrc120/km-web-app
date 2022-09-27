const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get(
    "/api/user/panel_administracyjny",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard,
  );

  app.get(
    "/api/user/upload_user",
    [authJwt.verifyToken, authJwt.isUser, authJwt.isAdmin],
    controller.upload_user,
  );

  app.get(
    "/api/user/upload_file",
    [authJwt.verifyToken, authJwt.isFile, authJwt.isAdmin],
    controller.upload_file
  );

  app.get("/api/auth/users", controller.userAll);
  app.get("/api/auth/users/:id", controller.user);
  app.put("/api/auth/users/:id", controller.updatePassword);


 app.get("/api/auth/user_roles/:userId", controller.user_role);

 app.put("/api/auth/user_roles/:userId", controller.update_role);

  
};
