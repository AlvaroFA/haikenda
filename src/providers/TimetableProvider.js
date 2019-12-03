import axios from '../axios.app';

export function fetchTimetables(){
    return axios.get('https://haikenda-6a939.firebaseio.com/timetable.json');
}

export function createTimetable(timeTableData){
    return axios.post('/timetable.json', timeTableData);
}

export function deleteTimetable(idTimetable) {
    return axios.delete('https://haikenda-6a939.firebaseio.com/timetable/'+idTimetable+'.json');
}

export function fetchOneTimetable(idTimetable) {
    return axios.get('https://haikenda-6a939.firebaseio.com/timetable/'+idTimetable+'.json');
}

export function updateTimetable(timetableId, timeTableData){
    return axios.put('/timetable/'+timetableId+'.json', timeTableData);
}

export default {
    fetchTimetables,
    fetchOneTimetable,
    createTimetable,
    deleteTimetable,
    updateTimetable
}