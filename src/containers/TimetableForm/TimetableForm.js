import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Border from '../../components/hoc/Border';
import axios from '../../axios.app';

const initialTimeTableForm = {
    oneTime:{
        elementType: 'input',
        inputConfig: {
            type: 'checkbox',
            name: 'once',
        },
        value: '',
        label:'Repetir una vez',
        validation: {
            required: true,
        },
        isValid: false,
        
    },
    weekly:{
        elementType: 'input',
        inputConfig: {
            type: 'checkbox',
            name: 'weekly',
        },
        value: '',
        label:'Semanalmente',
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
        label:'Titulo del horario',
        validation: {
            required: true,
        },
        isValid: false
    },
    startTime: {
        elementType: 'input',
        inputConfig: {
            type: 'date',
            placeholder: 'dd/mm/YYYY'
        },
        value: '',
        label:'Fecha de inicio',
        validation: {
            required: true
        },
        isValid: false
    },
    endTime: {
        elementType: 'input',
        inputConfig: {
            type: 'date',
            placeholder: 'dd/mm/YYYY'
        },
        value: '',
        label:'Fecha de fin',
        validation: {
            required: true
        },
        isValid: false
    },


}
function TimeTableForm() {

    const [timeTableForm, setTimeTableform] = useState(initialTimeTableForm);
    const [creationCheck, setCreationCheck] = useState(false);

    const createTimetableHandler = () => {

    };

    const checkValidation= (value , rules) =>{
           
    
    }

    const inputChangeHandler = (evt, inputId) => {        // cloning the data 
        const newTimeTableForm = {
            ...timeTableForm
        };
        //accessing to elements
        const updatedElement = { ...newTimeTableForm[inputId] };
        updatedElement.value = event.target.value;
        //checking validations
        updatedElement.valid = checkValidation(updatedElement.value, updatedElement.validation);
        console.log(updatedElement);
        // settings new values
        newTimeTableForm[inputId] = updatedElement;
        //overwritting the state
        setTimeTableform(newTimeTableForm);

    };

    const createTimeTableFormProceed = () => {
        event.preventDefault();
        setCreationCheck(true);
        const timeTableData = {};
        for( let timeTableElement in timeTableForm){
            timeTableData[timeTableElement] = timeTableForm[timeTableElement].value;
        }
        axios.post('/timetable.json', timeTableData).then(response => console.log(response))
        .catch(error=> console.log(error));    
    };


    const formElementsArray = [];
    for (let k in timeTableForm) {
        formElementsArray.push({
            id: k,
            config: timeTableForm[k]
        });
    }
    let form = (
        <form onSubmit={createTimeTableFormProceed} id='form'>
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
            <Button btntype="Save" clicked={createTimeTableFormProceed}>Crear horario</Button>

        </form>
    )
    return (
        <Border>
            <div>
                <h4>Gestión de Horario</h4>
                {form}
            </div>
        </Border>
    )

}
export default TimeTableForm;