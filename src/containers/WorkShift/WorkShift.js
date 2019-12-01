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
            label:'Empleado',
            validation: {
                required: true
            },
            isValid: false,
        },
        timetable: {
            elementType: 'select',
            value: '',
            label:'Horario',
            validation: {
                required: true
            },
            isValid: false,
        },
        date: {
            elementType: 'input',
            inputConfig: {
                type: 'date',
            },
            value: '',
            label:'Fecha',
            validation: {
                required: true,
            },
            isValid: false
        },
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
            <div>
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
            </div>
        );

        return workerList;
    }

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
            <div>
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
            </div>

        );
        return timeTableList;
    }

    const clearFormHandler = (event) => {
        event.preventDefault();
        setWorkShiftFormData(initialWorkShiftFormData);
    }

    const saveForm = (event)=> {
        //TODO
    }


    let form = (
        <form>
            {fillworkerSelect()}
            {fillTimeTableSelect()}
            <Input elementType=""></Input>
            <Button btntype="Save" clicked={saveForm}>  Guardar</Button>
            <Button btntype="Reset" clicked={clearFormHandler}> Reiniciar</Button>
        </form>



    );


    return (
        <Border>
            <h1>asdlkajdl</h1>
            {form}
        </Border>

    )
}




export default WorkShift;
