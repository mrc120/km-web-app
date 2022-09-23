const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
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
db.dzial = require("./dzial.model.js")(sequelize, Sequelize);
db.stanowisko = require("./stanowisko.model.js")(sequelize, Sequelize);

//plikownia
db.file = require("./file.model.js")(sequelize, Sequelize);
db.file_zarz = require("./file_zarz.model.js")(sequelize, Sequelize);
db.file_pole = require("./file_pol.model.js")(sequelize, Sequelize);

//Relacje roles,
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["user", "admin"];


//associations
db.dzial.hasOne(db.osoba);
db.osoba.belongsTo(db.dzial);
db.stanowisko.hasOne(db.osoba);
db.osoba.belongsTo(db.stanowisko);

module.exports = db;