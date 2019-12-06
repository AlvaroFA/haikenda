import firebaseApp, {userRegisterApp} from '../components/firebase/Firebase';



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
            } else  {
                //TODO: este fix es porque no se puede obtener un usuario que ya existiese en el realm
                //Entonces, no puedo saber cual es su id para crearlo en la DB
                //Posibles soluciones:
                // - backend en node y utilizar firebase-admin
                // - utilizar el email como clave del usuario, pero la BD realtime no permite esto, porque tiene caracteres
                // especiales (como el punto). Habría que cambiar a firestorage, que sí lo permite (sencillo cambio en los providers para que consuman de ahí y no de database())
                alert('Este usuario ya existía en la aplicación. Su registro solo so puede realizar manualmente. Contacte con su administrador.');
                return;
            }
            throw {code, message: userMessage};
        });
}

export function sendPasswordResetEmail(email) {
    return firebaseApp.auth().sendPasswordResetEmail(email)
        .then(()=> alert("Enviado email de recuperación de contraseña a "+email))
        .catch((err) => alert("Error email de recuperación de contraseña a "+email+". "+err));
}

export function currentUser(){
    return firebaseApp.auth().currentUser;
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

