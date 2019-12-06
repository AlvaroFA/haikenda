import firebaseApp from '../components/firebase/Firebase';
import {registerUserAccount} from './RealmProvider';

const defaultEmptyWorkers = {};
const defaultEmptyWorker = {}

/**
 * @return {Promise<Object>}
 */
export function fetchWorkers() {
    return firebaseApp.database().ref('/workers').once('value').then((snapshot)=>{
        if(snapshot)
            return snapshot.val();
        else 
            return defaultEmptyWorkers;
    });
}

/**
 * @param {String} uid
 * @return {Promise<Object>}
 */
export function fetchOneWorker(uid) {
    return firebaseApp.database().ref('/workers').child(uid).once('value').then((snapshot)=>{
        if(snapshot)
            return snapshot.val() && snapshot.val().worker;
        else 
            return defaultEmptyWorker;
    });
}


/**
 * @param {Object} workerData 
 * @return {Promise<Any>} - the error have a code and a message. 
 * the code can be:
 * auth/email-already-in-use -Thrown if there already exists an account with the given email address.
 */
export function createWorkerAndAccount(workerData) {
    const {email, password} = workerData;
    return registerUserAccount(email, password)
        .then((user)=> saveWorkerData(user.uid, workerData));
}

/**
 * @param {String} uid
 * @param {Object} workerData 
 * @return {Promise<Any>}
 */
function saveWorkerData(uid, workerData){
    return firebaseApp.database().ref('/workers/'+uid).set({
        worker: {
            ...workerData,
            password: null
        }
    });
}

/**
 * @param {String} uid
 * @param {Object} workerData 
 * @return {Promise<Any>}
 */
export function updateWorker(uid, workerData) {
    const data = {
        ...workerData
    };
    delete data.password;
    delete data.email;
    return firebaseApp.database().ref('/workers/'+uid+'/worker').update(data);
}

/**
 * @param {String} uid
 * @return {Promise<Any>}
 */
export function deleteWorker(uid) {
    return firebaseApp.database().ref('/workers/'+uid).remove();
}

export default {
    fetchWorkers,
    fetchOneWorker,
    createWorkerAndAccount,
    updateWorker,
    deleteWorker
}

