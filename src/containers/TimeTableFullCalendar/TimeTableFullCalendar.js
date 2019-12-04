import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import axios from '../../axios.app';

import '../../../node_modules/@fullcalendar/core/main.css';
import '../../../node_modules/@fullcalendar/resource-timeline/main.css';
import '../../../node_modules/@fullcalendar/timeline/main.css';
import './TimeTableFullCalendar.css'
import WorkShift from '../WorkShift/WorkShift';

const initialEventValues = {};
const initialWorkShiftData = undefined;
const initialTimeTableData = undefined;

const TimeTableFullCalendar = () => {
  const isMounted = useRef(true);
  const [workerData, setWorkerData] = useState({});
  const [timeTableData, setTimeTableData] = useState(initialTimeTableData);
  const [workShiftData, setWorkShiftData] = useState(initialWorkShiftData);
  const [eventData, setEventData] = useState(initialEventValues);

  const loadDBDataInState = () => {
    axios.get('https://haikenda-6a939.firebaseio.com/workers.json').then(response => {
      if (isMounted.current == true) {
        setWorkerData(response.data);
      }
    })

    axios.get('https://haikenda-6a939.firebaseio.com/timetable.json').then(response => {
      if (isMounted.current == true) {
        setTimeTableData(response.data);
      }
    })


    axios.get('https://haikenda-6a939.firebaseio.com/workshift.json').then(response => {
      if (isMounted.current == true) {
        setWorkShiftData(response.data);
      }
    })

  }

  useEffect(() => {
    loadDBDataInState();
    return (() => {
      isMounted.current = false;
    });
  }, []);


  useEffect(() => {
    loadDBDataInState();
    return (() => {
      isMounted.current = false;
    });
  }, []);









  const getDataWorker = () => {
    const workerArray = [];
    for (let k in workerData) {
      let items = workerData[k];
      for (let v in items) {
        workerArray.push({
          id: k,
          title: items[v].name + items[v].surname
        });
      }
    }

    return workerArray;
  };

  const getWorkShiftDataHandler = () => {
    /*model*/
    /*
{-LvCSadkljDMgB08IT9d: {…}, -LvCScxj7f6fkCJ1I4sM: {…}}
-LvCSadkljDMgB08IT9d: {endTime: "", startTime: "", timetable: "", worker: ""}
-LvCScxj7f6fkCJ1I4sM: {endTime: "", startTime: "", timetable: "-Lv0o9DxcM_4hJb4kQAn", worker: "-LvC1rHaeEKDJ1tMrpzU"}
    */
    let workerId = [];
    let data = workShiftData;
    for (let a in data) {
      workerId.push(data[a].worker);
    }
    return workerId;
  };

  const getWorkShiftDataHandler2 = () => {
    /*model*/
    /*
  {-LvCSadkljDMgB08IT9d: {…}, -LvCScxj7f6fkCJ1I4sM: {…}}
  -LvCSadkljDMgB08IT9d: {endTime: "", startTime: "", timetable: "", worker: ""}
  -LvCScxj7f6fkCJ1I4sM: {endTime: "", startTime: "", timetable: "-Lv0o9DxcM_4hJb4kQAn", worker: "-LvC1rHaeEKDJ1tMrpzU"}
    */
    let workerId = [];
    let data = workShiftData;
    for (let a in data) {
      workerId.push(data[a].timetable);
    }
    return workerId;
  };

  const GiveMeOneEvent = () => {
    let t=eventData;
    let table = timeTableData;
    for (let time in timeTableData)
     {
      let evento = {
        resourceId: '',
        id: '',
        title: '',
        start: '',
        end: ''
      };
      evento['title'] = table[time].title;
      evento['start'] = table[time].startTime;
      evento['end'] = table[time].endTime;
      evento['id'] = time;
      t.push(evento)
    }
  }


  const giveMeEvents=()=>{
    if(!timeTableData || !workShiftData){
      return [];
    }

    const arrayEventos=[];
    for (const idWorkShift in workShiftData){
      const workshift = workShiftData[idWorkShift];
      let idTimetable = workshift.timetable;
      let timetable = timeTableData[idTimetable];
      let title = timetable.title;
      let idworker = workshift.worker;
      let start = workshift.startTime;
      let end = workshift.endTime;
    
      arrayEventos.push({
        resourceId: idworker,
        id: idWorkShift,
        title,
        start,
        end,
      })
    }
    return arrayEventos;
  }



  return (
    <div className="TimeTableFullCalendar">
      <FullCalendar
        defaultView="resourceTimeline"
        plugins={[resourceTimelinePlugin]}
        header={{
          left: 'prev,next ,today',
          center: 'title',
          // TO DO MODIFY BUTTON CALENDAR
          right: 'resourceTimelineMonth, resourceTimelineDay, resourceTimeline'
        }}
        locale='es'
        firstDay={1}
        nowIndicator={true}
        schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
        resources=
        {getDataWorker()}
        events={
          giveMeEvents()}
      /*{[
        {
          resourceId: '65sfCQ8su3acXRyK24PDPWiv16u1',
          id: '1',
          title: 'turno3',
          start: '2019-12-01 ',
          end: '2019-12-02',
        }
      ]
      }
      */
      />
    </div>
  );
};
export default TimeTableFullCalendar;