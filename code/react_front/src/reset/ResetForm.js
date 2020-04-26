import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './reset.css';
import Form from "./js/PasswordForm";
import axios from 'axios';
import Validation from '../Validation';
import { header, RouteURL, ClassContainer, Loading } from "../assets/Config";

class PasswordResetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          password: "",
          password_check: "",
          password_error: "",
          password_check_error: "",
          detail_error: "",
          is_flag: false,
          flag: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onBackbt = this.onBackbt.bind(this);
        this.onBlurFunc = this.onBlurFunc.bind(this);
        this.passChangebt = this.passChangebt.bind(this);
        this.model = React.createRef()
    }

    componentDidMount(){
        var main_bc = document.getElementById("wrapper");
        main_bc.classList.remove("login");
        main_bc.classList.add("reset");
        const url = window.location.pathname.split("/");
        console.log(url)
        const conf = {
            "token": url[3]
        }
        console.log(header)
        axios.post(RouteURL() + "/reset_password/token/", conf, header)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error.response)
        })
    }

    handleChange(event) {
      var value = event.target.value.trim();
      var label = event.target.name + "_error"
      this.setState({
        [event.target.name]: value,
        [label]: Validation.formValidate(event.target.name, value)
      });
      if (this.state.detail_error === "確認用と同一の値を入力してください"){
          if(this.state.password === this.state.password_check) {
              this.setState({
                  detail_error : ""
              })
          }
      }
    }

    onBackbt(event){
        event.preventDefault();
        Loading("reset_bt");
    }

    onBlurFunc(event){
        const value = event.target.value;
        var regexp = new RegExp(/[a-zA-Z0-9!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
        var reg_signal = new RegExp(/[!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
        var reg_large = new RegExp(/[A-Z]/g);
        console.log(regexp.test(value))
        if (value === "" && event.target.name === "password_check"){
            this.setState({
                password_check_error: ""
            })
        }
        if (value !== "" && event.target.name === "password_check"){
            if (regexp.test(value) === false){
                this.setState({
                    detail_error: "正しい形式でパスワードを入力してください"
                })
            } else {this.setState({detail_error: ""})}
            if (reg_signal.test(value) === false || reg_large.test(value) === false) {
                if (this.state.detail_error === ""){
                    this.setState({
                        detail_error: "１文字以上記号と全角英字を入力してください"
                    })
                }
            } else {this.setState({detail_error: ""})}
            if (event.target.name === "password_check" && this.state.password_check !== ""){
                if (this.state.detail_error === ""){
                    if (value !== this.state.password_check){
                        this.setState({
                            detail_error: "確認用と同一の値を入力してください"
                        })
                    }
                }
            }
        }
    }

    passChangebt(event){
        event.preventDefault();
        const elm = event.target.classList;
        const element = document.getElementById(elm[1]);
        console.log(element.type)
        if (element.type === "password"){
            element.type = "text"
        } else {
            element.type = "password"
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { password, password_check } = this.state;
        var flag = true;
        var regexp = new RegExp(/[a-zA-Z0-9!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
        var reg_signal = new RegExp(/[!"#$%&'()*+\-.,:;<=>?@[\\\]^_`{|}~]/g);
        var reg_large = new RegExp(/[A-Z]/g);
        if (regexp.test(password) === false){
            this.setState({
                detail_error: "正しい形式でパスワードを入力してください"
            })
            flag = false;
        } else {this.setState({detail_error : ""})}
        if (reg_signal.test(password) === false || reg_large.test(password) === false ) {
            if (this.state.detail_error === ""){
                this.setState({
                    detail_error: "１文字以上記号と全角英字を入力してください"
                })
                flag = false;
            }
        } else {this.setState({detail_error : ""})}
        if (password !== password_check && this.state.detail_error === "") {
            this.setState({
                detail_error: "確認用と同一の値を入力してください"
            })
        }

        if (flag === true){
            const conf = {
                'password': password,
            };
            const url = window.location.pathname;
            console.log(url)
            console.log(conf)
            console.log(header)
            // axios.post(RouteURL() + "/user/password/reset/", conf, header)
            // .then(response => {
            //     console.log(response)
            //     Loading("reset");
            // })
            // .catch((error) => {
            //     if (error.response !== undefined){
            //         console.log("error.response.data")
            //         console.log(error.response.data)
            //         var value = error.response.data.detail
            //         console.log(value)
            //         this.setState({
            //             "detail_error": value,
            //         });
            //     }
            // });
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
            <div className="main-content-type reset_password_form">
                <div className="d-flex justify-content-center h-100">
                    <div className="card login_content">
                        <div className="card-header">
                            <h3>Reset Password</h3>
                        </div>
                        <div className="card-body">
                            <Form
                                password={this.state.password}
                                password_check={this.state.password_check}
                                password_error={this.state.password_error}
                                password_check_error={this.state.password_check_error}
                                detail_error={this.state.detail_error}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                                onBackbt={this.onBackbt}
                                onBlurFunc={this.onBlurFunc}
                                passChangebt={this.passChangebt}
                                flag={flag_label}
                            />
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Change your password. From MyApp.JP
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PasswordResetForm;