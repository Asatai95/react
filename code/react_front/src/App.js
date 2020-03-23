import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Validation from './Validation';
import Form from './js/Form';
import UserList from './js/UserList';
import Search from './js/SearchForm';
import {RouteURL, header, userList} from "./js/Config";
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
      flag: false,
      // loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlurFunc = this.onBlurFunc.bind(this);
    this.searchItem = this.searchItem.bind(this);
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

  onBlurFunc(event){
    var value = event.target.value.trim();

    var conf = {
      "label": "check",
      [event.target.name]: value
    }
    axios.post(RouteURL() + "/test_api/profile/", conf, header)
    .catch((error) => {
      var label = "name_error"
      var value = error.response.data.message
      this.setState({
        [label]: value,
      });
    });
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
        name: "",
        email: "",
        message: "",
        password: "",
        password_check: "",
      });
    })
    .catch((error) => {
      if (error.response !== undefined){
        var label = Object.keys(error.response.data.message)
        for (var i = 0 ; i < label.length; i++){
          var value = error.response.data.message[label[i]]
          if (label[i] === "username"){
            label[i] = "name"
          }
          var error_label = label[i] + "_error"
          this.setState({
            [error_label]: value,
          });
        }
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
      userList(response);
    })
    .catch((error) => {
      console.error(error)
      // window.location.href = RouteURL() + "/error/";
    });
  }

  searchItem(event){
    var value = event.target.value.trim();
    var label = event.target.name;
    if (label === "start_date" || label === "end_date") {
      label = "date_joined"
    }
    const conf = {
      params: {
        [label]: label,
        "search": value
      }
    }
    console.log("conf")
    console.log(conf)
    axios.get(RouteURL() + '/test_api/profile/list/search/', conf)
    .then(response => {
      this.setState({
        users: response.data.reverse(),
        usersLength: response.data.length,
      });
    })
    .catch((error) => {
      console.error(error)
      // window.location.href = RouteURL() + "/error/";
    });

  }

  render() {
    var flag_label = true
    var label = Object.keys(this.state)
    for (var i = 0; i < label.length; i++){
      if (label[i].indexOf("_error") > -1 && this.state[label[i]] !== ""){
        flag_label = "disable";
      }
    }
    if (flag_label === true){
      flag_label = "";
    }
    console.log(this.state.usersLength)
    return (
      <div className="columns is-multiline">
        <div className="column is-6">
          <div className="notification">
            <p>今日のTODOリスト</p>
          </div>
          <div className="noteIMG">
            <ul>
              <li>・今日のタスク管理</li>
              <li>・1日のやることを簡単に管理</li>
            </ul>
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
            onBlurFunc={this.onBlurFunc}
            flag={flag_label}
          />
        </div>
        <div className="column is-12" id="user-table">
          <div className="listNAME">
            <p>There are {this.state.usersLength} users.</p>
            <Search
              searchItem={this.searchItem}
            />
          </div>
          {this.state.usersLength !== 0 && (
            <UserList
              users={this.state.users}
            />
          )}
          {this.state.usersLength === 0 && (
            <div className="Notable">
              <p>検索結果なし</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;