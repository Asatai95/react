import React from 'react';
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom';
import './assets/index.css';
import "./assets/css/material-dashboard.css";
import App from './top/App';
import Login from "./login/App";
import Register from "./register/App";
import Header from "./custom/nav/Nav";
// import Dashbord from "./dashbord/App";
import Sidebar from "./sidebar/App";
import Edit from "./edit/App";

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from "react-router-dom";

const route = (
  <Router>
    <Route exact path="/" component={App}></Route>
    {/* <Route exact path="/dashbord" component={Dashbord}></Route> */}
    <Route exact path="/login" component={Login}></Route>
    <Route exact path="/logout" component={Login}></Route>
    <Route exact path="/edit" component={Edit}></Route>
    <Route exact path="/user/create" component={Register}></Route>
    <Route exact path="/login/user/:auth" component={Login}></Route>
  </Router>
);

ReactDOM.render(route, document.getElementById('root'));

ReactDOM.render(<Header />, document.getElementById('nav_container'));

ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));

serviceWorker.unregister();
