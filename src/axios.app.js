import axios from 'axios';

// Create instance to connect Firebase DDBB with data-app
const instanceBBDD = axios.create({
    baseURL: 'https://haikenda-6a939.firebaseio.com/'
});

export default instanceBBDD;