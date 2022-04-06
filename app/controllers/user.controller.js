const sequelize = require("sequelize");
const db = require("../models");
const User = db.user;


exports.findAll = (req, res) => { 
    User.findAll({ attributes: ['login'], 
    }).then(state => {
        res.send(state);
    }).catch(err =>{
        res.status(500).send({
            message:
            err.message || "Błąd z wydobywaniem nazwy użytkowników"
        });
    });
}


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.upload_file = (req, res) => {
    res.status(200).send("Uploader content.");
};

exports.upload_user = (req, res) => {
    res.status(200).send("Uploader content.");
};

