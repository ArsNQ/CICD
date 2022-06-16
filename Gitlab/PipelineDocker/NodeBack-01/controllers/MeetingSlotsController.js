const express = require("express");
const Users = require("../models/Users");
const MeetingSlots = require("../models/MeetingsSlots");
const {checkAuthTeacher, checkAuth} = require("../config/Middleware");

const router = new express.Router();

router.get('/getTeacherSlot/:id', checkAuthTeacher, (req, res) => {
    res.send({message: "getTeacherSlot"});
});

router.post('/createSlot', checkAuthTeacher, (req, res) => {
    let begin = req.body.begin;
    let end = req.body.end;
    MeetingSlots.findOne({
        $and: [
            {
                $or: [
                    {begin: {$gte: begin}, end: {$lte: end}},
                    {begin: {$lte: begin}, begin: {$gte: end}},
                    {end: {$gte: begin}, end: {$lte: end}}
                ]
            },
            {Teacher: req.user._id},
        ],
    }).then(result => {
        if (!result) {
            MeetingSlots.create([{
                Teacher: req.user._id,
                status: "Open",
                begin,
                end
            }], function (err, docs) {
                if (err) {
                    console.log(err)
                    res.status(500).send(err)
                } else {
                    res.status(200).send("Success");
                }
            });
        } else {
            res.status(400).send("There is a slot at this time");
        }
    })
});

router.post('/fillSlotWithStudent', checkAuth, (req, res) => {
    let slotId = req.body.slotId;
    let student = req.body.student;
    MeetingSlots.findOne({_id: slotId}).then(result => {
        if (result) {
            Users.findOne({_id: student}).then(studentUser => {
                if (studentUser) {
                    if (result.Student.includes(student)) {
                        res.status(400).send({message: 'this slot is already book by this student'});
                    } else {
                        result.Student.push(student);
                        result.status = "Filled";
                        result.save().then(() => {
                            res.status(200).send({message: "Student add to this slot"});
                        }).catch(err => console.log(err));
                    }
                }
            })
        } else {
            res.status(400).send({message: "Slot not found"});
        }
    }).catch(err => {
        res.status(500).send({message: "Internal server error"});
    });
});

router.get('/getTeacherSlots/:teacherId', checkAuth, ((req, res) => {
    MeetingSlots.find({Teacher: req.params.teacherId}).then(result => {
        if (result) {
            res.status(200).send({slots: result, message: "slots found"});
        } else {
            res.status(400).send({message: "no results"})
        }
    }).catch(err => {
        res.status(500).send({message: 'Internal server error'});
    })
}))

router.post('/removeStudentFromSlot', checkAuth, (((req, res) => {
    let slot = req.body.slot;
    let student = req.body.student;
    MeetingSlots.findOne({_id: slot}).then(result => {
        if (result) {
            if (result.Student.includes(student)) {
                result.Student.pull(student);
                result.save().then(saved => {
                    res.status(200).send({slot: saved, message: 'Student successfully removed from this slot'});
                }).catch(err => {
                    res.status(500).send({message: 'Internal server error'});
                })
            } else {
                res.status(400).send({message: "This student is not registered to this slot"})
            }
        } else {
            res.status(400).send({message: "Slot not found"})
        }
    }).catch(err => res.status(500).send({message: "Internal server error"}))
})));

router.get('/getFinishSlot/:teacherId', checkAuthTeacher, (req, res) => {
    var finishSlot = [];
    MeetingSlots.find({Teacher: req.params.teacherId}).populate('Student').exec(function (err, docs) {
        if (docs) {
            for (var i = 0; i < docs.length; i++) {
                if (docs[i].end < Date.now() && docs[i].status === "Filled") {
                    finishSlot.push(docs[i]);
                }
            }
            res.status(200).send({slots: finishSlot, message: "slots found"});
        } else if (err) {
            console.log(err);
            res.status(500).send({message: 'Internal server error'});
        }
        else {
            res.status(400).send({message: "no results"})
        }
    });
});

module.exports = router;
