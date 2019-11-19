import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios.app';
import Border from '../../components/hoc/Border';


class TimeTableForm extends Component {
    state = {
        timeTableForm: {
            title: {
                elementType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Nombre del horario'
                },
                value: '',
                validation: {
                    required: true,
                },
                isValid: false
            },
            startTime:{
                elementType:'date',
                inputConfig:{
                    type: 'date',
                    placeholder: 'dd/mm/YYYY'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false
            },
            endTime: {
                elementType:'date',
                inputConfig:{
                    type: 'date',
                    placeholder: 'dd/mm/YYYY'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false
            },
            type: {

            },
        creationCheck: false
        }

    }

    createTimetableHandler=()=>{
        event.preventDefault;
        this.setState({creationCheck:true});
        const timetableData = {};
        for( let timeTableElement in this.state.timeTableForm){
            timetableData[ timetableData]= this.state.timeTableForm[timeTableElement].value;
        }
        const TimeTable={
            timetable: timetableData
        }
        axios.post('/timeTable.json')
        .then(response => console.log(response))
        .catch(error => console.log(error));
    };


    render() {
        const formElementsArray=[];
        for( let k in this.state.timeTableForm){
            formElementsArray.push({
                id: k,
                config: this.state.timeTableForm[k]
            });
        }
        let form =(
            <form onSubmit={this.signUpProceed} id='form'>
            {formElementsArray.map(formElement => (
                
                <Input 
                key={formElement.id} 
                elementType={formElement.config.elementType}
                inputConfig={formElement.config.inputConfig}
                value={formElement.config.value}
                incorrectValues={!formElement.config.isValid}
                changed={(evt)=>this.inputChangeHandler(evt,formElement.id)}               
                />
            ))}
            <Button btntype="Save" clicked={this.createTimetableHandler}>Crear horario</Button>
            <Button btnType="Cancel" clicked={this.signUpCancelled}>Cancelar</Button>
            <Button btnType="Clear" clicked={this.clearForm}>Limpiar</Button>
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
}           
export default TimeTableForm;