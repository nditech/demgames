const axios = require('axios');
const db = require('../models');

// findAll searches the Medical News Today website and returns only the entries we haven't already saved
module.exports = {
    findAll: (req, res) => {
        const api_key = 'eae0005f518c46ad8d081e00ef91410d';

        axios
        .get('https://newsapi.org/v2/top-headlines?sources=medical-news-today&apiKey=' + api_key)
        .then(response => {
            db.Article
            .find()
            .then(dbArticles =>
                response.data.articles.filter(article =>
                    dbArticles.every(
                        dbArticle => dbArticle.url.toString() !== article.url
                    )
                )
            )
            .then(articles => {
                res.json(articles);
            })
            .catch(err => res.status(422).json(err));
        });
    }
};