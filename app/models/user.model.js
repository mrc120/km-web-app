module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: Sequelize.STRING,
        password: Sequelize.STRING,
    },
     
    );

    return User;
};