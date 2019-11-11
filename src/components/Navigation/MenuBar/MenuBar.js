import React from 'react';
import classes from './MenuBar.css';
import Logo from '../../Logo/Logo';


const menubar = (props)=>(
    <header className={classes.MenuBar}>
        <Logo/>
        <div>Menu principal</div>
        <nav >...</nav>
    </header>
);

export default menubar;  