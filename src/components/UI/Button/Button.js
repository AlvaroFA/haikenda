import React from 'react';
import '../Button/Button.css'

const Button = (props)=>{
  const classes = `Button Button${props.btnType}`;

  return (
    <button className={classes} disabled={props.disabled} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

Button.defaultProps= {
    disabled: false,
    btnType: 'Normal',
};


export default Button;