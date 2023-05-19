const db = require("../models");
const User = db.user;
const User_Role = db.user_role

var bcrypt = require("bcryptjs");

exports.userAll = (req, res) => {
    User.findAll(req.params.id).then(state => {
        res.send(state);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Błąd z wydobywaniem nazwy użytkowników"
        });
    });
}

exports.user = (req, res) => {
    User.findByPk(req.params.id).then(state => {
        res.send(state);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Błąd z wydobywaniem nazwy użytkowników"
        });
    });
}

exports.updatePassword = (req, res) => {
    id = req.params.id;
    password = bcrypt.hashSync(req.body.password, 7)
    User.update({ password },
        { where: { id } }
    ).then(state => {
        res.send(state);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Błąd z aktualizacją danych "
        });
    });
};

exports.user_role = (req, res) => {
    User_Role.findOne({
        where: { userId: req.params.userId }
    }).then(state => {
        res.send(state);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Błąd z wydobywaniem nazwy użytkowników"
        });
    });
}

exports.update_role = (req, res) => {
    roleId = req.body.roleId;
    User_Role.update({ roleId: roleId }, {
        where: { userId: req.params.userId }
    }).then(state => {
        res.send(state);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Błąd z aktualizacją roli"
        });
    });
}

exports.adminBoard = (res) => {
    res.status(200).send("Admin Content.");
};

exports.upload_file = (res) => {
    res.status(200).send("Uploader file.");
};

exports.upload_user = (res) => {
    res.status(200).send("Uploader content.");
};

