import React, { useState, useRef, useEffect } from 'react';
import './SignUp.css';
import Input from '../../components/UI/Input/Input';
import Border from '../../components/hoc/Border';
import Workers from '../../providers/WorkersProvider';
import useOperationState from '../../hooks/OperationState';
import WorkerContainer from '../../components/WorkerContainer/WorkerContainer';
import provider from '../../providers/WorkersProvider';
import Button from '../../components/UI/Button/Button';
import { currentUser } from '../../providers/RealmProvider';

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
    id: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            name: 'id',
            disabled: true,
            hidden: true,
        },
        value: '',
        label: 'ID',
    },
    name: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            placeholder: 'Nombre del trabajador'
        },
        value: '',

        label: 'Nombre',
        validation: {
            required: true
        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    },
    surname: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            placeholder: 'Apellidos del trabajador'
        },
        value: '',
        label: 'Apellidos',
        validation: {
            required: true

        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    },
    email: {
        elementType: 'input',
        inputConfig: {
            type: 'email',
            placeholder: 'Correo del trabajador',
            disabled: false
        },
        value: '',
        label: 'Email',
        validation: {
            required: true,
            checkEmail: true
        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    },
    job: {
        elementType: 'input',
        inputConfig: {
            type: 'text',
            placeholder: 'e.j. Coordinadora'
        },
        value: '',
        label: 'Descripción',
        edited: false,
    },
    password: {
        elementType: 'input',
        inputConfig: {
            type: 'password',
            placeholder: 'min 8 caracteres, con numeros y símbolos'
        },
        value: '',
        label: 'Contraseña',
        validation: {
            required: true,
            checkPassword: true
        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    },
    admin: {
        elementType: 'input',
        inputConfig: {
            type: 'checkbox',
            placeholder: 'Administrador'
        },
        value: false,
        label: 'Administrador',
        edited: false,
    },
}

// initial values for useState
const initialWorkersData = {};

function SignUp() {
    const [workerForm, setWorkerForm] = useState(initialWorkerForm);
    const [dataState, setDataState] = useState(initialWorkersData);
    const isMounted = useRef(true);
    const { operation,
        OPERATIONS,
        hasFailed,
        isWaitingForOperation,
        failOperation,
        successOperation,
        startOperation,
        clearOperation
    } = useOperationState();

    const user = currentUser();

    /**
     * Checks if all validation are correct
     * @returns {undefined} if it's correct
     * @returns {String[]} array with error messages if something is wrong
     */
    const checkValidation = (value, rules) => {
        let validationErrors = [];
        if (!rules) return validationErrors;

        if (rules.required) {
            const isEmpty = value.trim() === '';
            if (isEmpty) {
                validationErrors.push("Campo obligatorio");
                return validationErrors;
            }
        }

        if (rules.checkEmail) {
            const hasEmailFormat = value.match(emailFormat);
            if (!hasEmailFormat) validationErrors.push("Formato de email incorrecto");
        }

        if (rules.checkPassword) {
            const hasPasswordRequirements = value.match(strongPasswordRegExp)
            if (!hasPasswordRequirements) validationErrors.push("Mínimo 8 caracteres, con  al menos 1 minúscula, mayúscula, número y símbolo");
        }
        return validationErrors;
    }

    const isValid = () => {
        for (const field in workerForm) {

            if (workerForm[field].validationErrors &&
                workerForm[field].validationErrors.length > 0) {
                return false;
            }
        }
        return true;
    }

    const clearForm = (event) => {
        if (event) event.preventDefault();
        clearOperation();
        setWorkerForm(initialWorkerForm);
    }

    const getValuesFromForm = () => {
        const formWorkerData = {};
        for (let formWorkElement in workerForm) {
            formWorkerData[formWorkElement] = workerForm[formWorkElement].value;
        }
        return formWorkerData;
    }

    //Variable to fecthing values from DDBB
    const loadDBDataInState = () => {
        startOperation(OPERATIONS.FETCH);
        provider.fetchWorkers().then(response => {
            if (isMounted.current === true) {
                setDataState(response);
                successOperation(OPERATIONS.FETCH);
            }
        }).catch((error) => {
            failOperation(OPERATIONS.FETCH, error);
        });
    }

    //Using isMounted to avoid race condition 
    useEffect(() => {
        loadDBDataInState();
        return (() => {
            isMounted.current = false;
        });
    }, []);

    // submit form method
    const signUpProceed = (event) => {
        event.preventDefault();

        //only submit if it's valid
        if (!isValid()) {
            failOperation(OPERATIONS.CREATE, "Algún dato no es válido");
            return;
        }

        startOperation(OPERATIONS.CREATE);

        const newWorker = getValuesFromForm();
        Workers.createWorkerAndAccount(newWorker)
            .then(result => {
                successOperation(OPERATIONS.CREATE);
                loadDBDataInState();
                clearForm();
            })
            .catch(error => {
                failOperation(OPERATIONS.CREATE, error);
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
        updatedElement.validationErrors = checkValidation(updatedElement.value, updatedElement.validation);
        // settings new values
        updatedWorkerForm[inputId] = updatedElement;
        //overwritting the state
        // this.setState({workerForm: updatedWorkerForm});
        setWorkerForm(updatedWorkerForm)
    }

    const editionId = () => workerForm.id.value;
    const sameUidAsLogged = (uid) => {
        if (!user || !user.uid)
            return false; //no debería ocurrir
        return user.uid === uid;
    }

    /**
     * @param event 
     * @param uid determine which worker will be deleted
     */
    const erasehandler = (event, uid) => {
        event.preventDefault();
        event.stopPropagation();
        if (!confirm("Borrar usuario?")) {
            return;
        }
        // executing delete method
        startOperation(OPERATIONS.DELETE);
        provider.deleteWorker(uid)
            .then(response => {
                // reloading new data
                loadDBDataInState();
                if (editionId() === uid) {
                    setWorkerForm(initialWorkerForm);
                }
                successOperation(OPERATIONS.DELETE);
            })
            .catch(error => {
                console.log(error);
                failOperation(OPERATIONS.DELETE, error);
            });
    };

    const editWorkerFormProceed = (event, uid) => {
        event.preventDefault();
        //coger los datos del form
        const workerData = {};
        for (let workerProp in workerForm) {
            workerData[workerProp] = workerForm[workerProp].value;
        }
        delete workerData.id; //we don't want to send the id as a param, it will be only in the URL
        //saving data
        delete workerData.email; //we don't want to send the email, because we won't be able to update it anyway
        startOperation(OPERATIONS.UPDATE);
        provider.updateWorker(uid, workerData)
            .then(() => {
                //Clear form
                setWorkerForm(initialWorkerForm);
                //reloading data list
                loadDBDataInState();
                successOperation(OPERATIONS.UPDATE);
            })
            .catch(error => {
                console.log(error);
                failOperation(OPERATIONS.UPDATE);
            });
    };


    const fillFormToEdit = (id, data) => {
        const newForm = { ...workerForm };
        newForm.id = { ...newForm.id };
        newForm.id.value = id;
        newForm.id.inputConfig = { ...newForm.id.inputConfig, hidden: false };
        //Email won't be updatable, so don't show it editable
        newForm.email = { ...newForm.email };
        newForm.email.inputConfig = { ...newForm.email.inputConfig, disabled: true }
        //We don't allow to edit the password
        delete newForm.password;
        for (const fieldName in data) {
            let value = data[fieldName]
            newForm[fieldName] = {
                ...newForm[fieldName],
                value,
                edited: true
            }
        }
        setWorkerForm(newForm);
    }

    const startEditionHandler = (event, uid) => {
        event.preventDefault();
        startOperation(OPERATIONS.FETCH);
        provider.fetchOneWorker(uid).then(data => {
            if (isMounted.current === true) {
                fillFormToEdit(uid, data);
                successOperation(OPERATIONS.FETCH);
            }
        }).catch(error => {
            console.log(error);
            failOperation(OPERATIONS.FETCH, error);
        });
    }

    const getOperationInfo = () => {
        if (operation.operation === OPERATIONS.CREATE || operation.operation === OPERATIONS.UPDATE) {
            if (operation.waiting)
                return <p className="state waiting">Guardando...</p>
            if (operation.success)
                return <p className="state success">Usuario guardado</p>
            if (operation.failed)
                return <p className="state failed">{"No se pudo guardar el usuario: " + operation.reason}</p>
        }
    }

    const createForm = () => {
        const formElementsArray = [];
        for (let k in workerForm) {
            formElementsArray.push({
                id: k,
                config: workerForm[k]
            });
        }

        const failedCreationOrEdition = hasFailed(OPERATIONS.CREATE) || hasFailed(OPERATIONS.UPDATE);

        const operationInfo = getOperationInfo();

        const form = (
            <form>
                <fieldset disabled={isWaitingForOperation()}>
                    {formElementsArray.map(formElement => (

                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            inputConfig={formElement.config.inputConfig}
                            value={formElement.config.value}
                            incorrectValues={failedCreationOrEdition || formElement.config.edited ? formElement.config.validationErrors : undefined}
                            changed={(evt) => inputChangeHandler(evt, formElement.id)}
                            label={formElement.config.label}
                        />
                    ))}
                    {editionId() //we consider that is and edition when we already have an ID 
                        ? <Button btntype="Edit" clicked={(event) => editWorkerFormProceed(event, editionId())}>Guardar usuario</Button>
                        : <Button btntype="Create" clicked={signUpProceed}>Crear usuario</Button>
                    }
                    <Button className="Clear" clicked={clearForm}>Limpiar</Button>
                    {operationInfo}
                </fieldset>
            </form>
        );
        return form;
    }

    /*Creation Table method */
    const createTable = () => {
        /*Array to populate worker elements*/
        const workersArray = [];
        for (let k in dataState) {
            workersArray.push({
                id: k,
                datos: dataState[k]
            });
        }

        let table = (
            <div>
                {workersArray.map(elemento => (
                    // Creation  Worker element and populating
                    <WorkerContainer
                        key={elemento.id}
                        name={elemento.datos.worker.name}
                        surname={elemento.datos.worker.surname}
                        email={elemento.datos.worker.email}
                        admin={elemento.datos.worker.admin}
                        job={elemento.datos.worker.job}
                        onDelete={sameUidAsLogged(elemento.id)
                            ? undefined
                            : ((event) => erasehandler(event, elemento.id))}
                        onUpdate={(event) => startEditionHandler(event, elemento.id)}
                        disabled={isWaitingForOperation()}
                    />
                ))}
            </div>
        );

        return table;
    };
    return (
        <Border>
            <div>
                <h4>Alta de usuario</h4>
                {createForm()}
                {createTable()}
            </div>
        </Border>
    )
}

export default SignUp;