import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pomodoro-online.onrender.com'
})

export default api