const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            auth_email: req.body.auth_email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Taki użytkownik już istnieje w bazie!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                auth_email: req.body.auth_email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Adres email jest już w użyciu"
                });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Ta rola nie istnieje = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;