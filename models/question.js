const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    _id: {type: String, required: true},
    question: {type: String, required: true, trim: true},
    answers: {type: Array, required: true},
    answer: {type: String, required: true},
    type: {type: String, required: true},
    language: {type: String, require: true},
    tags: {type: Array, require: true}
}, {_id: false})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question