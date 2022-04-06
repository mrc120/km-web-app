const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./app/models");
const Role = db.role;

const path = __dirname+ '/app/views/';;
const app = express();
const initRoutes = require("./app/routes")

app.use(express.static(path));

 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type,   Authorization, x-id, Content-Length, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
  });

global.__basedir = __dirname;

var corsOptions = {
  origin: 'localhost:8081',

};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({extended: true}))
initRoutes(app);

//wyrzuca baze
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
}

// simple 
app.get("/", function (req, res)  {
  res.sendFile(path + "index.html");
});

//ROUTES dla zakładek
require("./app/routes/ksiazka.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/dzial.routes')(app);
require('./app/routes/stanowisko.routes')(app);

//ROUTES dla - uchwaly, zarzadzenia, podstawy prawne 
require('./app/routes/files.routes')(app);
require('./app/routes/files_zarz.routes')(app);
require('./app/routes/files_podst.routes')(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}.`);
});
