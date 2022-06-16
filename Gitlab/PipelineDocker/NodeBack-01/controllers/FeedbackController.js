const express = require("express");
const Users = require("../models/Users");
const Feedback = require("../models/Feedback");
const {checkAuthTeacher, checkAuth} = require("../config/Middleware");

const router = new express.Router();

router.get('/getFeedbacks/:id', checkAuth, ((req, res) => {
    Feedback.find({Teacher: req.params.id}).populate('MeetingSlots').populate('Student').exec(function (err, docs) {
        if (docs) {
            res.status(200).send({feedback: docs, message: "feedback found"});
        } else if (err) {
            console.log(err);
            res.status(500).send({message: 'Internal server error'});
        }
        else {
            res.status(400).send({message: "no results"})
        }
    });
}))

router.post('/createFeedback', checkAuthTeacher, (req, res) => {
    let StudentId = req.body.studentId;
    let TeacherId = req.body.teacherId;
    let MeetingSlotId = req.body.meetingSlotId;
    Feedback.create([{
        Teacher: TeacherId,
        Student: StudentId,
        MeetingSlots: MeetingSlotId,
        status: req.body.FeedbackStatus,
        review: req.body.review
    }], function (err, docs) {
        if (err) {
            console.log(err)
            res.status(500).send(err)
        } else {
            res.status(200).send("Success");
        }
    });
});



module.exports = router;
