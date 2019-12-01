import axios from '../axios.app';
import firebase from 'firebase';
import firebaseConfig from '../components/firebase/config';

const userRegisterApp = firebase.initializeApp(firebaseConfig, "UserRegister");
userRegisterApp.auth().languageCode = 'es';

/**
 * @return {Promise<Object>}
 */
export function fetchWorkers() {
    return axios.get('/workers.json');
}

/**
 * @param {String} id
 * @return {Promise<Object>}
 */
export function fetchOneWorker(id) {
    return axios.get(`/workers/${id}.json`);
}


/**
 * @param {Object} workerData 
 * @return {Promise<String>}
 */
export function createWorker(workerData) {
    return axios.post('/workers.json', {
        worker: workerData
    });
}

/**
 * @param {String} id
 * @param {Object} workerData 
 * @return {Promise<String>}
 */
export function updateWorker(id, workerData) {
    return axios.put(`/workers/${id}.json`, {
        worker: workerData
    });
}

/**
 * @param {String} id
 * @return {Promise<String>}
 */
export function deleteWorker(id) {
    return axios.delete(`/workers/${id}.json`);
}

export default {
    fetchWorkers,
    fetchOneWorker,
    createWorker,
    updateWorker,
    deleteWorker
}
