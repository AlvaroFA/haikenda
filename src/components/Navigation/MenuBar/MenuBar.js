import React from 'react';
import '../MenuBar/MenuBar.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'

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
        <div className="MenuBarLogo">
            Haikenda
        </div>

        <span>{getDisplayName(user)}</span>
    </header>
);

export default menubar;