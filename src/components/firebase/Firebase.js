import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from "./config"

const firebaseApp = firebase.initializeApp(config);
firebaseApp.auth().languageCode = "es";

export const userRegisterApp = firebase.initializeApp(config, "UserRegister");
userRegisterApp.auth().languageCode = "es";

export const database = firebaseApp.database();
export const auth = firebaseApp.auth();
export default firebaseApp;