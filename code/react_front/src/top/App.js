import React, { Component } from 'react';
import './top.css';
import axios from 'axios';
import Validation from '../Validation';
import Form from './js/Form';
import UserList from './js/UserList';
import Search from './js/SearchForm';
import {header, RouteURL} from "../assets/Config";
import Cookies from 'js-cookie';
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
      respose_item_date : "",
      flag: false,
      // loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlurFunc = this.onBlurFunc.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
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

  handleDateChange(label, event){
    const getStringFromDate = (date) => {
      var year_str = date.getFullYear();
      var month_str = 1 + date.getMonth();
      var day_str = date.getDate();
      var format_str = 'YYYY-MM-DD';
      format_str = format_str.replace(/YYYY/g, year_str);
      format_str = format_str.replace(/MM/g, month_str);
      format_str = format_str.replace(/DD/g, day_str);
      return format_str;
    };
    var item;
    if (event !== null){
      item = getStringFromDate(event)
    } else {
      item = getStringFromDate(new Date())
    }
    var search_username = document.getElementsByClassName("searchusername")[0].value

    var search_value;
    if (label === "end") {
      search_value = document.getElementsByClassName("example-custom-input")[0].textContent
    } else {
      search_value = document.getElementsByClassName("example-custom-input")[1].textContent
    }

    const conf = {
      params: {
        "label": label,
        "search": item,
        "search_other": search_value,
        "search_other_value": search_username
      }
    }
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
    var token = Cookies.get('myapp');
    // header["Content-Type"] = "application/json"
    header["Authorization"] = "JWT["+token+"]"
    axios.get(RouteURL() + '/test_api/profile/list/', header)
    .then(response => {
      console.log("response")
      console.log(response)
      this.setState({
        users: response.data.reverse(),
        usersLength: response.data.length,
        respose_item_date: response.data.reverse(),
      });
    })
    .catch((error) => {
      console.log(error.response)
      console.error(error)
    });
  }

  searchItem(event){
    var value = event.target.value.trim();
    var label = event.target.name;
    var search_value_1 = document.getElementsByClassName("example-custom-input")[0].textContent
    var search_value_2 = document.getElementsByClassName("example-custom-input")[1].textContent

    const conf = {
      params: {
        "label": label,
        "search": value,
        "search_other": search_value_1,
        "search_other_value": search_value_2
      }
    }
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
            { this.state.usersLength !== 0 && (
              <Search
                searchItem={this.searchItem}
                respose_item_date={this.state.respose_item_date}
                handleDateChange={this.handleDateChange}
              />
            )}
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