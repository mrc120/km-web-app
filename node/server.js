const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const initRoutes = require("./app/routes")

global.__basedir = __dirname;

const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

//cors allow
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.header("Access-Control-Allow-Credentials", "true"); 
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
  });
// parse requests of content-type - application/json
app.use(bodyParser.json({limit: "10000mb", extended: true}));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "10000mb", extended: true }));
app.use(express.urlencoded({ extended: true}))

//ROUTES dla zakładek
require("./app/routes/ksiazka.routes")(app);

require('./app/routes/user.routes')(app);
require('./app/routes/dzial.routes')(app);
require('./app/routes/stanowisko.routes')(app);

//ROUTES dla - uchwaly, zarzadzenia, podstawy prawne 
require('./app/routes/files.routes')(app);
require('./app/routes/files_zarz.routes')(app);
require('./app/routes/files_podst.routes')(app);
require('./app/routes/auth.routes')(app);

initRoutes(app);


app.use(express.static(path.join(__dirname, '/app/views/')));
app.get('/*', function (req, res)  {
  res.sendFile(path.join(__dirname, "/app/views/index.html"));
});


const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}.`);
});
