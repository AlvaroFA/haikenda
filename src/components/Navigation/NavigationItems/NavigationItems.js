import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';


const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="home" active>Inicio</NavigationItem>
        <NavigationItem link="/users" active>Usuarios</NavigationItem>
        <NavigationItem link="/timetable" active>Horarios</NavigationItem>        
    </ul>
);

export default navigationItems;