const mongoose = require('mongoose');

const MeetingSlots = new mongoose.Schema({
    Student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    Teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: String
    },
    begin : {
        type: Number,
        required: true,
    },
    end: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('meetingSlots', MeetingSlots);
