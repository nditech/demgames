const db = require('../models');
const fs = require('fs');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Defining methods for the questionController
module.exports = {
    findAll: (req, res) => {
        db.Question
        .find({$and: [req.query]})
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    },
    // findById: (req, res) => {
    //     db.Article
    //     .findById(req.params.id)
    //     .then(dbArticle => res.json(dbArticle))
    //     .catch(err => res.status(422).json(err));
    // },
    create: (req, res) => {
        const id = new ObjectId;
        let question = req.body.params;
        question._id = id;
        console.log(question);
        db.Question
        .create(question)
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    },
    // update: (req, res) => {
    //     db.Article
    //     .findOneAndUpdate({ _id: req.params.id }, req.body)
    //     .then(dbArticle => res.json(dbArticle))
    //     .catch(err => res.status(422).json(err));
    // },
    // remove: (req, res) => {
    //     db.Article
    //     .findById({ _id: req.params.id })
    //     .then(dbArticle => dbArticle.remove())
    //     .then(dbArticle => res.json(dbArticle))
    //     .catch(err => res.status(422).json(err));
    // }
}