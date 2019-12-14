import React, { Fragment, useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import './core.css';
import './resource-timeline.css';
import './timeline.css';
import './TimeTableFullCalendar.css';
import { fetchWorkers } from '../../providers/WorkersProvider';
import { fetchTimetables } from '../../providers/TimetableProvider';
import { fetchWorkshifts } from '../../providers/WorkshiftProvider';

const initialWorkShiftData = undefined;
const initialTimeTableData = undefined;

const TimeTableFullCalendar = () => {
  const isMounted = useRef(true);
  const [workerData, setWorkerData] = useState({});
  const [timeTableData, setTimeTableData] = useState(initialTimeTableData);
  const [workShiftData, setWorkShiftData] = useState(initialWorkShiftData);

  const loadDBDataInState = () => {
    fetchWorkers().then(response => {
      if (isMounted.current === true) {
        setWorkerData(response);
      }
    })

    fetchTimetables().then(response => {
      if (isMounted.current === true) {
        setTimeTableData(response);
      }
    })


    fetchWorkshifts().then(response => {
      if (isMounted.current === true) {
        setWorkShiftData(response);
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
          title: items[v].name + " " + items[v].surname
        });
      }
    }

    return workerArray;
  };

  const giveMeEvents = () => {
    if (!timeTableData || !workShiftData) {
      return [];
    }

    const arrayEventos = [];
    for (const idWorkShift in workShiftData) {
      const workshift = workShiftData[idWorkShift];
      let idTimetable = workshift.timetable;
      let timetable = timeTableData[idTimetable];
      let title = timetable.title + " (" + timetable.startTime + "-" + timetable.endTime + ")";
      let idworker = workshift.worker;
      let start = workshift.startTime;
      let end = workshift.endTime;
      arrayEventos.push({
        resourceId: idworker,
        id: idWorkShift,
        title,
        start: start,
        end: end
      })
    }
    return arrayEventos;
  }

  return (
    <Fragment>
      <h1>Horarios</h1>
      <div className="TimeTableFullCalendar">
        <FullCalendar
          defaultView="resourceTimelineMonth"
          height="parent"
          plugins={[resourceTimelinePlugin]}
          header={{
            left: 'prev,next ,resourceTimelineMonth',
            center: 'title'
          }}
          locale='es'
          firstDay={1}
          nowIndicator={true}
          schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
          resources={getDataWorker()}
          events={giveMeEvents()}
        />
      </div>
    </Fragment>
  );
};
export default TimeTableFullCalendar;