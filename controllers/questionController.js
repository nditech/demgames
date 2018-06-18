const db = require('../models')
const fs = require('fs')

// Defining methods for the articleController
module.exports = {
    findAll: (req, res) => {
        db.Question
        .find(req.query)
        .sort({ date: -1 })
        .then(dbQuestion => res.json(dbQuestion))
        .catch(err => res.status(422).json(err));
    }
    // findById: (req, res) => {
    //     db.Article
    //     .findById(req.params.id)
    //     .then(dbArticle => res.json(dbArticle))
    //     .catch(err => res.status(422).json(err));
    // },
    // create: (req, res) => {
    //     const id = req.body.url.slice(-10).slice(0, 6);
    //     const article = {
    //     _id: id,
    //     title: req.body.title,
    //     url: req.body.url
    //     };
    //     db.Article
    //     .create(article)
    //     .then(dbArticle => res.json(dbArticle))
    //     .catch(err => res.status(422).json(err));
    // },
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