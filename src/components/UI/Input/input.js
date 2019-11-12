import React from 'react';
// Pendiente de importar las clases del css 

const input= (props)=>{
    let inputElement = null;

    switch(inputElement){
        case('textArea'):
            inputElement = <textarea {...props}/>
            break;
        case ('input'):
                inputElement = <input {...props}/>
            break;
        default:
            inputElement = <input {...props}/>
    }
return(
      <div>
    <label>{props.label}</label>
    {inputElement}
        </div>
);
}
   

export default input;