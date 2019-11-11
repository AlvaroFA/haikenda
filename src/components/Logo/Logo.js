import React from 'react';
import burguerLogo from '../../assets/images/a.png';
import classes from './Logo.css';

const logo =  (props) => (
    <div className={classes.Logo}>
        <img src={burguerLogo}/>
    </div>

    );

export default logo;