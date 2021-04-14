const db = require("../models");
const User = db.user;

checkDuplicateEmailPassword = (req, res, next) => {
    User.findOne({
        where : {
            auth_email: req.body.auth_email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Użytkownik taki już istnieje"
            });
            return;
        }
        next();
    });
}

const verifySignUp ={
    checkDuplicateEmailPassword: checkDuplicateEmailPassword
};

module.exports = verifySignUp;