import React from 'react';
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './top/App';
import Login from "./register/App"

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from "react-router-dom";
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './reducers/reducer';

const route = (
  <Router>
    <Route exact path="/" component={App}></Route>
    <Route path="/login" component={Login}></Route>
  </Router>
);

ReactDOM.render(route, document.getElementById('root'));

serviceWorker.unregister();
