module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        auth_email: {
            type: sequelize.STRING
        },
        auth_password: {
            type: sequelize.STRING
        }
   });

   return User;
};