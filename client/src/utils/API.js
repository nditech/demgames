import axios from 'axios'

export default {
    getQuesitons: params => {
        return axios.get('/api/questions')
    }
}