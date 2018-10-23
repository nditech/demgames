import axios from 'axios';

export default {
    getOneQuestion: (id) => {
        return axios.get('/api/questions/' + id);
    },
    getQuesitons: (params) => {
        return axios.get('/api/questions', {params: params});
    },
    getAllSpanishQuesitons: (params) => {
        return axios.get('/api/questions/es', params);
    },
    create: (params) => {
        return axios.post('/api/questions', params);
    },
    delete: (id) => {
        return axios.delete('/api/questions/' + id);
    },
    update: (params) => {
        const id = params._id;
        return axios.put('/api/questions/' + id, params);
    }
}