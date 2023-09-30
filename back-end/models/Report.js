const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Report', reportSchema)