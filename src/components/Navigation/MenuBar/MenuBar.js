import React from 'react';
import '../MenuBar/MenuBar.css';
import {NavLink} from 'react-router-dom';

function getDisplayName(user) {
    if (!user) {
        return "";
    }

    if (user.name && user.surname) {
        return user.name + " " + user.surname;
    }

    return user.surname || user.name || user.email || user.realmEmail || "";
}

const menubar = ({ isLoggedIn, isAdmin, user }) => (
    <header className="MenuBar">

        <NavLink to="/" exact className="MenuBarLink">
            <div className="MenuBarLogo">
                Haikenda
            </div>
        </NavLink>
        

        <span>{getDisplayName(user)}</span>
    </header>
);

export default menubar;