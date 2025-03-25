import axios from 'axios'

const api = axios.create({
    baseURL: 'https://computacao-em-nuvem.onrender.com'
})

export default api