import React, { useState } from 'react';
import './SignUp.css';
import Input from '../../components/UI/Input/Input';
import Border from '../../components/hoc/Border';
import axios from '../../axios.app';

/**
 * Checks that a string is a strong password:
 * length >=8, with at least 1 lower and upper case letters, 1 number and 1 symbol 
 * @type {RegExp} */
const strongPasswordRegExp = (() => {
    const min1LowerCase = "(?=.*[a-z])"
    const min1UpperCase = "(?=.*[A-Z])"
    const min1Number = "(?=.*[0-9])"
    const min1Symbol = "(?=.*[^a-zA-Z0-9])"
    const minLength8 = "(?=.{8,})"
    return new RegExp("^" + min1LowerCase + min1UpperCase + min1Number + min1Symbol + minLength8);
})();

const emailFormat = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const initialWorkerForm = {
    name: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            placeholder: 'Nombre del trabajador'
        },
        value: '',
        
        label:'Nombre',
        validation: {
            required: true
        },
        edited: false,
        isValid: false,
        validationErrors: ["Campo obligatorio"]
    },
    surname: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            placeholder: 'Apellidos del trabajador'
        },
        value: '',
        label:'Apellidos',
        validation: {
            required: true

        },
        edited: false,
        isValid: false,
        validationErrors: ["Campo obligatorio"]
    },
    email: {
        elementType: 'input',
        inputConfig: {
            type: 'email',
            placeholder: 'Correo del trabajador'
        },
        value: '',
        label:'Email',
        validation: {
            required: true,
            checkEmail: true
        },
        edited: false,
        isValid: false,
        validationErrors: ["Campo obligatorio"]
    },
    job: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            placeholder: 'Puesto del trabajador'
        },
        value: '',
        label:'Puesto',
        validation: {
            required: true
        },
        edited: false,
        isValid: false,
        validationErrors: ["Campo obligatorio"]
    },
    password: {
        elementType: 'input',
        inputConfig: {
            type: 'password',
            placeholder: 'min 8 caracteres, con numeros y símbolos'
        },
        value:'',
        label:'Contraseña',
        validation:{
            required: true,
            checkPassword: true
        },
        edited: false,
        isValid: false,
        validationErrors: ["Campo obligatorio"]
    }
}

const initialOperationResult = {};

function SignUp() {
    const [workerForm, setWorkerForm] = useState(initialWorkerForm);
    const [operationResult, setOperationResult] = useState(initialOperationResult);

    /**
     * Checks if all validation are correct
     * @returns {undefined} if it's correct
     * @returns {String[]} array with error messages if something is wrong
     */ 
    const checkValidation = (value, rules) => {
        let validationErrors = [];
        if(rules.required){
            const isEmpty = value.trim() === '';
            if (isEmpty){
                validationErrors.push("Campo obligatorio");
                return validationErrors;
            } 
        }

        if(rules.checkEmail){
            const hasEmailFormat = value.match(emailFormat);
            if(!hasEmailFormat)    validationErrors.push("Formato de email incorrecto");
        }

        if(rules.checkPassword) {
            const hasPasswordRequirements = value.match(strongPasswordRegExp)
            if (!hasPasswordRequirements) validationErrors.push("Mínimo 8 caracteres, con  al menos 1 minúscula, mayúscula, número y símbolo");
        }
        return validationErrors;
    }

    const isValid = () => {
        for(const field in workerForm) {
            if(workerForm[field].validationErrors.length>0) return false;
        }
        return true;
    }

    const clearForm = () => {
        setOperationResult(initialOperationResult);
        setWorkerForm(initialWorkerForm);
    }

    const submitFailed = () => {
        return operationResult.failed && operationResult.operation==='submit'
    }

    const failSubmitOperation = (error)=>{
        let reason = error.message;
        if(error.response && error.response.data && error.response.data.error) reason = error.response.data.error;
        setOperationResult({
            failed: true,
            operation: 'submit',
            reason
        });
    }

    const isWaitingForOperation = ()=> {
        return operationResult.waiting;
    }

    const startSubmitOperation = ()=> {
        setOperationResult({
            waiting: true,
            operation: 'submit'
        });
    }

    const successSubmitOperation = () => {
        setOperationResult({
            success: true,
            operation: 'submit'
        });
    }

    const getValuesFromForm = ()=> {
        const formWorkerData = {};
        for (let formWorkElement in workerForm) {
            formWorkerData[formWorkElement] = workerForm[formWorkElement].value;
        }
    }

    // submit form method
    const signUpProceed = () => {
        event.preventDefault();

        //only submit if it's valid
        if(!isValid()) {
            failSubmitOperation("Algún dato no es válido");
            return;
        }

        startSubmitOperation();

        axios.post('/workers.json', {
            worker: getValuesFromForm()
        })
        .then(result => {
            successSubmitOperation();
            clearForm();
        })
        .catch(error => {
            failSubmitOperation(error);
        });
    };

    const inputChangeHandler = (evt, inputId) => {
        // cloning the data 
        const updatedWorkerForm = {
            ...workerForm
        };
        //accessing to elements
        const updatedElement = { ...updatedWorkerForm[inputId] };
        updatedElement.value = event.target.value;
        updatedElement.edited = true;
        //checking validations
        updatedElement.validationErrors= checkValidation(updatedElement.value, updatedElement.validation);
        updatedElement.isValid = !!updatedElement.validationErrors
        // settings new values
        updatedWorkerForm[inputId] = updatedElement;
        //overwritting the state
        // this.setState({workerForm: updatedWorkerForm});
        setWorkerForm(updatedWorkerForm)
    }

    /** antiguo render */
    const formElementsArray = [];
    for (let k in workerForm) {
        formElementsArray.push({
            id: k,
            config: workerForm[k]
        });
    }
    let state;
    if(operationResult.operation==='submit') {
        if(operationResult.waiting) state = <p className="state waiting">Guardando...</p>
        else if (operationResult.success) state = <p className="state success">Usuario guardado</p>
        else if (operationResult.failed) state = <p className="state failed">{"No se pudo guardar el usuario: "+operationResult.reason}</p>
    }

    const form = (
        <form>
            <fieldset disabled={isWaitingForOperation()}>
                {formElementsArray.map(formElement => (

                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        inputConfig={formElement.config.inputConfig}
                        value={formElement.config.value}
                        incorrectValues={submitFailed() || formElement.config.edited ? formElement.config.validationErrors : undefined}
                        changed={(evt) => inputChangeHandler(evt, formElement.id)}
                        label={formElement.config.label}
                    />
                ))}
                <button className="Save" onClick={signUpProceed} >Alta de usuario</button>
                <button className="Clear" onClick={clearForm}>Limpiar</button>            
                {state}    
            </fieldset>
        </form>
    );
    return (
        <Border>
            <div>
                <h4>Alta de usuario</h4>
                {form}
            </div>
        </Border>
    )
}

export default SignUp;