const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const Users = require("../models/Users");
const passport = require("passport");

const router = new express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({
            isAuth: true,
            user: req.user
        })
    } else {
        res.send({
            isAuth: false
        })
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) {
            return res.status(401).send(info)
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth');
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.send({
                data: user
            });
        })
    })(req, res, next);
});

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    Users.findOne({'email': email}, function (err, foundUser) {
        if (!password) {
            return res.status(400).send({message: "You need a password to register"})
        }
        if (err) {
            return res.status(500).send({message: "Internal server error"});
        } else if (foundUser) {
            return res.status(409).send({message: "User already exist"});
        } else if (email.length < 5 || password.length < 5) {
            return res.status(400).send({message: "All parameters must have a length of 5 minimum"});
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, null, function (err, passwordHash) {
                    if (err) {
                        console.log(err)
                    }
                    console.log("here");
                    Users.create([{
                        email,
                        password: passwordHash,
                        firstName,
                        lastName
                    }], function (err) {
                        if (err) {
                            console.log("err", err);
                            res.status(500).send({message: "Internal server error: " + err})
                        } else {
                            res.status(201).send({message: "User created with success"});
                        }
                    })
                });
            });
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({ message: "Successfully logout" });
});

module.exports = router;
