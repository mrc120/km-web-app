const db = require("../models");
// const User_role = db.user_roles
const User = db.user;
const User_Role = db.user_role
const Role = db.role;
const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");
const { role } = require("../models");

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
        where: {
            userId: req.params.userId
        }
    }).then(state => {
        res.send(state);

    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Błąd z wydobywaniem nazwy użytkowników"
        });
    });
}

exports.update_role = (req, res) => {
    
    roleId = req.body.roleId;
    User_Role.update({ roleId: roleId },
        {
            where: { userId: req.params.userId }
        }).then(state => {
            res.send(state);

        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Błąd z aktualizacją roli"
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


// exports.roles = (req, res) => {

//     Role.findAll({
//         include: {
//             all: true,
//             nested: true,

//         }
//     }).then(state => {
//         res.send(state);
//     }).catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Błąd z wydobywaniem nazwy użytkowników"
//         });
//     });
// }