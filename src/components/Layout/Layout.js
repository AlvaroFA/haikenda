import React from 'react';
import MenuBar from  '../Navigation/MenuBar/MenuBar';
import './Layout.css';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';


//import Timetable from '../../containers/TimeTable';

const Layout = ({children, isLoggedIn, isAdmin, user})=>(
    <div className="Layout">
        <MenuBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} user={user}/>
        <nav>
            <NavigationItems user={user} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
        </nav>

        <main className="LayoutMain">
            {children}
        </main>
    </div>
);
export default Layout;