import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';
import firebaseApp from '../../firebase/Firebase';


const navigationItems = ({ isLoggedIn, isAdmin }) => {

    return <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Inicio</NavigationItem>
        {isLoggedIn && isAdmin ? <NavigationItem link="/signup" active>Usuarios</NavigationItem> : ''}
        {isLoggedIn && isAdmin ? <NavigationItem link="/timetableform" active>Crear Horario</NavigationItem> : ''}
        {isLoggedIn && isAdmin ? <NavigationItem link="/workshift" active>Gestion Turnos</NavigationItem> : ''}
        {isLoggedIn ? <NavigationItem onClick={() => firebaseApp.auth().signOut()} link="/signin">Cerrar sesión</NavigationItem> : ''}
    </ul>
};

export default navigationItems;