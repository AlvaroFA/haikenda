import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignUp from './containers/SignUp/SignUpNew';
import Workshift from './containers/WorkShift/WorkShift';
import  TimeTableform from './containers/TimetableForm/TimetableForm';
import {Route, Switch} from 'react-router-dom';
import TimeTableFullCalendar from './containers/TimeTableFullCalendar/TimeTableFullCalendar';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route  path="/" exact component={TimeTableFullCalendar} />
            <Route  path="/signup" component={SignUp} />
            <Route  path="/timeTableForm" component={TimeTableform} />
            <Route  path="/workshift" component={Workshift} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
