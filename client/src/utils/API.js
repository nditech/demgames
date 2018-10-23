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
    update: (params) => {
        const id = params._id;
        console.log(params);
        console.log(id);
        return axios.put('/api/questions/' + id, params);
    }
}