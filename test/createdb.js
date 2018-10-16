const db = require('../models');
const mongoose = require('mongoose');
const fs = require('fs');

/**
 * Manually create collections and add questions
 */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/demgames');

// English questions
let data = fs.readFileSync('./g4g-spanish.json', 'utf8')
// Spanish questions
// let data = fs.readFileSync('./g4g-spanish.json', 'utf8');
data = JSON.parse(data);

// add records from json file
db.Question.insertMany(data, (err, doc) => {
    if (err) throw err;
    else console.log('Questions added!');
});

// // remove all current records
// db.Question.deleteMany((err, delOK) => {
//     if (err) throw err;
//     else console.log(delOK);
// });