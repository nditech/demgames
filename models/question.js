const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    _id: {type: String, required: true},
    question: {type: String, required: true},
    answers: [],
    type: {type: String, required: true},
}, {_id: false})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question