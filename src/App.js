import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignUp from './containers/SignUp/SignUp';
import TimeTableFullCalendar from './containers/TimeTableFullCalendar/TimeTableFullCalendar'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <TimeTableFullCalendar/> 
        </Layout>
       
      </div>
    );
  }
}

export default App;
