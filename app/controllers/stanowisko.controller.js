const db = require("../models");
const Stanowisko = db.stanowisko;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const nazwa_stan = req.query.nazwa_stan;
    var condition = nazwa_stan ? { nazwa_stan: { [Op.like]: `%${nazwa_stan}%` } } : null;

    Stanowisko.findAll({ where: condition })
        .then(state => {
            res.send(state);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Wystąpił błąd podczas wydobywania danych."
            });
        });
};



