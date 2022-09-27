const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    //Save user to database
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 7)
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
            email: req.body.email,
        }
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
                expiresIn: 86400 // 24 hours
            });

            var authorises = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorises.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    email: user.email,
                    roles: authorises,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: "blad" });
        });
};
