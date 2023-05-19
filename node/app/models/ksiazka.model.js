module.exports = (sequelize, Sequelize) => {
    const Ksiazka = sequelize.define("osoba", {
            id:               { type: Sequelize.INTEGER, 
                                autoIncrement: true, primaryKey: true },
            nazwa:            { type: Sequelize.STRING },
            numer_tel:        { type: Sequelize.STRING },
            numer_stacj:      { type: Sequelize.STRING },
            adres_email:      { type: Sequelize.STRING },
            numer_pokoju:     { type: Sequelize.STRING }, 
            dzialIdDzialu:    { type: Sequelize.INTEGER },
            stanowiskoIdStan: { type: Sequelize.INTEGER },
            sum_all:          { type: Sequelize.INTEGER },
        });

    return Ksiazka;
}