import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hidden-mesa-11372.herokuapp.com'
    // baseURL: 'https://localhost:3001'
})

// Allows axios to add a token to every request
const setJwt = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { api, setJwt }