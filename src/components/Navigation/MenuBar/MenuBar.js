import React from 'react';
import '../MenuBar/MenuBar.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'

function getDisplayName(user){
    if(!user) {
        return "";
    }

    if(user.name && user.surname) {
        return user.name + " " + user.surname;
    }

    return user.surname || user.name || user.email || "";
}

const menubar = ({isLoggedIn, isAdmin, user})=>(
    <header className="MenuBar">
        Menu principal
        <nav>
            <span>User {getDisplayName(user)}</span>
            <NavigationItems user={user} isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
        </nav>
    </header>
);

export default menubar;  