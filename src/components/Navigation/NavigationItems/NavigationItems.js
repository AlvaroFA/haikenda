import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="home" active>Inicio</NavigationItem>
        <NavigationItem link="/admin" active>Panel de administración</NavigationItem>
        <NavigationItem link="/timetable" active>Horario</NavigationItem>        
    </ul>
);

export default navigationItems;