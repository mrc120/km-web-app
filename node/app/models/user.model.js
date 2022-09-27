const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
        login: Sequelize.STRING,
        password: Sequelize.STRING,
    },
    );
    return User;
};

