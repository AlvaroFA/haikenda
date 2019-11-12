import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from '../SignUp/SignUp.css';
import Input from '../../components/UI/Input/input';

class SignUp extends Component {
    state={
        name:'',
        surname:'',
        job: '',
        signUpCorrect: false
    }

    signUpProceed = ()=>{
        
        this.setState({signUpCorrect: true});
        console.log('realizando el alta ');
};

    signUpCancelled = ()=>{
        this.setState({signUpCorrect: false});
        console.log('Cancelando el alta');
    };

    clearForm = () =>{
        console.log('borrando el formulario');
    }
    render(){

        return(
           /* <div>
                <h4>Alta de usuario</h4>
                <form>
                    <Input props={type="text" ,name="name" ,placeholder="Nombre del trabajador"}>Nombre</Input>
                    <Input props={ type="text" ,name="surName" ,placeholder="Apellidos  del trabajador"}> Apellidos </Input>
                    <Input type="text" name="job" placeholder="Puesto del trabajador"> Puesto</Input>
                    <Button btnType="Save" clicked={this.signUpProceed}>Alta de usuario</Button>
                    <Button btnType="Cancel" clicked={this.signUpCancelled}>Cancelar Alta</Button>
                    <Button btnType="Clear" clicked={this.clearForm}>Limpiar</Button>
                </form>
            
            </div>
                
*/ 
<div></div>
        );
             
         
    }
}

export default SignUp;