import React from 'react';
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './top/App';
import Login from "./login/App";
import Register from "./register/App";
import Header from "./custom/nav/Nav";

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from "react-router-dom";
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import reducer from './reducers/reducer';

const route = (
  <Router>
    <Route exact path="/" component={App}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/user/create" component={Register}></Route>
  </Router>
);

ReactDOM.render(route, document.getElementById('root'));

ReactDOM.render(<Header />, document.getElementById('nav_container'));

serviceWorker.unregister();
