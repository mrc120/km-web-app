const express = require("express");
const router = express.Router();

let routes = (app) => {
    return app.use("/api", router);
  };
  
  module.exports = routes;
