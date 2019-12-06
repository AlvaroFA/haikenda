import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Border from '../../components/hoc/Border';
import TimeTableContainer from '../../components/TimeTableContainer/TimeTableContainer';
import provider from '../../providers/TimetableProvider';
import useOperationState from '../../hooks/OperationState';

// initial state of form
const initialTimeTableForm = {
    timeTableForm: {
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
        title: {
            elementType: 'input',
            inputConfig: {
                type: 'text',
                placeholder: 'Nombre del horario'
            },
            value: '',
            label: 'Titulo del horario',
            validation: {
                required: true,
            },
            edited: false,
            validationErrors: ["Campo obligatorio"]
        },
        startTime: {
            elementType: 'input',
            inputConfig: {
                type: 'time',
                placeholder: '00:00'
            },
            value: '',
            label: 'Hora de Inicio',
            validation: {
                required: true,
                lessThan: 'endTime',
            },
            edited: false,
            validationErrors: ["Campo obligatorio"]
        },
        endTime: {
            elementType: 'input',
            inputConfig: {
                type: 'time',
                placeholder: '00:00'
            },
            value: '',
            label: 'Hora de Fin',
            validation: {
                required: true,
                greaterThan: 'startTime',
            },
            edited: false,
            validationErrors: ["Campo obligatorio"]
        }
    }

}
// initial values for useState
const data = {};

function TimeTableForm() {

    //useState variables
    const [timeTableFormState, setTimeTableFormState] = useState(initialTimeTableForm);
    const [dataState, setData] = useState(data);
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

    const isEmpty = (value) => {
        return value.trim() === '';
    }

    const validateInputInForm = (form, value, rules)=> {
        if (!rules) return [];

        let validationErrors = [];
        
        if (rules.required) {
            if (isEmpty(value)) {
                validationErrors.push("Campo obligatorio");
                return validationErrors;
            }
        }

        if(!isEmpty(value)) {
            if (rules.greaterThan) {
                let otherField = rules.greaterThan;
                otherField = form[otherField];
                const otherValue = otherField.value;
                if (!isEmpty(otherValue) && !(value > otherValue)) {
                    validationErrors.push(`Tiene que ser mayor a '${otherField.label}'`);
                }
            }

            if (rules.lessThan) {
                let otherField = rules.lessThan;
                otherField = form[otherField];
                const otherValue = otherField.value;
                if (!isEmpty(otherValue) && !(value < otherValue)) {
                    validationErrors.push(`Tiene que ser menor que '${otherField.label}'`);
                }
            }
        }

        return validationErrors;
    }

    const isValid = (form = timeTableFormState.timeTableForm) => {
        for(const field in form) {
            const input = form[field];
            if(input.validationErrors && 
                input.validationErrors.length>0) {
                    return false;
            }
        }
        return true;
    }

    //Variable to fecthing values from DDBB
    const loadDBDataInState = () => {
        startOperation(OPERATIONS.FETCH);
        provider.fetchTimetables().then(response => {
            if (isMounted.current == true) {
                setData(response);
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


    /*verify when detect changes on input*/
    const inputChangeHandler = (event, inputId) => {
        event.preventDefault();       
        event.stopPropagation();
        const newTimeTableForm = {
            ...timeTableFormState.timeTableForm
        };
        //accessing to elements
        const updatedElement = { ...newTimeTableForm[inputId] };
        updatedElement.value = event.target.value;
        updatedElement.edited = true;
        // settings new values
        newTimeTableForm[inputId] = updatedElement;

        //Validate the complete form
        for(const field in newTimeTableForm) {
            const input = newTimeTableForm[field];
            newTimeTableForm[field] = {
                ...newTimeTableForm[field],
                validationErrors: validateInputInForm(newTimeTableForm, input.value, input.validation)
            };
        }

        setTimeTableFormState({ timeTableForm: newTimeTableForm });
    };

    // Clear form
    const clearFormHandler = (event) => {
        event.preventDefault();
        clearOperation();
        setTimeTableFormState(initialTimeTableForm);
    }

    const getDataFromForm = ()=>{
        const timeTableData = {};
        for (let timeTableElement in timeTableFormState.timeTableForm) {
            timeTableData[timeTableElement] = timeTableFormState.timeTableForm[timeTableElement].value;
        }
        delete timeTableData.id;
        return timeTableData;
    }

    /*Creation form
    Iterates inpus values and save into a variable timeTableData. This variable is passed to axios post 
    to store data into DDBB */

    const createTimeTableFormProceed = (event) => {
        event.preventDefault();
        event.stopPropagation();
        //only submit if it's valid
        if(!isValid()) {
            failOperation(OPERATIONS.CREATE,"Algún dato no es válido");
            return;
        }

        const timeTableData = getDataFromForm();
        //saving data
        startOperation(OPERATIONS.CREATE);
        provider.createTimetable(timeTableData)
            .then(() => {
                //Clear form
                setTimeTableFormState(initialTimeTableForm);
                //reloading data list
                loadDBDataInState();
                successOperation(OPERATIONS.CREATE);
            })
            .catch(error => {
                console.log(error);
                failOperation(OPERATIONS.CREATE, error);
            });
    };

    /*EraseMethod
    @param idTimetable determine which timeline would be deleted
    */
    const erasehandler = (event, idTimetable) => {
        event.preventDefault();
        event.stopPropagation();
        if (!confirm("Borrar horario?")) {
            return;
        }
        // executing delete method
        startOperation(OPERATIONS.DELETE);
        provider.deleteTimetable(idTimetable)
            .then(response => {
                // reloading new data
                loadDBDataInState();
                if (editionId() === idTimetable) {
                    setTimeTableFormState(initialTimeTableForm);
                }
                successOperation(OPERATIONS.DELETE);
            })
            .catch(error => {
                console.log(error);
                failOperation(OPERATIONS.DELETE, error);
            });
    };

    const startEditionHandler = (event, timetableId) => {
        event.preventDefault();
        event.stopPropagation();
        startOperation(OPERATIONS.FETCH);
        provider.fetchOneTimetable(timetableId).then(response => {
            if (isMounted.current === true) {
                console.log(response);
                fillFormToEdit(timetableId, response);
                successOperation(OPERATIONS.FETCH);
            }
        }).catch(error => {
            console.log(error);
            failOperation(OPERATIONS.FETCH, error);
        });
    }

    const editTimeTableFormProceed = (event, timetableId) => {
        event.preventDefault();
        event.stopPropagation();
        //coger los datos del form
        const timeTableData = {};
        for (let timeTableElement in timeTableFormState.timeTableForm) {
            timeTableData[timeTableElement] = timeTableFormState.timeTableForm[timeTableElement].value;
        }
        delete timeTableData.id; //we don't want to send the id as a param, it will be only in the URL
        //saving data
        startOperation(OPERATIONS.UPDATE);
        provider.updateTimetable(timetableId, timeTableData)
            .then(() => {
                //Clear form
                setTimeTableFormState(initialTimeTableForm);
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
        const newForm = { ...timeTableFormState.timeTableForm };
        newForm.id = { ...newForm.id };
        newForm.id.value = id;
        newForm.id.inputConfig = { ...newForm.id.inputConfig, hidden: false };
        for (const fieldName in data) {
            let value = data[fieldName]
            newForm[fieldName] = {
                ...newForm[fieldName],
                value,
                edited: true
            }
        }

        //Validate the complete form
        for(const field in newForm) {
            const input = newForm[field];
            newForm[field] = {
                ...newForm[field],
                validationErrors: validateInputInForm(newForm, input.value, input.validation)
            };
        }

        setTimeTableFormState({ timeTableForm: newForm });
    }

    /*Array to populate forms elements*/
    const formElementsArray = [];
    for (let k in timeTableFormState.timeTableForm) {
        formElementsArray.push({
            id: k,
            config: timeTableFormState.timeTableForm[k]
        });
    }
    /*Array to populate timetable elements*/
    const timeTableElementsArray = [];
    for (let k in dataState) {
        timeTableElementsArray.push({
            id: k,
            datos: dataState[k]
        });
    }
    
    const editionId = () => timeTableFormState.timeTableForm.id.value;

    const getOperationInfo = ()=>{
        if(operation.operation===OPERATIONS.CREATE || operation.operation===OPERATIONS.UPDATE) {
            if(operation.waiting) 
                return <p className="state waiting">Guardando...</p>
            if (operation.success) 
                return <p className="state success">Usuario guardado</p>
            if (operation.failed) 
                return <p className="state failed">{"No se pudo guardar el usuario: "+operation.reason}</p>
        }
    }

    /*Creation form method */
    const createForm = () => {
        const formElementsArray = [];
        for (let k in timeTableFormState.timeTableForm) {
            let item = timeTableFormState.timeTableForm[k]
            if(item.label) {
                formElementsArray.push({
                    id: k,
                    config: item
                });
            }
        }

        const failedCreationOrEdition = hasFailed(OPERATIONS.CREATE) || hasFailed(OPERATIONS.UPDATE);

        const operationInfo = getOperationInfo();

        let form = (
            <fieldset disabled={isWaitingForOperation()}>
                <form id='form'>

                    {formElementsArray.map(formElement => (
                        //Populating input component, create once for each form element
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
                        ? <Button btntype="Edit" clicked={(event) => editTimeTableFormProceed(event, editionId())}>Editar horario</Button>
                        : <Button btntype="Create" clicked={createTimeTableFormProceed}>Crear horario</Button>
                    }
                    <Button btntype="Clear" clicked={clearFormHandler}>Limpiar</Button>
                    {operationInfo}
                </form>
            </fieldset>
        );
        return form;
    };



    /*Creation Table method */
    const createTable = () => {
        let table = (
            <div>
                {timeTableElementsArray.map(elemento => (
                    // Creation  TimeTable element and populating
                    <TimeTableContainer
                        key={elemento.id}
                        title={elemento.datos.title}
                        startTime={elemento.datos.startTime}
                        endTime={elemento.datos.endTime}
                        onClick={(event) => erasehandler(event, elemento.id)}
                        toupdate={(event) => startEditionHandler(event, elemento.id)}
                        disabled={isWaitingForOperation()}
                    />
                ))}
            </div>
        );

        return table;
    };


    return (
        //Added HOC (High order Component) and adding method to display data 
        <Border>
            <div>
                <h4>Gestión de Horario</h4>
                {createForm()}
                {createTable()}
            </div>
        </Border>
    )

}
export default TimeTableForm;