import React, { Component } from 'react';
import axios from 'axios';
import {RouteURL, header} from "../../assets/Config";
import { darkblue } from 'color-name';
// import Cookies from 'js-cookie';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            url : "",
            user: "",
            isToggleOn: true,
        };
    }

    componentDidMount() {
        // header["Authorization"] = "JWT [eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNCwidXNlcm5hbWUiOiJ0ZXN0LnN1Yi5ha2F1bnRvQGdtYWlsLmNvbSIsImV4cCI6MTU4NjQzOTc0MiwiZW1haWwiOiJ0ZXN0LnN1Yi5ha2F1bnRvQGdtYWlsLmNvbSJ9.eWq11vRIuM3sQRRe51JnebD4MaivYR-7l42f0A43n8w]"
        console.log(header)
        axios.get(RouteURL() + "/userinfo/", header)
        .then(response => {
            this.setState({
                label: "logout",
                url: "/logout",
                class: "link_logout",
                user: response.username,
                isToggleOn: true
            });
        })
        .catch((error) => {
            console.log(error.response)
            this.setState({
                label: "login",
                url: "/login",
                class: "link_login",
                isToggleOn: false
            });
        });
    }

    render(){

        return(

            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                  MY TODO APP
                </a>
                <div className="user_auth">
                  <p>{this.state.user}</p>
                </div>
                <a role="button" href="/#" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <a className={this.state.class} href={this.state.url}>{this.state.label}</a>
                  </li>
                </ul>
            </div>

        );
    }
}
export default Header;