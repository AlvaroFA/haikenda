import firebaseApp from '../components/firebase/Firebase';


const defaultEmptyWorkshifts = {};
const defaultEmptyWorkshift = {};

export function eraseWorkshift(workshift) {
    return firebaseApp.database().ref('/workers/' + workshift).remove();
}

export function createWorkshift(workshiftData) {
    return firebaseApp.database().ref('/workshift/').set({
        ...workshiftData
    });
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
            return snapshot.val() && snapshot.val().worker;
        else
            return defaultEmptyWorkshift;
    });
}
export default {
    eraseWorkshift,
    createWorkshift,
    fetchOneWorkshift,
    fetchWorkshifts


}