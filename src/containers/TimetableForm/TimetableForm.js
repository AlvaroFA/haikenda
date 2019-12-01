import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Border from '../../components/hoc/Border';
import axios from '../../axios.app';
import TimeTableContainer from '../../components/TimeTableContainer/TimeTableContainer';


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
        Monday: {
            elementType: 'input',
            inputConfig: {
                type: 'checkbox',
                name: 'L',
            },
            value: '',
            label: 'L',
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
// initial values for useState
const data = {};

function TimeTableForm() {

    //useState variables
    const [timeTableFormState, setTimeTableFormState] = useState(initialTimeTableForm);
    const [dataState, setData] = useState(data);
    const isMounted = useRef(true);

    //validation method
    const checkValidation = (value, rules) => {
        if(!rules) return true;

        let itsOk;
        if (rules.required) {
            itsOk = value.trim() !== '' ? true : false;
        }
    }

    //Variable to fecthing values from DDBB
    const loadDBDataInState = ()=>{
        axios.get('https://haikenda-6a939.firebaseio.com/timetable.json').then(response => {
            if (isMounted.current == true) {
                setData(response.data);
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

    
    /*verify when detect changes on input*/
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
        setTimeTableFormState({ ...timeTableFormState, timeTableForm: newTimeTableForm });

    };

    // Clear form
    const clearFormHandler = (event) => {
        event.preventDefault();
        setTimeTableFormState(initialTimeTableForm);
    }

    /*Creation form
    Iterates inpus values and save into a variable timeTableData. This variable is passed to axios post 
    to store data into DDBB */

    const createTimeTableFormProceed = (event) => {
        event.preventDefault();
        const timeTableData = {};
        for (let timeTableElement in timeTableFormState.timeTableForm) {
            timeTableData[timeTableElement] = timeTableFormState.timeTableForm[timeTableElement].value;
        }
        delete timeTableData.id;
        //saving data
        axios.post('/timetable.json', timeTableData)
            .then(() =>{
                //Clear form
                setTimeTableFormState(initialTimeTableForm);
                //reloading data list
                loadDBDataInState();
            })
            .catch(error => console.log(error));
    };

    /*EraseMethod
    @param idTimetable determine which timeline would be deleted
    */
    const erasehandler=(event,idTimetable)=>{
        console.log(idTimetable);
        event.preventDefault();
        console.log('borrar');
        // execiting delete method
        axios.delete('https://haikenda-6a939.firebaseio.com/timetable/'+idTimetable+'.json').then(
            response =>{
                // reloading new data
              loadDBDataInState();
              if(editionId() === idTimetable)
                setTimeTableFormState(initialTimeTableForm);
            }
        );
    };

    const startEditionHandler =(event, timetableId)=>{
        event.preventDefault();
        axios.get('https://haikenda-6a939.firebaseio.com/timetable/'+timetableId+'.json').then(response => {
            if (isMounted.current == true) {
                console.log(response.data);
                fillFormToEdit(timetableId, response.data);
            }
        })
    }

    const editTimeTableFormProceed = (event, timetableId) => {
        event.preventDefault();
        //coger los datos del form
        const timeTableData = {};
        for (let timeTableElement in timeTableFormState.timeTableForm) {
            timeTableData[timeTableElement] = timeTableFormState.timeTableForm[timeTableElement].value;
        }
        delete timeTableData.id; //we don't want to send the id as a param, it will be only in the URL
        //saving data
        axios.put('/timetable/'+timetableId+'.json', timeTableData)
            .then(() =>{
                //Clear form
                setTimeTableFormState(initialTimeTableForm);
                //reloading data list
                loadDBDataInState();
            })
            .catch(error => console.log(error));
    };

    const fillFormToEdit = (id, data) => {
        const newForm = {...timeTableFormState.timeTableForm};
        newForm.id = {...newForm.id};
        newForm.id.value = id;
        newForm.id.inputConfig = {...newForm.id.inputConfig, hidden: false};
        for (const fieldName in data) {
            let value = data[fieldName]
            newForm[fieldName] = {
                ...newForm[fieldName],
                value,
                isValid: true
            }
        }
        setTimeTableFormState({...timeTableFormState, timeTableForm: newForm});
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
            id:  k,
            datos:dataState[k]
        });


    }

    const editionId = ()=> timeTableFormState.timeTableForm.id.value;

/*Creation form method */ 
const createForm =()=>{
    const formElementsArray = [];
    console.log(timeTableFormState.timeTableForm)
    for (let k in timeTableFormState.timeTableForm) {
        let item = timeTableFormState.timeTableForm[k]
        formElementsArray.push({
            id: k,
            config: item
        });
    }

let form = (
    <form id='form'>
        
        {formElementsArray.map(formElement => ( 
            //Populating input component, create once for each form element
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
        { editionId() //we consider that is and edition when we already have an ID 
            ? <Button btntype="Edit" clicked={(event) => editTimeTableFormProceed(event, editionId())}>Editar horario</Button> 
            : <Button btntype="Create" clicked={createTimeTableFormProceed}>Crear horario</Button>
        }
        <Button btntype="Clear" clicked={clearFormHandler}>Limpiar</Button>
    </form>
    );
    return form;
};
    


/*Creation Table method */
const createTable= ()=>{
    let table = (
        <div>
        {timeTableElementsArray.map(elemento=>(
            // Creation  TimeTable element and populating
            <TimeTableContainer key={elemento.id} title={elemento.datos.title} startTime={elemento.datos.startTime} 
                endTime={elemento.datos.endTime} onClick={
                    (event)=>erasehandler(event,elemento.id)}
                    toupdate={(event)=>startEditionHandler(event,elemento.id)}
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