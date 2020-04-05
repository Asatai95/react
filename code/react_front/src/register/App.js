import React, { Component } from 'react';
import './register.css';
import Form from "./js/Form";
import axios from 'axios';
import Validation from '../Validation';
import {header, RouteURL, ClassContainer} from "../assets/Config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          email_error: "",
          password_error: "",
          flag: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
      var value = event.target.value.trim();
      if (event.target.name === 'email') {
        this.setState({
          email: value,
          email_error: Validation.formValidate(event.target.name, value)
        });
      }
      else if (event.target.name === 'password') {
        this.setState({
          password: value,
        });
      }
    }

    handleSubmit(event) {
      event.preventDefault();

      const { email, password } = this.state;
      const conf = {
        'email': email,
        "password": password,
      };

      axios.post(RouteURL() + "/login/api/", conf, header)
      .then(response => {
        this.state.users.unshift(response.data);
        this.setState({
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
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                email={this.state.email}
                                password={this.state.password}
                                email_error={this.state.email_error}
                                password_error={this.state.password_error}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                onBlurFunc={this.onBlurFunc}
                                flag={flag_label}
                            />
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/#">Sign Up</a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <a href="/#">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;