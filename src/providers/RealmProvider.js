import {userRegisterApp} from '../components/firebase/Firebase';



export function registerUserAccount(email, password) {
    return userRegisterApp.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential && userCredential.user;
        })
        .catch(({code,message})=>{
            let userMessage = generateUserErrorMessage(code);
            if(code !== 'auth/email-already-in-use'){
                console.warn('Petición de creación de usuario en firebase falló de forma inesperada. '
                + 'Puede ser un bug o un problema de configuración. \n ' 
                + `Code: ${code}\n`
                + `Message: ${message}\n`
                + `Mensaje mostrado al usuario:${userMessage}`);
            }
            throw {code, message: userMessage};
        });
}

function generateUserErrorMessage(firebaseCode) {
    switch (firebaseCode) {
        case 'auth/email-already-in-use':
            return "El email ya está siendo utilizado"
        case 'auth/invalid-email':
            return 'El email no existe'
        case 'auth/weak-password': 
            return 'La contraseña es demasiado sencilla'
        default:
            return `Error interno inesperado. Contacte con el administrador (code:${firebaseCode})`
    }
}

