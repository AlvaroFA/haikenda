import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import './SignUp.css';
import Input from '../../components/UI/Input/Input';
import  Border from '../../components/hoc/Border';
import axios from '../../axios.app';
class SignUp extends Component {
    state={
        workerForm:{
            name:{
                elementType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Nombre del trabajador'
                },
                value:'',
                validation:{
                    required: true           
                },
                isValid: false
            },
            surname:{
                elementType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Apellidos del trabajador'
                },
                value:'',
                validation:{
                    required: true
                    
                },
                isValid: false

            },
            email:{
                elementType: 'input',
                inputConfig: {
                    type: 'email',
                    placeholder: 'Correo del trabajador'
                },
                value:'',
                validation:{
                    required: true,
                    checkEmail:true
                },
                isValid: false
            },
            job:{
                elementType: 'input',
                inputConfig: {
                    type: 'text',
                    placeholder: 'Puesto del trabajador'
                },
                value:'',
                validation:{
                    required: true
                },
                isValid: false
            },
        },
        signUpCorrect: false
    }

    /*checks if all validation are correct returning true if correct or
    otherwise false if something its wrong*/ 
    checkValidation= (value , rules) =>{
        let itsOk;

        if(rules.required){
            itsOk = value.trim() !== ''? true: false;
        }

        if(rules.checkEmail){
            itsOk = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)? true: false;
        }
        return itsOk;
    }

    // submit form method
    signUpProceed = ()=>{
        event.preventDefault();
        this.setState({signUpCorrect: true});
        const formWorkerData = {};
        for( let formWorkElement in this.state.workerForm){
                formWorkerData[ formWorkElement] = this.state.workerForm[formWorkElement].value;
        }
        const signUp ={
        worker : formWorkerData
        }
        axios.post('/workers.json', signUp).then(response => console.log(response))
        .catch(error=> console.log(error));
};

    signUpCancelled = ()=>{
        this.setState({signUpCorrect: false});
        console.log('Cancelando el alta');
    };

    clearForm = () =>{
        document.getElementById("form").reset();
    }


    inputChangeHandler =(evt , inputId) =>{
        // cloning the data 
        const updatedWorkerForm ={
            ...this.state.workerForm
        };
        //accessing to elements
        const updatedElement = {...updatedWorkerForm[inputId]};
        updatedElement.value = event.target.value;
        //checking validations
        updatedElement.valid= this.checkValidation(updatedElement.value, updatedElement.validation);
        console.log(updatedElement);
        // settings new values
        updatedWorkerForm[inputId] = updatedElement;
        //overwritting the state
        this.setState({workerForm: updatedWorkerForm});
    }
    render(){
        const formElementsArray =[];
        for( let k in this.state.workerForm){
            formElementsArray.push({
                id: k,
                config: this.state.workerForm[k]
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
            <Button btntype="Save" clicked={this.signUpProceed}>Alta de usuario</Button>
            <Button btnType="Cancel" clicked={this.signUpCancelled}>Cancelar Alta</Button>
            <Button btnType="Clear" clicked={this.clearForm}>Limpiar</Button>
            </form>
          );
        return(
            <Border>
            <div>
            <h4>Alta de usuario</h4>
            {form}
            </div>  
            </Border>                      
        )
    }
}

export default SignUp;