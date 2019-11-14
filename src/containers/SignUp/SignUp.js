import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from '../SignUp/SignUp.css';
import Input from '../../components/UI/Input/Input';
import  Border from '../../components/hoc/Border';
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
          let form =(
            <form>
            <Input inputtype="input" type="text" name="name" placeholder="Nombre del trabajador"></Input>
            <Input inputtype="input" type="text" name="surName" placeholder="Apellidos  del trabajador"> </Input>
            <Input inputtype="input"type="text" name="job" placeholder="Puesto del trabajador"> ></Input>
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