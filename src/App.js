import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp/SignUp';
import Workshift from './containers/WorkShift/WorkShift';
import TimeTableform from './containers/TimetableForm/TimetableForm';
import {Route, Switch} from 'react-router-dom';
import TimeTableFullCalendar from './containers/TimeTableFullCalendar/TimeTableFullCalendar';
import {fetchOneWorker} from './providers/WorkersProvider'

import firebaseApp from './components/firebase/Firebase'; 

import firebase from 'firebase/app';

class App extends Component {

  state = {
    user: undefined,
    sessionInfoRetrieved:false
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user);
    });
  }

  setUser(user){
    if( user && !user.isAnonymous) {
      fetchOneWorker(user.uid)
        .then((worker)=>{
            this.setState({
              user: {
                ...worker,
                uid: user.uid,
                isAnonymous: user.isAnonymous
              },
              sessionInfoRetrieved: true
            });
        });
    } else {
      this.setState({sessionInfoRetrieved: true});
    }
  }

  isUserLogged(){
    if(!this.state.sessionInfoRetrieved) return false;
    if(!this.state.user) return false;
    if(this.state.user.isAnonymous) return false;
    return true; 
  }

  isCompletelyRegistered(){
    return this.state.user && this.state.user.email;
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {

    if(!this.state.sessionInfoRetrieved){
      return <div> LOADING... </div>
    }

    if(!this.isUserLogged()) {
      return (<Layout>
        <SignIn />
      </Layout>);
    } 
    
    if(!this.isCompletelyRegistered()) {
      return (<Layout>
        <div>Cuenta no registrada</div>
      </Layout>); 
    } 

    return (
      <div>
        <Layout 
            isLoggedIn={this.isUserLogged()}
            isAdmin={this.state.user && this.state.user.admin} 
            user={this.state.user}>
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
