module.exports = (sequelize, Sequelize) => {
    const Stanowisko = sequelize.define("stanowisko", {
        id_stan:    { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
        nazwa_stan: { type: Sequelize.STRING },
        ms:         { type: Sequelize.INTEGER, allowNull: false },

    });
    return Stanowisko;
}