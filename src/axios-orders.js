import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e277c.firebaseio.com/'
});

export default instance;