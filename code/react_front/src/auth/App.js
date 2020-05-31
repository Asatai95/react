import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './auth.css';
import {ClassContainer} from "../assets/Config";
import facebookReqToken from "./js/Facebook";
import { RouteURL } from "../assets/Config";
import axios from "axios";
// import DjangoCSRFToken from 'django-react-csrftoken'

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
        if (event.target.className.indexOf("facebook") > 0) {
            // facebookReqToken("gettoken");
            console.log("facebook")
            axios.get(RouteURL() + "/facebook/auth/")
            .then((response) => {
                console.log(response)
                const url = "https://www.facebook.com/dialog/oauth?client_id="+response.data.client_id+"&amp;scope="+response.data.scope+"&amp;redirect_uri="+response.data.redirect_uri+""
                window.location.href = url;
            })
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