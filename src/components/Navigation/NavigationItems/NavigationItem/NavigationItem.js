import React from 'react';
import './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const NavigationItem = (props, exact)=>(
    <li className="NavigationItem" onClick={props.onClick}>
        <NavLink
            to={props.link || ''}
            className="NavigationItemLink"
            activeClassName="NavigationItemLinkActive"
            exact
            >
            {props.children}
        </NavLink>
    </li>
);

NavigationItem.defaultProps = {
    exact: false,
}

export default NavigationItem;