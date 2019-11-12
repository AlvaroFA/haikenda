import React from 'react';
import classes from './MenuBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import MenuButton from '../SideMenu/MenuButton'

const menubar = (props)=>(
    <header className={classes.MenuBar}>
        <MenuButton clicked={props.buttonMenuClicked}/>
        <Logo/>
        <nav>Menu principal</nav>
        <NavigationItems/>
    </header>
);

export default menubar;  