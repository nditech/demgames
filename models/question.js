const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    // _id: {type: String, required: true},
    question: {type: String, required: true, trim: true},
    option1: {type: String, required: true},
    option2: {type: String},
    option3: {type: String},
    option4: {type: String},
    answer: {type: String, required: true},
    type: {type: String, required: true},
    language: {type: String, require: true},
    tags: {type: Array}
}, {_id: false})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question