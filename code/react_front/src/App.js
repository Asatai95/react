import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Validation from './Validation';
import Form from './js/Form';
import UserList from './js/UserList';
import {RouteURL, header} from "./js/Config";
// import Router from "./js/Router";
// import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersLength: 0,
      name: "",
      email: "",
      message: "",
      password: "",
      password_check: "",
      name_error: "",
      email_error: "",
      message_error: "",
      password_error: "",
      password_check_error: "",
      // loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var value = event.target.value.trim();
    if (event.target.name === 'name') {
      this.setState({
        name: value,
        name_error: Validation.formValidate(event.target.name, value)
      });
    }
    else if (event.target.name === 'email') {
      this.setState({
        email: value,
        email_error: Validation.formValidate(event.target.name, value)
      });
    }
    else if (event.target.name === 'message') {
      this.setState({
        message: value,
        message_error: Validation.formValidate(event.target.name, value)
      });
    }
    else if (event.target.name === 'password') {
      this.setState({
        password: value,
        password_error: Validation.formValidate(event.target.name, value)
      });
      if (this.state.password_check){
        if (this.state.password_check !== event.target.value) {
          if (Validation.formValidate(event.target.name, value) === "") {
            this.setState({
              password: value,
              password_error: "パスワードは確認用と同じ値を入力してください"
            });
          } else {
            this.setState({
              password_error: ""
            });
          }
        }
      }
    }
    else if (event.target.name === 'password_check') {
      this.setState({
        password_check: value,
        password_check_error: Validation.formValidate(event.target.name, event.target.value)
      });
      if (this.state.password){
        if (event.target.value !== this.state.password) {
          if (Validation.formValidate(event.target.name, value) === "") {
            this.setState({
              password_check: value,
              password_check_error: "パスワードは確認用と同じ値を入力してください"
            });
          }
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, message, password, password_check } = this.state;
    const conf = {
      'username': name,
      'email': email,
      'message': message,
      "password": password,
      "password_check": password_check
    };

    axios.post(RouteURL() + "/test_api/profile/", conf, header)
    .then(response => {
      this.state.users.unshift(response.data);
      this.setState({
        users: this.state.users,
        usersLength: this.state.users.length,
      });
      console(document.getElementById("post-data"))
    })
    .catch((error) => {
      if (error.response !== undefined){
        var label = Object.keys(error.response.data.message)
        var value = error.response.data.message[label]
        if (label.join("") === "username"){
          label = "name"
        }
        label = label + "_error"
        this.setState({
          [label]: value,
        });
      }
    });
  }

  componentDidMount() {
    axios.get(RouteURL() + '/test_api/profile/list/')
    .then(response => {
      this.setState({
        users: response.data.reverse(),
        usersLength: response.data.length,
      });
    })
    .catch((error) => {
      console.error(error)
      window.location.href = RouteURL() + "/error/";
    });
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="notification">
            This is my react-django app.
          </div>
        </div>
        <div className="column is-6">
          <Form
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            password_check={this.state.password_check}
            message={this.state.message}
            name_error={this.state.name_error}
            email_error={this.state.email_error}
            password_error={this.state.password_error}
            password_check_error={this.state.password_check_error}
            message_error={this.state.message_error}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="column is-12" id="user-table">
          <p>There are {this.state.usersLength} users.</p>
          <UserList
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;