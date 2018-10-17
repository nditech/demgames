import axios from 'axios';

export default {
    getOneQuestion: (id) => {
        return axios.get('/api/questions/' + id);
    },
    getQuesitons: (params) => {
        return axios.get('/api/questions', {params: params});
    },
    create: (params) => {
        return axios.post('/api/questions', {params: params});
    }
}