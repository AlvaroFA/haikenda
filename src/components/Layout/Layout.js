import React from 'react';
import Border from '../hoc/Border';
import MenuBar from  '../Navigation/MenuBar/MenuBar';
import SideMenu from '../Navigation/SideMenu/SideMenu';


//import Timetable from '../../containers/TimeTable';

const layout = ({children, isLoggedIn, isAdmin, user})=>(
    <Border>
       <SideMenu/>
        <MenuBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} user={user}/>
        <main>
            {children}
        </main>
    </Border>
);
export default layout;