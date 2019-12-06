import React, { Fragment, useEffect, useRef, useState } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import WorkShiftContainer from '../../components/WorkShiftContainer/WorkShiftContainer';
import useOperationState from '../../hooks/OperationState';
import TimeTableProvider from '../../providers/TimetableProvider';
import WorkerProvider from '../../providers/WorkersProvider';
import { default as WorkShiftProvider, default as WorkshiftProvider } from '../../providers/WorkshiftProvider';

const initialWorkShiftFormData = {
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
    worker: {
        elementType: 'select',
        value: '',
        label: 'Empleado',
        validation: {
            required: true
        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    },
    timetable: {
        elementType: 'select',
        value: '',
        label: 'Horario',
        validation: {
            required: true
        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    },
    startTime: {
        elementType: 'input',
        inputConfig: {
            type: 'date',
        },
        value: '',
        label: 'Dia inicial',
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
            type: 'date',
        },
        value: '',
        label: 'Dia  final',
        validation: {
            required: true,
            greaterThan: 'startTime',
        },
        edited: false,
        validationErrors: ["Campo obligatorio"]
    }
}


const WorkShift = () => {
    const isMounted = useRef(true);
    const [workShiftFormData, setWorkShiftFormData] = useState(initialWorkShiftFormData);
    const [workerData, setWorkerData] = useState({});
    const [timeTableData, setTimeTableData] = useState({});
    const [workShitData, setworkShiftData] = useState({});
    const { operation,
        OPERATIONS,
        hasFailed,
        isWaitingForOperation,
        failOperation,
        successOperation,
        startOperation,
        clearOperation
    } = useOperationState();
    const loadDBDataInState = () => {
        startOperation(OPERATIONS.FETCH);

        const workers = WorkerProvider.fetchWorkers().then(response => {
            if (isMounted.current === true) {
                setWorkerData(response);
            }
        })

        const timetables = TimeTableProvider.fetchTimetables().then(response => {
            if (isMounted.current === true) {
                setTimeTableData(response);
            }
        })

        const workshifts = WorkShiftProvider.fetchWorkshifts().then(response => {
            if (isMounted.current === true) {
                setworkShiftData(response);
            }
        })
        Promise.all([workers, timetables, workshifts]).then(()=>{
            successOperation(OPERATIONS.FETCH);
        }).catch((error)=>{
            console.error(error);
            failOperation(OPERATIONS.FETCH, "Error cargando los datos");
        });

    }
    //Using isMounted to avoid race condition 
    useEffect(() => {
        loadDBDataInState();
        return (() => {
            isMounted.current = false;
        });
    }, []);


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

    const inputChangeHandler = (event, inputId) => {
        event.preventDefault();       // cloning the data 
        const newWorkShiftFormData = {
            ...workShiftFormData
        };
        //accessing to elements
        const updatedElement = { ...newWorkShiftFormData[inputId] };
        updatedElement.value = event.target.value;
        updatedElement.edited = true;
        // settings new values
        newWorkShiftFormData[inputId] = updatedElement;

        //Validate the complete form
        for(const field in newWorkShiftFormData) {
            const input = newWorkShiftFormData[field];
            newWorkShiftFormData[field] = {
                ...newWorkShiftFormData[field],
                validationErrors: validateInputInForm(newWorkShiftFormData, input.value, input.validation)
            };
        }

        //overwritting the state
        setWorkShiftFormData(newWorkShiftFormData);
    }

    const fillworkerSelect = (incorrectValues) => {
        const workerArray = [];
        for (let k in workerData) {
            let items = workerData[k];
            for (let v in items) {
                workerArray.push({
                    id: k,
                    config: items[v]
                });
            }
        }
        const formElement = workShiftFormData.worker;
        let workerList = (
            <Input
                key={"worker"}
                elementType={formElement.elementType}
                inputConfig={formElement.inputConfig}
                value={formElement.value}
                incorrectValues={incorrectValues}
                changed={(evt) => inputChangeHandler(evt, "worker")}
                label={formElement.label} >
                <option value="" label="--Seleccione una opcion--"></option>
                {workerArray.map(option => (
                    <option
                        key={option.id}
                        value={option.id}
                        label={option.config.name + " " + option.config.surname}
                    ></option>
                ))}
            </Input>
        );

        return workerList;
    }

    const createWorkshiftHandler = (event) => {
        event.preventDefault();
        const workshiftData = {};
        for (let field in workShiftFormData) {
            workshiftData[field] = workShiftFormData[field].value;
        }
        delete workshiftData.id;
        //saving data
        startOperation(OPERATIONS.CREATE);
        WorkShiftProvider.createWorkshift(workshiftData)
            .then(() => {
                //Clear form
                setWorkShiftFormData(initialWorkShiftFormData);
                //reloading data list
                loadDBDataInState();
                successOperation(OPERATIONS.CREATE);
            })
            .catch(error => {
                console.log(error);
                failOperation(OPERATIONS.CREATE, error);
            });
    };

    const fillTimeTableSelect = (incorrectValues) => {
        const timertableArray = [];
        for (let id in timeTableData) {
            let values = timeTableData[id];
            timertableArray.push({
                id: id,
                config: values
            });
        }
        const formElement = workShiftFormData.timetable;
        let timeTableList = (
            <Input
                key={"timetable"}
                elementType={formElement.elementType}
                inputConfig={formElement.inputConfig}
                value={formElement.value}
                incorrectValues={incorrectValues}
                changed={(evt) => inputChangeHandler(evt, "timetable")}
                label={formElement.label}>
                <option label="--Seleccione una opcion--"></option>
                {timertableArray.map(option => (
                    <option
                        key={option.id}
                        value={option.id}
                        label={option.config.title + " (" + option.config.startTime + "-" + option.config.endTime + ")"}
                    ></option>
                ))}
            </Input>
        );
        return timeTableList;
    }

    const giveMeDataWorker = (id) => {
        let data = workerData;
        if (!data || !data[id]) {
            return;
        }
        let name = data[id].worker.name;
        let surname = data[id].worker.surname;

        return `${name} ${surname}`;
    }

    const giveMeDataTimetable = (id) => {
        let data = timeTableData;
        if (!data || !data[id]) {
            return;
        }
        let title = data[id].title;
        let inicio = data[id].startTime;
        let fin = data[id].endTime;

        return `${title} (${inicio}-${fin})`
    }

    const clearFormHandler = (event) => {
        event.preventDefault();
        clearOperation();
        setWorkShiftFormData(initialWorkShiftFormData);
    }

    const erasehandler = (event, id) => {
        event.preventDefault();
        // execiting delete method
        startOperation(OPERATIONS.DELETE);
        WorkShiftProvider.eraseWorkshift(id).then(
            response => {
                // reloading new data
                loadDBDataInState();
                successOperation(OPERATIONS.DELETE);
            }
        ).catch((error)=>{
            console.error(error);
            failOperation(OPERATIONS.DELETE, error);
        });
    };

    const fillFormToEdit = (id, data) => {
        const newForm = { ...workShiftFormData };
        console.log('lña od es' + newForm)
        newForm.id = { ...newForm.id };
        newForm.id.value = id;
        newForm.id.inputConfig = { ...newForm.id.inputConfig, hidden: false };
        for (const fieldName in data) {
            let value = data[fieldName]
            newForm[fieldName] = {
                ...newForm[fieldName],
                value
            }
        }

        //Validate the complete form before loading it
        for(const field in newForm) {
            const input = newForm[field];
            newForm[field] = {
                ...newForm[field],
                validationErrors: validateInputInForm(newForm, input.value, input.validation)
            };
        }

        setWorkShiftFormData(newForm);
    }

    const startEditionHandler = (event, workshift) => {
        event.preventDefault();
        startOperation(OPERATIONS.FETCH);
        WorkShiftProvider.fetchOneWorkshift(workshift).then(response => {
            if (isMounted.current == true) {
                fillFormToEdit(workshift, response);
                successOperation(OPERATIONS.FETCH);
            }
        }).catch((error) => {
            console.error(error);
            startOperation(OPERATIONS.FETCH, error);
        })
    }

    const createTable = () => {
        const formElementsArray = [];
        for (let k in workShitData) {
            let item = workShitData[k];
            formElementsArray.push({
                id: k,
                config: item,
            });
        }
        let table = (
            <div>
                {formElementsArray.map(element => (

                    // Creation  TimeTable element and populating
                    <WorkShiftContainer
                        key={element.id}
                        workshift={giveMeDataTimetable(element.config.timetable)}
                        worker={giveMeDataWorker(element.config.worker)}
                        endTime={element.config.endTime}
                        startTime={element.config.startTime}
                        onClick={(event) => erasehandler(event, element.id)}
                        toupdate={(event) => startEditionHandler(event, element.id)}
                    />
                ))}
            </div>
        );
        return table;
    }

    const editWorkshiftProceed = (event, workshiftId) => {
        event.preventDefault();
        //coger los datos del form
        const currentFormData = {};
        for (let field in workShiftFormData) {
            currentFormData[field] = workShiftFormData[field].value;
        }
        delete currentFormData.id; //we don't want to send the id as a param, it will be only in the URL
        //saving data
        startOperation(OPERATIONS.UPDATE);
        WorkshiftProvider.updateWorkshift(workshiftId, currentFormData)
            .then(() => {
                //Clear form
                setWorkShiftFormData(initialWorkShiftFormData);
                //reloading data list
                loadDBDataInState();
                successOperation(OPERATIONS.UPDATE);
            })
            .catch(error => {
                console.log(error);
                failOperation(OPERATIONS.UPDATE, error);
            });
    };

    const editionId = () => workShiftFormData.id.value;


    const formElementsArray = [];
    for (let k in workShiftFormData) {
        let item = workShiftFormData[k]
        formElementsArray.push({
            id: k,
            config: item
        });
    }

    const failedCreationOrEdition = hasFailed(OPERATIONS.CREATE) || hasFailed(OPERATIONS.UPDATE);


    const getOperationInfo = ()=>{
        if(operation.operation===OPERATIONS.CREATE || operation.operation===OPERATIONS.UPDATE) {
            if(operation.waiting) 
                return <p className="state waiting">Guardando...</p>
            if (operation.success) 
                return <p className="state success">Turno guardado</p>
            if (operation.failed) 
                return <p className="state failed">{"No se pudo guardar el turno: "+operation.reason}</p>
        }
    }

    const operationInfo = getOperationInfo();

    return (
        <Fragment>
            <h1>Gestión del turno</h1>
            <fieldset disabled={isWaitingForOperation()}>
                <form id="form">

                    {formElementsArray.map((formElement) => (
                        //Populating input component, create once for each form element
                        formElement.id === 'worker' ? fillworkerSelect(failedCreationOrEdition || formElement.config.edited ? formElement.config.validationErrors : undefined)
                            : formElement.id === 'timetable' ? fillTimeTableSelect(failedCreationOrEdition || formElement.config.edited ? formElement.config.validationErrors : undefined)
                                : <Input
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
                        ? <Button btntype="Edit" clicked={(event) => editWorkshiftProceed(event, editionId())}>Guardar horario</Button>
                        : <Button btntype="Save" clicked={createWorkshiftHandler}>Crear Horario</Button>
                    }

                    <Button btntype="Clear" clicked={clearFormHandler}>Limpiar</Button>
                    {operationInfo}
                </form>
            </fieldset>
            {createTable()}
        </Fragment>
    )
}

export default WorkShift;
