import axios from 'axios'

const api = axios.create({
    baseURL: 'https://easy-stay-with-mern-backend.onrender.com/api'
})

export default api
