const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// testuj zmiane na let zamiast var jak ci powiadal samuraj
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    //Save user to database
    User.create({
        auth_email: req.body.auth_email,
        auth_password: bcrypt.hashSync(req.body.auth_password, 7)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "Pomyślnie zarejestrowano" });
                    });
                });


            } else {
                user.setRoles([1]).then(() => {
                    res.send({ message: "Zarejestrowano" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


exports.signin = (req, res) => {
    User.findOne({
        where: {
            auth_email: req.body.auth_email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(400).send({ message: "Użytkownik nie istnieje" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.auth_password,
                user.auth_password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Nieprawidłowe hasło"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorises = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorises.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    auth_email: user.auth_email,
                    roles: authorises,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: "blad" });
        });
};
