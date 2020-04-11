import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './register.css';
import Form from "./js/Form";
import Check from "./js/Check";
import axios from 'axios';
import Validation from '../Validation';
import {header, RouteURL, ClassContainer} from "../assets/Config";
import Cookies from 'js-cookie';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            password_check: "",
            username_error: "",
            email_error: "",
            password_error: "",
            password_check_error: "",
            detail_error: "",
            flag: false,
            flag_ch: false,
        };
        this.checkButton = this.checkButton.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onBlurFunc = this.onBlurFunc.bind(this)
        this.Loading = this.Loading.bind(this)
        this.backbt = this.backbt.bind(this)
    }

    handleChange(event) {
      var value = event.target.value.trim();
      if (event.target.name === 'name') {
        this.setState({
          username: value,
          username_error: Validation.formValidate(event.target.name, value)
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
          var value = error.response.data.message
          var label = error.response.data.label
          this.setState({
            [label]: value,
          });
      });
    }

    Loading(flag){
      var flag_ch_flag;
      var obj = document.getElementById("loading");
      var sns = document.getElementById("sns");
      obj.classList.add("active");
      var element = document.getElementById('loading');
      element.innerHTML = '<div id="loadicon" class="loader"></div>'
      const item =  () => {
        if (this.state.flag_ch === false){
          flag_ch_flag = true;
          sns.classList.add("fadeout");
        } else {
          flag_ch_flag = false;
          sns.classList.remove("fadeout");
        }
        if (flag === undefined){
          this.setState({
              "flag_ch": flag_ch_flag,
          })
        } else {
          this.setState({
            "flag_ch": flag,
        })
        }
        obj.classList.remove("active");
        const block = document.getElementById("loading");
        const broccoli = block.lastElementChild;
        block.removeChild(broccoli);
      }
      setTimeout(item, 2000);
    }

    checkButton(event) {
        event.preventDefault();
        const conf = {
          'username': this.state.username,
          'email': this.state.email,
          "password": this.state.password,
        };
        axios.post(RouteURL() + "/user/info/session/", conf, header)
        .then((response) => {
          Cookies.set("username", response.data.username);
          Cookies.set("password", response.data.password);
          Cookies.set("email", response.data.email);
        });
        this.Loading()
    }
    componentDidMount(){
      const d = {
        "username": Cookies.get("username"),
        "password": Cookies.get("password"),
        "email": Cookies.get("email"),
      }
      if (Cookies.get("username") !== undefined){
        axios.get(RouteURL() + "/user/info/session/", { params: d }, header)
        .then((response) =>{
          if (response.data.username !== null){
            this.setState({
              "username": response.data.username,
              "password": response.data.password,
              "password_check": response.data.password,
              "email": response.data.email,
            })
          }
        });
        this.Loading(true)
      } else {
        if (this.state.flag_ch === true){
          window.location.href = "/login";
        }
      }
    }

    handleSubmit(event) {
      event.preventDefault();
      const { username, email, password } = this.state;
      const conf = {
        'username': username,
        'email': email,
        "password": password,
      };
      this.Loading(true)
      axios.post(RouteURL() + "/user/create/", conf, header)
      .then(response => {
        window.location.href = "/login";
      })
      .catch((error) => {
        if (error.response !== undefined){
          if (error.response.data.detail !== undefined){
            this.setState({
              "detail_error": error.response.data.detail,
            });
          } else {
            var label = Object.keys(error.response.data.message)
            for (var i = 0 ; i < label.length; i++){
              var value = error.response.data.message[label[i]]
              var error_label = label[i] + "_error"
              this.setState({
                [error_label]: value,
              });
            }
          }
        }
      });
    }

    backbt(){
      Cookies.remove("username")
      Cookies.remove("password")
      Cookies.remove("email")
      window.location.href = "/login";
    }

    render(){

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

        ClassContainer()

        return(
            <div className="main-content-type">
                <div className="d-flex justify-content-center h-100">
                    <div className="card register">
                        <div className="card-header">
                            <h3>Sign Up</h3>
                            <div id="sns" className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            {this.state.flag_ch === false && (
                                <Form
                                    username={this.state.username}
                                    email={this.state.email}
                                    password={this.state.password}
                                    password_check={this.state.password_check}
                                    username_error={this.state.username_error}
                                    email_error={this.state.email_error}
                                    password_error={this.state.password_error}
                                    password_check_error={this.state.password_check_error}
                                    detail_error={this.state.detail_error}
                                    handleChange={this.handleChange}
                                    onBlurFunc={this.onBlurFunc}
                                    checkButton={this.checkButton}
                                    backbt={this.backbt}
                                    flag={flag_label}
                                />
                            )}
                            {this.state.flag_ch === true && (
                                <Check
                                    username={this.state.username}
                                    email={this.state.email}
                                    password={this.state.password}
                                    checkButton={this.checkButton}
                                    handleSubmit={this.handleSubmit}
                                    checkALL={this.checkALL}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;