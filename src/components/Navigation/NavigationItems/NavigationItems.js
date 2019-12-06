import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';
import firebaseApp from '../../firebase/Firebase';


const navigationItems = ({ isLoggedIn, isAdmin }) => {

    return <ul className="NavigationItems">
        <NavigationItem link="/" exact>Horarios</NavigationItem>
        { isLoggedIn && isAdmin? <NavigationItem link="/signup">Usuarios</NavigationItem> : ''}
        { isLoggedIn && isAdmin? <NavigationItem link="/timetableform">Crear Horario</NavigationItem> : ''}
        { isLoggedIn && isAdmin? <NavigationItem link="/workshift">Gestion Turnos</NavigationItem> : ''}
        { isLoggedIn ? <NavigationItem onClick={() => firebaseApp.auth().signOut()} link="/signin">Cerrar sesión</NavigationItem> : '' }
    </ul>
};

export default navigationItems;