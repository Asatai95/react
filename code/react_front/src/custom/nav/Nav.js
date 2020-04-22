import React, { Component } from 'react';
import axios from 'axios';
import {RouteURL, Loading, RefreshToken} from "../../assets/Config";
import Cookies from 'js-cookie';
import POPUPbutton from "../../login/js/modal";
import ReactDOM from 'react-dom';
// import UserAuthButton from "../../logout/App";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: "",
            url : "",
            user: "",
            isToggleOn: true,
        };

        this.onClick = this.state.onClick;
    }

    componentDidMount() {
        var main_block = document.getElementById("root");
        main_block.classList.add("disactive");
        if (window.location.pathname === "/logout"){
            Cookies.remove("myapp");
        }
        axios.get(RouteURL() + "/userinfo/", {
            headers: {
              Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            RefreshToken();
            main_block.classList.remove("disactive");
            this.setState({
                label: "Sign Out",
                url: "/logout",
                class: "link_logout",
                user: response.data.username,
                isToggleOn: true
            });
        })
        .catch((error) => {
            var path = window.location.pathname ;
            if (path.indexOf("user") < 0 && path !== "/login" && path !== "/login/" && path !== "/logout" && path !== "/logout/"){
                Cookies.remove("tab")
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
                label: "Sign In",
                url: "/login",
                class: "link_login",
                isToggleOn: false
            });
        });
    }

    onClick(event){
        // window.location.href = "/dashbord";
        console.log(event)
    }

    render(){
        return(
            <div className="navbar-brand container-fluid">
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                    <span className="navbar-toggler-icon icon-bar"></span>
                </button>
                <div className="navbox_content collapse navbar-collapse justify-content-end">
                    {this.state.user && (
                        <div className="user_auth" onClick={this.state.onClick}>
                            <p><i className="fa fa-user-circle-o" aria-hidden="true"></i><span>{this.state.user}</span></p>
                        </div>
                    )}
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item nav-item">
                            <a className={this.state.class} href={this.state.url} onClick={this.state.onClick}>{this.state.label}</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Header;