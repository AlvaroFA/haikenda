import React from 'react';
import classes from '../Button/Button.css'

//custom  button 
const Button = (props)=>(
    <button 
        className={[classes.Button,classes[props.btnType]].join(' ')}
        disabled={props.disabled}
        onClick={props.clicked}>
        {props.children}
    </button>
);

Button.defaultProps= {
    disabled: false
};


export default Button;