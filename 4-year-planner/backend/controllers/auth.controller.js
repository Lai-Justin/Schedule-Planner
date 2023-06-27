const db = require("../models");
const User = db.user;
const Planner = db.planner;

const { OAuth2Client } = require('google-auth-library');
const { rawListeners } = require("../models/User");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignin = async (req, res) => {
    if (!req.user) {
        res.status(500).send({ message: "Google Access Token could not be verified!" });
        return;
    }

    console.log(req.user);

    User.findOne({ sub: req.user.sub }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }


        if (user) {
            console.log("User exists");
            res.status(200).send(user);
        } else {
            new User({
                firstName: req.user.given_name,
                lastName: req.user.family_name,
                sub: req.user.sub,
            }).save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                console.log("User created");
                res.send({
                    message: "User was registered successfully!",
                    firstName: req.user.given_name,
                    lastName: req.user.family_name,
                    sub: req.user.sub,
                });
            })
        }
    })
};