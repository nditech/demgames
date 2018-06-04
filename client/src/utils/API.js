import axios from 'axios';

export default {
    // Gets articles from the NYT API
    getArticles: params => {
        return axios.get('/api/mnt');
    },
    // Gets all saved articles
    getSavedArticles: () => {
        return axios.get('/api/articles');
    },
    // Deletes the saved article with the given id
    deleteArticle: id => {
        return axios.delete('/api/articles/' + id);
    },
    // Saves an article to the database
    saveArticle: articleData => {
        return axios.post('/api/articles', articleData);
    }
};