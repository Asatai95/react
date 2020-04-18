import React, { Component } from 'react';
import axios from 'axios';
import {RouteURL, Loading} from "../../assets/Config";
import Cookies from 'js-cookie';
import POPUPbutton from "../../login/js/modal";
import ReactDOM from 'react-dom';

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
        axios.get(RouteURL() + "/userinfo/", {
            headers: {
              Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            this.setState({
                label: "logout",
                url: "/logout",
                class: "link_logout",
                user: response.data.username,
                isToggleOn: true
            });
        })
        .catch((error) => {
            var path = window.location.pathname ;
            console.log(path)
            if (path.indexOf("user") < 0 && path !== "/login" && path !== "/logout"){
                Loading("login");
            }
            const label = Cookies.get("login");
            if (label === "login"){
                Cookies.remove("login")
                ReactDOM.render(
                    <POPUPbutton
                        item="login"
                    />,
                    document.getElementById('popupwin')
                );
            }
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