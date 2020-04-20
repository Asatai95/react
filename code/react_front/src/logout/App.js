import React, { Component } from 'react';
import axios from 'axios';
import {RouteURL} from "../assets/Config";
import Cookies from 'js-cookie';

class UserAuthButton extends Component {
    componentDidMount(){
        console.log("pass userauth")
        console.log(this.props.label)
        if (this.props.label === "Logout") {
            axios.get(RouteURL() + '/logout/', {
                headers: {
                    Authorization: `JWT `+Cookies.get("myapp")+``
                }
            })
            .then((response) => {
                console.log(response.data)
                Cookies.remove("myapp");
            })
            .catch((error) => {
                console.log(error.response)
            });
        }
    }
    render(){
        console.log(this.props.label)
        return (
            <a className={this.props.class} href={this.props.url}>{this.props.label}</a>
        )
    }
}
export default UserAuthButton;