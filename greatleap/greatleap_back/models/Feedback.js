const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
    Student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    MeetingSlots: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meetingSlots',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    review : {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('feedback', Feedback);
