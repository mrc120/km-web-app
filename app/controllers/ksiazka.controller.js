const db = require("../models");
const Ksiazka = db.ksiazkas;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nazwa) {
        res.status(400).send({
            message: "Treść nie może być pusta!"
        });
        return;
    }

    const ksiazka = {
        //id: req.params.id,
        nazwa: req.body.nazwa,
        stanowisko: req.body.stanowisko,
        adres_email: req.body.adres_email,
        numer_tel: req.body.numer_tel,
        numer_stacj: req.body.numer_stacj,
        numer_pokoju: req.body.numer_pokoju,
        symbol_dzialu: req.body.symbol_dzialu,
        nazwa_dzialu: req.body.nazwa_dzialu,

    };

    Ksiazka.create(ksiazka)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Wystąpił błąd podczas tworzenia."
            });
        });
};

exports.findAll = (req, res) => {
    const nazwa = req.query.nazwa;
    var condition = nazwa ? { nazwa: { [Op.like]: `%${nazwa}%` } } : null;

    Ksiazka.findAll({ where: condition })
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

exports.update = (req, res) => {
    const id = req.params.id;
  
    Ksiazka.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pozycja została zaaktualilzowana"
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Błąd aktualizacji=" + id
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
                message: "Nie przywrocono danych po id:" + id
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

