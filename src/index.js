import React from 'react';
import ReactDOM from 'react-dom';

// The base CSS must be imported before the other components
import './index.css';

import App from './App';
import {BrowserRouter} from 'react-router-dom';


const app =
<BrowserRouter>
  <App/>
</BrowserRouter>


ReactDOM.render(
  app,
  document.getElementById('root')
);
