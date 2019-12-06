import firebaseApp from '../components/firebase/Firebase';


const defaultEmptyWorkshifts = {};
const defaultEmptyWorkshift = {};

export function eraseWorkshift(workshift) {
    return firebaseApp.database().ref('/workshift/' + workshift).remove();
}

export function createWorkshift(workshiftData) {
    return firebaseApp.database().ref('/workshift').push(
        workshiftData
    );
}

export function updateWorkshift(id, workshiftData) {
    return firebaseApp.database().ref('/workshift/' + id).set(
        workshiftData
    );
}

export function fetchWorkshifts() {
    return firebaseApp.database().ref('/workshift').once('value').then((snapshot) => {
        if (snapshot)
            return snapshot.val();
        else
            return defaultEmptyWorkshifts;
    });
}

export function fetchOneWorkshift(workshift) {
    return firebaseApp.database().ref('/workshift').child(workshift).once('value').then((snapshot) => {
        if (snapshot)
            return snapshot.val() && snapshot.val();
        else
            return defaultEmptyWorkshift;
    });
}
export default {
    eraseWorkshift,
    createWorkshift,
    fetchOneWorkshift,
    fetchWorkshifts,
    updateWorkshift,

}