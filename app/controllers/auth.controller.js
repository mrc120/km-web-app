// const db = require("./models");
// const config = require("./config/auth.config");
// const User = db.user;

// const Op = db.Sequelize.Op;

// // testuj zmiane na let zamiast var jak ci powiadal samuraj
// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");

// exports.signup = (req, res) => {
//     //Save user to database
//     User.create({
//         auth_email: req.body.auth_email,
//         auth_password: bcrypt.hashSync(req.body.auth_password, 6)
//     }).then(user => {
//         res.send({ "Pomyślnie zarejestrowano"})
//     }).catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// };
//     exports.signin = (req, res) =>{
//         User.findOne({
//             where: {
//                 auth_email: req.body.auth_email
//             }
//         }) 
//         .then(user => {
//             if(!user){
//                 return res.status(400).send({message: "Użytkownik nie istnieje"});
//             }
//             var passwordIsValid = bcrypt.compareSync(
//                 req.body.auth_password,
//                 user.auth_password
//             );

//             if(!passwordIsValid)
//             return res.status(401).send({
//                 accessToken: null,
//                 message: "Nieprawidłowe hasło"
//             });
//             //tutaj jest koniec
//         })
//     }
