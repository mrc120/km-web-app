// module.exports = {
//   HOST: process.env.DB_HOST,
//   USER: process.env.DB_USER,
//   PASSWORD: process.env.DB_PASSWORD,
//   DB: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   dialect: "mysql",
//   pool: {
//     max: 15,
//     min: 0,
//     acquire: 30000,
//     idle: 10000 
//   }
// };

  
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123qwe",
  DB: "kmdb",
  dialect: "mysql",
  port : 3306,
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};