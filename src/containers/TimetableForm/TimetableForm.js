import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Border from '../../components/hoc/Border';

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

    const inputChangeHandler = (evt, element) => {

    };

    const createTimeTableFormProceed = () => {
        event.preventDefault();

        // this.setState({signUpCorrect: true});
        setCreationCheck(true);

        const formWorkerData = {};
        for (let formWorkElement in workerForm) {
            formWorkerData[formWorkElement] = workerForm[formWorkElement].value;
        }
        const signUp = {
            worker: formWorkerData
        }
        axios.post('/timetable.json', signUp).then(response => console.log(response))
            .catch(error => console.log(error));
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
            <Button btntype="Save" clicked={createTimetableHandler}>Crear horario</Button>

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