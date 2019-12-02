import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp/SignUpNew';
import Workshift from './containers/WorkShift/WorkShift';
import  TimeTableform from './containers/TimetableForm/TimetableForm';
import {Route, Switch} from 'react-router-dom';
import TimeTableFullCalendar from './containers/TimeTableFullCalendar/TimeTableFullCalendar';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfig from './components/firebase/config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.auth().languageCode = 'es';

class App extends Component {

  state = {
    user: firebaseApp.auth().currentUser,
    sessionInfoRetrieved:false
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      //TODO: recuperar los datos de la BD, para completar el nombre y si es admin o no
      this.setState({
        user,
        sessionInfoRetrieved: true
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  signout(){
    console.log("SIGN OUT");
    firebaseApp.auth().signOut();
  }

  render() {

    if(!this.state.sessionInfoRetrieved){
      return <div> LOADING... </div>
    }

    if(!this.state.user) {
      return <SignIn firebase={firebaseApp}/>
    }

    //TODO: MIRAR LO DE LOS PRIVATE ROUTES
    return (
      <div>
        <Layout signout={() => this.signout()}>
          <Switch>
            <Route  path= "/" exact component={TimeTableFullCalendar} />
            <Route exact path="/signin" component={SignIn} />
            <Route  path= "/signup" component={SignUp} />
            <Route  path= "/timeTableForm" component={TimeTableform} />
            <Route  path= "/workshift" component={Workshift} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
