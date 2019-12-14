import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp/SignUp';
import Workshift from './containers/WorkShift/WorkShift';
import TimeTableform from './containers/TimetableForm/TimetableForm';
import { Route, Switch } from 'react-router-dom';
import TimeTableFullCalendar from './containers/TimeTableFullCalendar/TimeTableFullCalendar';
import { fetchOneWorker } from './providers/WorkersProvider'
import './App.css'
import firebaseApp from './components/firebase/Firebase';

import firebase from 'firebase/app';

class App extends Component {

  state = {
    user: undefined,
    sessionInfoRetrieved: false
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user);
    });
  }

  setUser(user) {
    if (user && !user.isAnonymous) {
      fetchOneWorker(user.uid)
        .then((worker) => {
          this.setState({
            user: {
              ...worker,
              uid: user.uid,
              realmEmail: user.email,
              isAnonymous: user.isAnonymous
            },
            sessionInfoRetrieved: true
          });
        }).catch((error) => {
          if (error.code === "PERMISSION_DENIED") {
            this.setState({
              user: {
                uid: user.uid,
                realmEmail: user.email,
                isAnonymous: user.isAnonymous
              },
              sessionInfoRetrieved: true
            });
          } else {
            console.error(error);
          }
        });
    } else {
      this.setState({ sessionInfoRetrieved: true });
    }
  }

  isUserLogged() {
    if (!this.state.sessionInfoRetrieved) return false;
    if (!this.state.user) return false;
    if (this.state.user.isAnonymous) return false;
    return true;
  }

  isCompletelyRegistered() {
    return this.state.user && this.state.user.email;
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {

    if (!this.state.sessionInfoRetrieved) {
      return <div className="Backdrop"> </div>
    }

    if (!this.isUserLogged()) {
      return (<Layout>
        <SignIn />
      </Layout>);
    }

    if (!this.isCompletelyRegistered()) {
      return (<Layout
        isLoggedIn={this.isUserLogged()}
        user={this.state.user}>
        <div className='noAuth'>
          <p className='msg'>Cuenta no registrada<br /> Contacte con su administrador</p>
        </div>
      </Layout>);
    }

    return (
      <Layout
        isLoggedIn={this.isUserLogged()}
        isAdmin={this.state.user && this.state.user.admin}
        user={this.state.user}>
        <Switch>
          <Route path="/" exact component={TimeTableFullCalendar} />
          <Route exact path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/timeTableForm" component={TimeTableform} />
          <Route path="/workshift" component={Workshift} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
