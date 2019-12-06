import React from 'react';
import './Input.css';

// Pendiente de importar las clases del css
// Custom component for input used
const Input = (props) => {
    let inputElement = null;

    switch (props.elementType) {

        case ('textArea'):
            inputElement = <textarea {...props.inputConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('input'):
            inputElement = <input {...props.inputConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select {...props.inputConfig} value={props.value} onChange={props.changed}>
                    {props.children}
                </select>
            );
            break;
        case ('checkbox'):
            inputElement = <input {...props.inputConfig} checked={props.value} onChange={props.changed} />;
            break;
        default:
            inputElement = <input {...props.inputConfig} value={props.value} onChange={props.changed} />;
    }

    const errors = (Array.isArray(props.incorrectValues) && props.incorrectValues) || [];
    const label = props.inputConfig && props.inputConfig.hidden ? '' : props.label;

    const inputClasses = [
        `Input`,
        props.inputConfig && props.inputConfig.hidden ? 'InputHidden' : '',
        errors && errors.length > 0 ? 'InputWithErrors' : '',
    ].join(' ')

    if (props.elementType === 'checkbox') {
        return (
            <label className={inputClasses}>
                {inputElement}
                <span className="InputLabelCheckbox">{label}</span>
                {
                    errors.map((item, key) => <span key={key} className="IncorrectValues">{item}</span>)
                }
            </label>
        );
    }

    return (
        <label className={inputClasses}>
            <span className="InputLabelText">{label}</span>
            {inputElement}
            {
                errors.map((item, key) => <span key={key} className="IncorrectValues">{item}</span>)
            }
        </label>
    );
};


export default Input;