import firebaseApp from '../components/firebase/Firebase';

const defaultEmptyTimetables = {};
const defaultEmptyTimetable = {}

const root="/timetable"

export function fetchTimetables() {
    return firebaseApp.database().ref(root).once('value').then((snapshot)=>{
        if(snapshot)
            return snapshot.val();
        else 
            return defaultEmptyTimetables;
    });
}

export function createTimetable(timeTableData){
    return firebaseApp.database().ref(root).push(timeTableData);
}

export function deleteTimetable(idTimetable) {
    return firebaseApp.database().ref(root+'/'+idTimetable).remove();
}

export function fetchOneTimetable(idTimetable) {
    return firebaseApp.database().ref(root).child(idTimetable).once('value').then((snapshot)=>{
        if(snapshot)
            return snapshot.val() && snapshot.val();
        else 
            return defaultEmptyTimetable;
    });
}

export function updateTimetable(timetableId, timeTableData){
    return firebaseApp.database().ref(root+"/"+timetableId).set(timeTableData);
}

export default {
    fetchTimetables,
    fetchOneTimetable,
    createTimetable,
    deleteTimetable,
    updateTimetable
}