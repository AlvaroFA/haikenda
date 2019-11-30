import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Border from '../../components/hoc/Border';
import axios from '../../axios.app';
import TimeTableContainer from '../../components/TimeTableContainer/TimeTableContainer';

const initialTimeTableForm = {
    timeTableForm: {
        oneTime: {
            elementType: 'input',
            inputConfig: {
                type: 'checkbox',
                name: 'once',
            },
            value: '',
            label: 'Repetir una vez',
            validation: {
                required: true,
            },
            isValid: false,
        },
        weekly: {
            elementType: 'input',
            inputConfig: {
                type: 'checkbox',
                name: 'weekly',
            },
            value: '',
            label: 'Semanalmente',
            validation: {
                required: true,
            },
            isValid: false,

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
            isValid: false
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
                required: true
            },
            isValid: false
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
                required: true
            },
            isValid: false
        }
    }

}
const data = {};
function TimeTableForm() {

    const [timeTableFormState, setTimeTableform] = useState(initialTimeTableForm);
    const [creationCheck, setCreationCheck] = useState(false);
    const [dataState, setData] = useState(data)
    const isMounted = useRef(true);


    const checkValidation = (value, rules) => {
        let itsOk;
        if (rules.required) {
            itsOk = value.trim() !== '' ? true : false;
        }
    }

    const loadDBDataInState = ()=>{
        axios.get('https://haikenda-6a939.firebaseio.com/timetable.json').then(response => {
            if (isMounted.current == true) {
                setData(response.data);
            }
        })
    }

    useEffect(() => {
        loadDBDataInState();
        return (() => {
            isMounted.current = false;
        });
    }, []);


    useEffect(()=>{
        for (let k in dataState) {
            timeTableElementsArray.push({
                id:  k,
                datos:dataState[k]
            });
        }
    });

    const inputChangeHandler = (event, inputId) => { 
        event.preventDefault();       // cloning the data 
        const newTimeTableForm = {
            ...timeTableFormState.timeTableForm
        };
        //accessing to elements
        const updatedElement = { ...newTimeTableForm[inputId] };
        updatedElement.value = event.target.value;
        //checking validations
        updatedElement.valid = checkValidation(updatedElement.value, updatedElement.validation);
        // settings new values
        newTimeTableForm[inputId] = updatedElement;
        //overwritting the state
        setTimeTableform({ ...timeTableFormState, timeTableForm: newTimeTableForm });

    };


    const clearFormHandler = (event) => {
        event.preventDefault();
        setTimeTableform(initialTimeTableForm);
    }

    const createTimeTableFormProceed = (event) => {
        event.preventDefault();
        setCreationCheck(true);
        const timeTableData = {};
        for (let timeTableElement in timeTableFormState.timeTableForm) {
            timeTableData[timeTableElement] = timeTableFormState.timeTableForm[timeTableElement].value;
        }
        axios.post('/timetable.json', timeTableData)
            .then(response =>{
                loadDBDataInState();
            })
            .catch(error => console.log(error));
    }


    const formElementsArray = [];
    for (let k in timeTableFormState.timeTableForm) {
        formElementsArray.push({
            id: k,
            config: timeTableFormState.timeTableForm[k]
        });
    }
    const timeTableElementsArray = [];
    for (let k in dataState) {
        timeTableElementsArray.push({
            id:  k,
            datos:dataState[k]
        });
    }
let form = (
    <form id='form'>
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
        <Button btntype="tes" clicked={createTimeTableFormProceed}>Crear horario</Button>
        <Button btntype="Save" clicked={clearFormHandler}>Borrar</Button>
    </form>


);

let table = (
    <div>
    {timeTableElementsArray.map(elemento=>(
        <TimeTableContainer key={elemento.id} title={elemento.datos.title} startTime={elemento.datos.startTime} endTime={elemento.datos.endTime} />
    ))}
    </div>
);


return (
    <Border>
        <div>
            <h4>Gestión de Horario</h4>
            {form}
            {table}
        </div>
    </Border>
)

}
export default TimeTableForm;