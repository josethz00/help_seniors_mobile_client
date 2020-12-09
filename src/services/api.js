import axios from 'axios';


const api =  axios.create({
    baseURL: 'https://helpseniorsapi.herokuapp.com/'
});

export default api;