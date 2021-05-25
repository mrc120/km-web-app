const db = require("../models");
const Ksiazka = db.ksiazka_crud;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.nazwa) {
        res.status(400).send({
            message: "Treść nie może być pusta!"
        });
        return;
    }

    // Tworzenie ksiązki adresowej
    const ksiazka = {
        nazwa: req.body.nazwa,
        stanowisko: req.body.stanowisko,
        adres_email: req.body.adres_email,
        numer_tel: req.body.numer_tel,
        numer_stacj: req.body.numer_stacj,
        numer_pokoju: req.body.numer_pokoju,
        symbol_dzialu: req.body.symbol_dzialu,
        nazwa_dzialu: req.body.nazwa_dzialu,

    };

    // Save Tutorial in the database
    Ksiazka.create(ksiazka)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Wystąpił błąd."
            });
        });
};

exports.findAll = (req, res) => {
    const nazwa = req.query.nazwa;
    var condition = nazwa ? { nazwa: { [Op.like]: `%${nazwa}%` } } : null;

    Ksiazka.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Wystąpił błąd podczas wydobywania danych."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Ksiazka.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Nie przywrocono danych po id" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Ksiazka.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Zaaktualizowano pozycję"
                });
            } else {
                res.send({
                    message: "Nie można zaktualizować po id" + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error aktualiacji po id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Ksiazka.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pozycja usunięta"
                });
            } else {
                res.send({
                    message: 'Nie można usunąć id=${id}'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Nie można usunąć Tutorial z id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Ksiazka.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: '${nums} Pozycja usunięta' });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Błąd przy usuwaniu wszystkich rzeczy"
            });
        });
};

exports.findAllPublished = (req, res) => {
    Ksiazka.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Wystąpił błąd podczas wydobywania danych."
            });
        });
};

