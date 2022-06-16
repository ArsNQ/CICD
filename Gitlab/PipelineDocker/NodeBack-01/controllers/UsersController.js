const express = require("express");
const Users = require("../models/Users");
const {checkAuth} = require("../config/Middleware");

const router = new express.Router();

router.post('/modifyUser', checkAuth, (req, res) => {
    Users.findOne({email: req.user.email}).then(result => {
        result.level = req.body.level ? req.body.level : "";
        result.firstName = req.body.firstname ? req.body.firstname : "";
        result.lastName = req.body.lastname ? req.body.lastname : "";
        result.age = req.body.age ? req.body.age : "";
        result.occupation = req.body.occupation ? req.body.occupation : "";
        result.hobbies = req.body.hobbies ? req.body.hobbies : "";
        result.wishes = req.body.wishes ? req.body.wishes : "";
        result.save();
        res.status(200).send({message: "user modified"});
    }).catch(err => {
        console.log(err);
        res.status(400).send({message: "user not found"});
    })
});

router.get('/getTeacher', checkAuth, (req, res) => {
    Users.find({accountType: 'Teacher'}).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        console.log(err);
        res.status(400).send({message: "Teacher not found"});
    })
});

module.exports = router;
