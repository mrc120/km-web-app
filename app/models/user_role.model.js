const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User_role = sequelize.define("user_role", {
    roleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
   
    }
  });


  return User_role;
};
