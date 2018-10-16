const db = require('../models');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Defining methods for the questionController
module.exports = {
    findAll: (req, res) => {
        db.Question
        .find({$and: [req.query]}).sort({'question': 1})
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    },
    findById: (req, res) => {
        db.Question
        .findById(ObjectId(req.params.id))
        .then((dbQuestion) => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    },
    create: (req, res) => {
        const id = new ObjectId;
        let question = req.body.params;
        question._id = id;
        db.Question
        .create(question)
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
        db.Question
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    },
    remove: (req, res) => {
        db.Question
        .findById({ _id: req.params.id })
        .then(dbQuestion => dbQuestion.remove())
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    }
}