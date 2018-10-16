import axios from 'axios';

export default {
    getOneQuestion: (id) => {
        console.log('get one question called');
        console.log(id);
        return axios.get('/api/questions/' + id);
    },
    getQuesitons: (params) => {
        return axios.get('/api/questions', {params: params});
    },
    create: (params) => {
        return axios.post('/api/questions', {params: params});
    }
}