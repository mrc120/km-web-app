module.exports = (sequelize, Sequelize) => {
    const Dzial = sequelize.define("dzial", {
            id_dzialu:      { type: Sequelize.INTEGER, primaryKey: true },
            nazwa_dzialu:   { type: Sequelize.STRING },
            symbol:         { type: Sequelize.STRING },
            md:             { type: Sequelize.INTEGER },
        });
    return Dzial;
}