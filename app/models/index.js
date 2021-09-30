const dbConfig = require("../config/db.config.js");
const Ksiazka = require("../models/ksiazka.model.js")
const Dzial = require("../models/dzial.model.js")
const Stanowisko = require("../models/stanowisko.model.js")

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

  //laczy wszystkie modele/tabele do bazy do DB objektu
  //wszystko jest dostepne przezp obranie jednego objektu db = kmdb for me i guess
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//modele,tabele
db.osoba = require("./ksiazka.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.dzial = require("./dzial.model.js")(sequelize, Sequelize);
db.stanowisko = require("./stanowisko.model.js")(sequelize, Sequelize);


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


//associations, relacje pomiedzy
db.dzial.hasOne(db.osoba);
db.osoba.belongsTo(db.dzial);
db.stanowisko.hasOne(db.osoba);
db.osoba.belongsTo(db.stanowisko);

module.exports = db;