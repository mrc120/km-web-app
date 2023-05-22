const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const initRoutes = require("./app/routes")
require('dotenv').config()

global.__basedir = __dirname;

//HEADERS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json({ limit: "10000mb", extended: true }));
app.use(express.urlencoded({ extended: true }))

//CORS
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

//ROUTES
initRoutes(app);
require("./app/routes/ksiazka.routes")(app);
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/dzial.routes')(app);
require('./app/routes/stanowisko.routes')(app);
require('./app/routes/files/files.routes')(app);
require('./app/routes/files/files_zarz.routes')(app);
require('./app/routes/files/files_podst.routes')(app);


app.use(express.static(path.join(__dirname, '/app/views/')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "/app/views/index.html"));
});

//PORT
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}.`);
});
