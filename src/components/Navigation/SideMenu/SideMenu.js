import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import './SideMenu.css';

const sideMenu = (props) =>{


return(
    <div className="SideMenu">
        <Logo/>
        <nav>
            <NavigationItems/>
        </nav>
    </div>

);
};


export default sideMenu;