import React, { useRef, useState, useEffect } from 'react';
import Border from '../../components/hoc/Border';
import axios from '../../axios.app';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


/* Component who assign worker to a timetable */

const initialWorkShiftFormData = {
    worker: {
        elementType: 'select',
        value: '',
        label: 'Empleado',
        validation: {
            required: true
        },
        isValid: false,
    },
    timetable: {
        elementType: 'select',
        value: '',
        label: 'Horario',
        validation: {
            required: true
        },
        isValid: false,
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
        },
        isValid: false
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
        },
        isValid: false
    }
}


const WorkShift = () => {
    const isMounted = useRef(true);
    const [workShiftFormData, setWorkShiftFormData] = useState(initialWorkShiftFormData);
    const [workerData, setWorkerData] = useState({});
    const [timeTableData, setTimeTableData] = useState({});
    const loadDBDataInState = () => {
        axios.get('https://haikenda-6a939.firebaseio.com/workers.json').then(response => {
            if (isMounted.current == true) {
                setWorkerData(response.data);
            }
        })

        axios.get('https://haikenda-6a939.firebaseio.com/timetable.json').then(response => {
            if (isMounted.current == true) {
                setTimeTableData(response.data);
            }
        })


    }
    //Using isMounted to avoid race condition 
    useEffect(() => {
        loadDBDataInState();
        return (() => {
            isMounted.current = false;
        });
    }, []);

    const inputChangeHandler = (event, inputId) => {
        event.preventDefault();       // cloning the data 
        const newWorkShiftFormData = {
            ...workShiftFormData
        };
        //accessing to elements
        const updatedElement = { ...newWorkShiftFormData[inputId] };
        updatedElement.value = event.target.value;
        //checking validations
        //TODO: validaciones
        /* updatedElement.valid = checkValidation(updatedElement.value, updatedElement.validation); */
        // settings new values
        newWorkShiftFormData[inputId] = updatedElement;
        //overwritting the state
        setWorkShiftFormData(newWorkShiftFormData);

    }

    const fillworkerSelect = () => {
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
                    incorrectValues={!formElement.isValid}
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

    const createWorkshift = (event) => {
        event.preventDefault();
        const workshiftData = {};
        for (let field in workShiftFormData) {
            workshiftData[field] = workShiftFormData[field].value;
        }
        delete workshiftData.id;
        //saving data
        axios.post('/workshift.json', workshiftData)
            .then(() => {
                //Clear form
                setWorkShiftFormData(initialWorkShiftFormData);
                //reloading data list
                loadDBDataInState();
            })
            .catch(error => console.log(error));
    };

    const fillTimeTableSelect = () => {
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
                    incorrectValues={!formElement.isValid}
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


    const clearFormHandler = (event) => {
        event.preventDefault();
        setWorkShiftFormData(initialWorkShiftFormData);
    }

    const saveForm = (event) => {
        //TODO
    }


    const formElementsArray = [];
    console.log(workShiftFormData)
    for (let k in workShiftFormData) {
        let item = workShiftFormData[k]
        formElementsArray.push({
            id: k,
            config: item
        });
    }

    return (
        <Border>
            <h1>Gestión del turno</h1>
            <form id="form">
                
                {formElementsArray.map((formElement) => (
                    //Populating input component, create once for each form element
                    formElement.id==='worker' ? fillworkerSelect()
                    : formElement.id === 'timetable' ? fillTimeTableSelect()
                    : <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        inputConfig={formElement.config.inputConfig}
                        value={formElement.config.value}
                        incorrectValues={!formElement.config.isValid}
                        changed={(evt) => inputChangeHandler(evt, formElement.id)}
                        label={formElement.config.label}
                    />
                ))}

                <Button btntype="Save" clicked={createWorkshift}>Guardar</Button>                
                <Button btntype="Clear" clicked={clearFormHandler}>Limpiar</Button>

            </form>
        </Border>
    )
}

export default WorkShift;
