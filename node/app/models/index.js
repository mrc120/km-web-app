const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    define: {  timestamps: false }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import models
db.osoba = require("./ksiazka.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.user_role = require("./user_role.model.js")(sequelize, Sequelize);

db.dzial = require("./dzial.model.js")(sequelize, Sequelize);
db.stanowisko = require("./stanowisko.model.js")(sequelize, Sequelize);
const User = db.user;
const Role = db.role;
//plikownia
db.file_uchwaly = require("../models/files/file_uchwaly.model.js")(sequelize, Sequelize);
db.file_zarz = require("../models/files/file_zarz.model.js")(sequelize, Sequelize);
db.file_podst = require("../models/files/file_podst.model.js")(sequelize, Sequelize);

//Relacje roles,
db.dzial.hasOne(db.osoba);
db.osoba.belongsTo(db.dzial);
db.stanowisko.hasOne(db.osoba);
db.osoba.belongsTo(db.stanowisko);

Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "add_file", "add_user"];



module.exports = db;