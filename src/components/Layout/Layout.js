import React from 'react';
import Border from '../hoc/Border';
import MenuBar from  '../Navigation/MenuBar/MenuBar';
import SideMenu from '../Navigation/SideMenu/SideMenu';


//import Timetable from '../../containers/TimeTable';

const layout = (props)=>(
    <Border>
       <SideMenu/>
        <MenuBar/>
       

        <main>
            {props.children}
        </main>
    </Border>
);
export default layout;