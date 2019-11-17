import React from 'react';
import FullCalendar from '@fullcalendar/react';

import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import '../../../node_modules/@fullcalendar/core/main.css';
import '../../../node_modules/@fullcalendar/resource-timeline/main.css';
import '../../../node_modules/@fullcalendar/timeline/main.css';



const TimeTableFullCalendar = () => {


  return(
  <div className="TimeTableFullCalendar">
    <FullCalendar 
    
      defaultView="resourceTimeline"
      
      plugins={[  resourceTimelinePlugin  ]} 
      header={{
        left: 'prev,next ,today',
        center: 'title',
        // TO DO MODIFY BUTTON CALENDAR
				right: 'resourceTimelineMonth, resourceTimelineDay, resourceTimeline'
      }}
      locale= 'es'
      firstDay= {1}
      nowIndicator= {true}
      schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
      resources={[
        {
          id: 'a',
          title: 'Room A'
        }
      ]}
      events={[
        {
          id: '1',
          resourceId: 'a',
          title: 'Meeting',
          allDay:true,
          daysOfWeek:[1,2,3,4,5],
          startRecur:'2019-11-15',
          endRecur:'2019-12-31',
          duration:'7 days' 


        }
      ]
    }
    />


  </div>
  );
};

export default TimeTableFullCalendar;