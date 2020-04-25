import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './reset.css';
import Form from "./js/Form";
import axios from 'axios';
import Validation from '../Validation';
import { header, RouteURL, ClassContainer, Loading } from "../assets/Config";

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          email_error: "",
          detail_error: "",
          is_flag: false,
          flag: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onBackbt = this.onBackbt.bind(this);
        this.onBlurFunc = this.onBlurFunc.bind(this);
        this.model = React.createRef()
    }

    componentDidMount(){
        var main_bc = document.getElementById("wrapper");
        main_bc.classList.remove("login");
        main_bc.classList.add("reset");
    }

    handleChange(event) {
      var value = event.target.value.trim();
      if (event.target.name === 'email') {
        if (this.state.email !== value && this.state.detail_error !== "") {
            this.setState({
                detail_error: ""
            })
        }
        this.setState({
          email: value,
          email_error: Validation.formValidate(event.target.name, value)
        });
      }
    }

    onBackbt(event){
        event.preventDefault();
        Loading("reset_bt");
    }

    onBlurFunc(event){
        console.log(event)
        const value = event.target.value;
        console.log(value)
        var regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        if (regexp.test(value) === false){
            this.setState({
                email_error: "正しい形式でメールアドレスを入力してください"
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email } = this.state;
        var flag = false;
        var regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        if (regexp.test(email) === true && email !== ""){
            flag = true;
        }

        if (flag === true){
            const conf = {
                'email': email,
            };
            console.log(conf)
            console.log(header)
            axios.post(RouteURL() + "/user/password/reset/", conf, header)
            .then(response => {
                console.log(response)
                Loading("reset");
            })
            .catch((error) => {
                if (error.response !== undefined){
                    console.log("error.response.data")
                    console.log(error.response.data)
                    var value = error.response.data.detail
                    console.log(value)
                    this.setState({
                        "detail_error": value,
                    });
                }
            });
        } else {
            this.setState({
                email_error: "正しい形式でメールアドレスを入力してください"
            })
        }
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
                    <div className="card login_content">
                        <div className="card-header">
                            <h3>Reset Password</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form
                                email={this.state.email}
                                email_error={this.state.email_error}
                                detail_error={this.state.detail_error}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                onBackbt={this.onBackbt}
                                onBlurFunc={this.onBlurFunc}
                                flag={flag_label}
                            />
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account?<a href="/user/create/">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PasswordReset;