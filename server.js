const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//wrzuca folder views
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

//sync sequelize
db.sequelize.sync();

// simple routes
app.get("/", function (req, res)  {
  res.sendFile(path + "index.html");
});

require("./app/routes/ksiazka.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}.`);
});