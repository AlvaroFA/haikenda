import React, {useState } from 'react';
import Button from '../../components/UI/Button/Button';
import './SignUp.css';
import Input from '../../components/UI/Input/Input';
import Border from '../../components/hoc/Border';
import axios from '../../axios.app';

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
        isValid: false
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
        isValid: false

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
        isValid: false
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
        isValid: false
    },
}

function SignUp() {
    const [workerForm, setWorkerForm] = useState(initialWorkerForm);
    const [signUpCorrect, setSignUpCorrect] = useState(false);

    /*checks if all validation are correct returning true if correct or
    otherwise false if something its wrong*/
    const checkValidation = (value, rules) => {
        let itsOk;

        if (rules.required) {
            itsOk = value.trim() !== '' ? true : false;
        }

        if (rules.checkEmail) {
            itsOk = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        }
        return itsOk;
    }

    // submit form method
    const signUpProceed = () => {
        event.preventDefault();

        // this.setState({signUpCorrect: true});
        setSignUpCorrect(true)

        const formWorkerData = {};
        for (let formWorkElement in workerForm) {
            formWorkerData[formWorkElement] = workerForm[formWorkElement].value;
        }
        const signUp = {
            worker: formWorkerData
        }
        axios.post('/workers.json', signUp).then(response => console.log(response))
            .catch(error => console.log(error));
    };

    const signUpCancelled = () => {
        // this.setState({signUpCorrect: false});
        setSignUpCorrect(false)

        console.log('Cancelando el alta');
    };

    const clearForm = () => {
        document.getElementById("form").reset();
    }


    const inputChangeHandler = (evt, inputId) => {
        // cloning the data 
        const updatedWorkerForm = {
            ...workerForm
        };
        //accessing to elements
        const updatedElement = { ...updatedWorkerForm[inputId] };
        updatedElement.value = event.target.value;
        //checking validations
        updatedElement.valid = checkValidation(updatedElement.value, updatedElement.validation);
        console.log(updatedElement);
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
    let form = (
        <form onSubmit={signUpProceed} id='form'>
            {formElementsArray.map(formElement => (

                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    inputConfig={formElement.config.inputConfig}
                    value={formElement.config.value}
                    incorrectValues={!formElement.config.isValid}
                    changed={(evt) => inputChangeHandler(evt, formElement.id)}
                    label={formElement.config.label}
                />
            ))}
            <Button btntype="Save" clicked={signUpProceed}>Alta de usuario</Button>
            <Button btnType="Cancel" clicked={signUpCancelled}>Cancelar Alta</Button>
            <Button btnType="Clear" clicked={clearForm}>Limpiar</Button>
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