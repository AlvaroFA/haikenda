import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';


const navigationItems = ({signout, isAdmin=false})=>{

    return <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Inicio</NavigationItem>
        {  <NavigationItem link="/signup" active>Usuarios</NavigationItem>  }   
        {  <NavigationItem link="/timetableform" active>Crear Horario</NavigationItem>}
        {  <NavigationItem link="/workshift" active>Gestion Turnos</NavigationItem>  }           
        {  <NavigationItem onClick={signout}>Cerrar sesión</NavigationItem>}
    </ul>
};

export default navigationItems;