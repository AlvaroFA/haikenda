import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import SignUp from './containers/SignUp/SignUp';
import Timetable from './containers/TimeTable/TimeTable';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <p>Pantalla inicial</p>
          <Timetable />
        </Layout>  
      </div>
    );
  }
}

export default App;
