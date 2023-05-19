const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    User.create({
        login: req.body.login,
        password: bcrypt.hashSync(req.body.password, 7)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: { name: { [Op.or]: req.body.roles } }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.status(400).send({ message: "Pomyślnie zarejestrowano" });
                });
            });
        } else {
            user.setRoles([1]).then(() => {
                res.status(400).send({ message: "Zarejestrowano pomyślnie nowego użytkownika" });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        where: { login: req.body.login, }
    })
        .then(user => {
            if (!user) {
                return res.status(400).send({ message: "Użytkownik nie istnieje" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Nieprawidłowe hasło"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 25200 // 24 hours
            });
            var authorises = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorises.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    login: user.login,
                    roles: authorises,
                    accessToken: token
                });
            });
        }).catch(err => {
            res.status(500).send({ message: "Bład logowania, czegoś mi tu brakuje" });
        });
};
