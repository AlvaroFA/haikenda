import React from 'react';
import classes from  './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props)=>(
    <li className={classes.NavigationItem} onClick={props.onClick}>
        <NavLink to={props.link || ''}>{props.children}</NavLink>
    </li>
);

export default navigationItem;