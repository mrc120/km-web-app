module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        auth_email: {
            type: Sequelize.STRING
        },
        auth_password: {
            type: Sequelize.STRING
        }
   });

   return User;
};