import React from 'react';
import 'bulma/css/bulma.min.css';
import ReactDOM from 'react-dom';
import './assets/index.css';
import "./assets/css/material-dashboard.css";
import App from './top/App';
import Login from "./login/App";
import Register from "./register/App";
import Header from "./custom/nav/Nav";
import Dashtab from "./sidebar/panel/Dashbord";
import Edit from "./edit/App";
import PasswordReset from "./reset/App";
import PasswordResetForm from "./reset/ResetForm";

import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const route = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}></Route>
      {/* <Route exact path="/dashbord" component={Dashbord}></Route> */}
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/logout" component={Login}></Route>
      <Route exact path="/edit" component={Edit}></Route>
      <Route exact path="/user/create" component={Register}></Route>
      <Route exact path="/user/password/reset" component={PasswordReset}></Route>
      <Route exact path="/reset_password/:uid64/:token" component={PasswordResetForm}></Route>
      <Route exact path="/login/user/:auth" component={Login}></Route>
      <Route exact path="/users/auth/facebook/:code" component={Login}></Route>
    </Switch>
  </Router>
);

ReactDOM.render(route, document.getElementById('root'));

ReactDOM.render(<Header />, document.getElementById('nav_container'));

ReactDOM.render(<Dashtab />, document.getElementById('sidebar'));

serviceWorker.unregister();
