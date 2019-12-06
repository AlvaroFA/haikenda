import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';
import firebaseApp from '../../firebase/Firebase';

const logout = function logout(){
    firebaseApp.auth().signOut().then(()=>{
        window.location.reload();
    }).catch((err)=>{
        console.error(err);
        window.location.reload();
    })
}

const navigationItems = ({ isLoggedIn, isAdmin }) => {

    return <ul className="NavigationItems">
        { isLoggedIn && isAdmin? <NavigationItem link="/" exact>Horarios</NavigationItem> : '' }
        { isLoggedIn && isAdmin? <NavigationItem link="/signup">Usuarios</NavigationItem> : ''}
        { isLoggedIn && isAdmin? <NavigationItem link="/timetableform">Crear Horario</NavigationItem> : ''}
        { isLoggedIn && isAdmin? <NavigationItem link="/workshift">Gestion Turnos</NavigationItem> : ''}
        { isLoggedIn ? <NavigationItem onClick={logout} link="/signin">Cerrar sesión</NavigationItem> : '' }
    </ul>
};

export default navigationItems;