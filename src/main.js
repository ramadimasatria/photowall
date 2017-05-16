/* global document */

import React from 'react';
import ReactDOM from 'react-dom';

// App
import App from './containers/App';
import Photowall from './containers/Photowall';

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the app
ReactDOM.render((
  <App>
    <Photowall />
  </App>
), document.getElementById(DOM_APP_EL_ID));
