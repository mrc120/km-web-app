module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123qwe",
  DB: "kmdb",
  dialect: "mysql",
  port : 3306,
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};