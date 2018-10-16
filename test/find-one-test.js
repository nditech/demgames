const db = require('../models');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

db.Question
.findById({"_id": ObjectId("5bc62d5ac9d3e60c7834e217")})
.then((dbQuestion) => {
    console.log('run');
    console.log(dbQuestion);
    res.json(dbQuestion);
});