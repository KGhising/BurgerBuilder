import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-6edfd.firebaseio.com/'
});

export default instance;