const db = require("../models");
const Dzial = db.dzial;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const nazwa_dzialu = req.query.nazwa_dzialu;
    var condition = nazwa_dzialu ? { nazwa_dzialu: { [Op.like]: `%${nazwa_dzialu}%` } } : null;

    Dzial.findAll({ where: condition })
        .then(state => {
            res.send(state);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Wystąpił błąd podczas wydobywania danych."
            });
        });
};



