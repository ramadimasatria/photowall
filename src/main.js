/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import Photowall from './containers/Photowall';

import './css/base.css';

const DOM_APP_EL_ID = 'app';

// Render the app
ReactDOM.render((
  <App>
    <Photowall />
  </App>
), document.getElementById(DOM_APP_EL_ID));
