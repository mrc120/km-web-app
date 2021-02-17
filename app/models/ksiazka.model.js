module.exports = (sequelize, Sequelize) => {
    const Ksiazka = sequelize.define("ksiazka", 
    {
        imie:{
            type: Sequelize.STRING
        },
        numer_tel:{
            type: Sequelize.INTEGER
        },
        numer_stacj:{
            type: Sequelize.STRING
        },
        adres_email:{
            type: Sequelize.STRING
        },
        nazwa_dzialu:{
            type: Sequelize.STRING
        },
        symbol_dzialu:{
            type: Sequelize.STRING
        },
        numer_pokoju:{
            type: Sequelize.STRING
        },

    });

    return Ksiazka;
}