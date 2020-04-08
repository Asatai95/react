import React, { Component } from 'react';
import './register.css';
import Form from "./js/Form";
import Check from "./js/Check";
import axios from 'axios';
import Validation from '../Validation';
import {header, RouteURL, ClassContainer} from "../assets/Config";

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
    }

    handleChange(event) {
        var value = event.target.value.trim();
        console.log("event.target")
        console.log(event.target)
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

          console.log(Validation.formValidate(event.target.name, value))
          console.log(value)
          if (this.state.password_check){
            if (this.state.password_check !== event.target.value) {
              if (Validation.formValidate(event.target.name, value) === "") {
                console.log("cevent.target.name,")
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
            console.log(error.response.data)
            var value = error.response.data.message
            var label = error.response.data.label
            this.setState({
              [label]: value,
            });
        });
      }

      checkButton(event) {
          event.preventDefault();
          this.setState({
              "flag_ch": true,
          })
      }

      handleSubmit(event) {
        event.preventDefault();

        const { name, email, password } = this.state;
        const conf = {
          'username': name,
          'email': email,
          "password": password,
        };

        axios.post(RouteURL() + "/user/create/", conf, header)
        .then(response => {
          this.state.users.unshift(response.data);
          this.setState({
            users: this.state.users,
            usersLength: this.state.users.length,
            name: "",
            email: "",
            password: "",
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
                            <div className="d-flex justify-content-end social_icon">
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
                                    username_error={this.state.username_error}
                                    email_error={this.state.email_error}
                                    password_error={this.state.password_error}
                                    password_check_error={this.state.password_check_error}
                                    detail_error={this.state.detail_error}
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    onBlurFunc={this.onBlurFunc}
                                    checkButton={this.checkButton}
                                    flag={flag_label}
                                />
                            )}
                            {this.state.flag_ch === true && (
                                <Check
                                    username={this.state.username}
                                    email={this.state.email}
                                    password={this.state.password}
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