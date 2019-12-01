import React from 'react';
import '../MenuBar/MenuBar.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'

const menubar = ({signout})=>(
    <header className="MenuBar">
        <nav>Menu principal</nav>
        <NavigationItems signout={signout}/>
    </header>
);

export default menubar;  