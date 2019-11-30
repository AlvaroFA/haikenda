import React from 'react';
import './Input.css';
// Pendiente de importar las clases del css 
// Custom component for input used 
const Input = (props)=>{
    let inputElement = null;
    
    switch(props.elementType){
  
        case('textArea'):
            inputElement = <textarea {...props.inputConfig} value={props.value}  onChange={props.changed}/>;
            break;
        case ('input'):
            inputElement = <input {...props.inputConfig} value={props.value} onChange={props.changed}/>;
            break;    
        case ('select'):
            inputElement = (
                <select {...props.inputConfig} value={props.value} onChange={props.changed}>
                    {props.children}
                </select>
            );
            break;
        default:
            inputElement = <input {...props.inputConfig} value={props.value} onChange={props.changed}/>;
    }

    const label = props.inputConfig && props.inputConfig.hidden ? '' : <label>{props.label}</label> 
return(
    <div>
    {label}
    {inputElement}
    </div>
);
};
   

export default Input;