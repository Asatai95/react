import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './auth.css';
import {ClassContainer} from "../assets/Config";
import {facebookReqToken} from "./js/Facebook";

class AuthLogin extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        ClassContainer()
    }

    handleClick(event){
        event.preventDefault();
        console.log(event.target.className)
        if (event.target.className.indexOf("facebook") > 0) {
            facebookReqToken("gettoken");
        }
    }

    render(){

        return(
            <div className="d-flex justify-content-end social_icon">
                <span className="facebook" onClick={this.handleClick}><i className="fab fa-facebook-square"></i></span>
                <span className="google" onClick={this.handleClick}><i className="fab fa-google-plus-square"></i></span>
                <span className="twitter" onClick={this.handleClick}><i className="fab fa-twitter-square"></i></span>
            </div>
        );
    }
}
export default AuthLogin;