import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import classes from './SideMenu.css';

const sideMenu = (props) =>{


return(
    <div className={classes.SideMenu}>
        <Logo/>
        <nav>
            <NavigationItems/>
        </nav>
    </div>

);
};


export default sideMenu;