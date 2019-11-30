import React from 'react';
import './Input.css';
// Pendiente de importar las clases del css 

const Input = (props)=>{
    let inputElement = null;
    
    switch(props.elementType){
        
        case('textArea'):
            inputElement = <textarea {...props.inputConfig} value={props.value}  onChange={props.changed}/>;
            break;
        case ('input'):
             inputElement = <input {...props.inputConfig} value={props.value} onChange={props.changed}/>;
            break;                
        default:
            inputElement = <input {...props.inputConfig} value={props.value} onChange={props.changed}/>;
    }
return(
    <div>
    <label>{props.label}</label>
    {inputElement}
    </div>
);
};
   

export default Input;