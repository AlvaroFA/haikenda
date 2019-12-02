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
 * @param {String} email
 * @return {Promise<Object>}
 */
export function fetchOneWorker(email) {
    return axios.get(oneWorkerUrl(email));
}


/**
 * @param {Object} workerData 
 * @return {Promise<String>} - the error have a code and a message. 
 * the code can be:
 * auth/email-already-in-use -Thrown if there already exists an account with the given email address.
 */
export function createWorker(workerData) {
    const {email, password} = workerData;
    return registerUserInFirebaseRealm(email, password)
        .then(()=> saveWorkerData(workerData));
}

function saveWorkerData(workerData){
    return axios.put(oneWorkerUrl(workerData.email), {
        worker: {
            ...workerData,
            password: undefined
        }
    });
}

function registerUserInFirebaseRealm(email, password) {
    return userRegisterApp.auth().createUserWithEmailAndPassword(email, password)
        .catch(({code,message})=>{
            let userMessage = generateUserErrorMessage(code);
            if(code !== 'auth/email-already-in-use'){
                console.warn('Petición de creación de usuario en firebase falló de forma inesperada. '
                + 'Puede ser un bug o un problema de configuración. \n ' 
                + `Code: ${code}\n`
                + `Message: ${message}\n`
                + `Mensaje mostrado al usuario:${userMessage}`);
            }
            throw {code, message: userMessage};
        });
}

function generateUserErrorMessage(firebaseCode) {
    switch (firebaseCode) {
        case 'auth/email-already-in-use':
            return "El email ya está siendo utilizado"
        case 'auth/invalid-email':
            return 'El email no existe'
        case 'auth/weak-password': 
            return 'La contraseña es demasiado sencilla'
        default:
            return `Error interno inesperado. Contacte con el administrador (code:${firebaseCode})`
    }
}

/**
 * @param {Object} workerData 
 * @return {Promise<String>}
 */
export function updateWorker(workerData) {
    return saveWorkerData(workerData)
}

/**
 * @param {String} email
 * @return {Promise<String>}
 */
export function deleteWorker(email) {
    return axios.delete(oneWorkerUrl(email));
}


function oneWorkerUrl(email) {
    const escaped = email.replace('.','').replace('@','');
    return `/workers/${encodeURIComponent(escaped)}.json`;
}

export default {
    fetchWorkers,
    fetchOneWorker,
    createWorker,
    updateWorker,
    deleteWorker
}

