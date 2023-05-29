const sequelize = require("sequelize");
const db = require("../models");
const Ksiazka = db.osoba;

exports.create = (req, res) => {
  Ksiazka.create({
    id: req.params.id,
    nazwa: req.body.nazwa,
    stanowisko: req.body.stanowisko,
    adres_email: req.body.adres_email,
    numer_tel: req.body.numer_tel,
    numer_stacj: req.body.numer_stacj,
    numer_pokoju: req.body.numer_pokoju,
    symbol_dzialu: req.body.symbol_dzialu,
    dzialIdDzialu: req.body.dzialIdDzialu,
    stanowiskoIdStan: req.body.stanowiskoIdStan,
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Wystąpił błąd podczas tworzenia."
    });
  });
};

exports.findAll = (req, res) => {
  Ksiazka.findAll({
    include: {
      all: true,
      nested: true,
      // order: sequelize.literal('DESC'),
    },
    attributes: [
      'id',
      'nazwa',
      'numer_tel',
      'adres_email',
      'numer_pokoju',
      'numer_stacj',
      [sequelize.literal('COALESCE(dzial.md) + COALESCE(stanowisko.ms)'), 'sum_all'],],
    order: sequelize.col('sum_all'),
  }).then(state => {
    res.send(state);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Wystąpił błąd podczas wydobywania danych."
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Ksiazka.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pozycja została zaaktualilzowana"
        });
      } else {
        res.send({
          message: `Cannot update with id=${id}. Maybe was not found or req.body is empty!`
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
    }).catch(err => {
      res.status(500).send({
        message: "Nie przywrocono danych po id:" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Ksiazka.destroy({
    where: { id: id }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: "Pozycja usunięta"
        });
      } else {
        res.send({
          message: 'Nie można usunąć id=${id}'
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Nie można usunąć z id=" + id
      });
    });
};

