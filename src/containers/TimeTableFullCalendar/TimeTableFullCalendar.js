import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import axios from '../../axios.app';

import '../../../node_modules/@fullcalendar/core/main.css';
import '../../../node_modules/@fullcalendar/resource-timeline/main.css';
import '../../../node_modules/@fullcalendar/timeline/main.css';
import './TimeTableFullCalendar.css'









const TimeTableFullCalendar = () => {
  const isMounted = useRef(true);
  const [workerData, setWorkerData] = useState({});
  const [timeTableData, setTimeTableData] = useState({});
  const [workShiftData, setWorkShiftData] = useState({});


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


  const getDataWorker = () => {
    const workerArray = [];
    for (let k in workerData) {
      let items = workerData[k];
      for (let v in items) {
        workerArray.push({
          id: k,
          title: items[v].name
        });
      }
    }

    return workerArray;
  };

  const getWorkShiftDataHandler = () => {
    const workShiftDataArray = [];
    for (let k in workShiftData) {
      let items = workShiftData[k];
      workShiftDataArray.push({
        timetable: items.timetable,
        worker: items.worker
      });
    }
    console.log(workShiftDataArray)
    return workShiftDataArray;
};

const getTimeTableDataHandler = () => {
  const timeTableDataArray = [];
  for (let k in timeTableData) {
    let item = timeTableData[k]
    timeTableDataArray.push({
      endTime: item.endTime,
      startTime: item.startTime,
      title: item.title

    });
  }
  console.log(timeTableDataArray)
  return timeTableDataArray;
};

const eventBuilder = () => {
  const events = [];
  getWorkShiftDataHandler();
  getTimeTableDataHandler();


  return events;
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

      /*{[
        {
          id: 'a',
          title: 'Room A'
        },{
          id:'2',
          title: 'trabajador 2'
 
        }
      ]}
      */
      events={eventBuilder()}





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