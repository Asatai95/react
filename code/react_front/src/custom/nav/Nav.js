import React, { Component } from 'react';
import axios from 'axios';
import {RouteURL, Loading, RefreshToken} from "../../assets/Config";
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
        var main_block = document.getElementById("root");
        main_block.classList.add("disactive");
        axios.get(RouteURL() + "/userinfo/", {
            headers: {
              Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            RefreshToken();
            main_block.classList.remove("disactive");
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
            if (path.indexOf("user") < 0 && path !== "/login" && path !== "/login/" && path !== "/logout" && path !== "/logout/"){
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
                <a role="button" href="/#" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
                <div className="navbox_content">
                    <div className="user_auth">
                        <p><i className="fa fa-user-circle-o" aria-hidden="true"></i><span>{this.state.user}</span></p>
                    </div>
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <a className={this.state.class} href={this.state.url}>{this.state.label}</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Header;