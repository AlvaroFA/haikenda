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
      
      plugins={[  resourceTimelinePlugin ]} 
      header={{
        left: 'prev,next today',
        center: 'title',
        // TO DO MODIFY BUTTON CALENDAR
				right: 'resourceTimelineMonth,resourceTimelineWeek'
      }}
      locale= 'es'
      firstDay= {1}
      schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
      resources={ [
        {
          id: 'a',
          title: 'Room A'
        },
        {
          id: 'b',
          title: 'Room B'
        }
      ]
    }
    />


  </div>
  );
};

export default TimeTableFullCalendar;