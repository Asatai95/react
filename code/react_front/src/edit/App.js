import React, { Component } from 'react';
import './edit.css';
import axios from 'axios';
import {RouteURL} from "../assets/Config";
import Cookies from 'js-cookie';
import Form from "./js/Form";
import Validation from "../Validation";
import {Image} from 'cloudinary-react';


class Edit extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            image: "",
            field_filled: "",
            username_error: "",
            firstname_error: "",
            lastname_error: "",
            email_error: "",
            image_error: "",
            detail_error: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onBlurFunc = this.onBlurFunc.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
        axios.get(RouteURL() + "/userinfo/", {
            headers: {
              Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            this.setState({
                username: response.data.username,
                email: response.data.email,
                image: response.data.image,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
            })
        });
    }

    onBlurFunc(event){
        var value = event.target.value.trim()
        var id = event.target.id;
        const elm = document.getElementById(id+"_field");
        if (value === "" && elm.classList.contains("is-filled") === true){
            for (var i = 0; i < elm.classList.length; i++){
                if (elm.classList[i] === "is-filled"){
                    elm.classList.remove(elm.classList[i])
                }
            }
        }
    }

    handleClick(event){
        var value = event.target.value.trim()
        var id = event.target.id;
        const elm = document.getElementById(id+"_field");
        if (value === "" && elm.classList.contains("is-filled") === false){
            elm.classList.add("is-filled")
        }
    }

    handleChange(event){
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
        else if (event.target.name === 'username') {
            this.setState({
                username: value,
                username_error: Validation.formValidate(event.target.name, value)
            });
        }
        else if (event.target.name === 'firstname' || event.target.name === 'lastname') {
            const name_item = event.target.name + "_error";
            this.setState({
                [event.target.name]: value,
                [name_item]: Validation.formValidate(event.target.name, value)
            });
        }
    }

    uploadImage(event){
        console.log(event)
        var elm = event.parentElement();
        console.log(elm)

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event)
        const { username, email, firstname, lastname } = this.state;
        const conf = {
            'username':username,
            'email': email,
            'firstname': firstname,
            'lastname': lastname
        };
        console.log(conf)
    }

    render(){
        var flag_label;

        return (
            <div className="content">
                <div className="container-fluid user-edit-field">
                    <div className="row col-md-7">
                        <div className="edit_user_formbox">
                            <div className="card userprofile">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Edit Profile</h4>
                                    <p className="card-category">Complete your profile</p>
                                </div>
                                <div className="card-body">
                                    <Form
                                        username={this.state.username}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        email={this.state.email}
                                        password={this.state.password}
                                        username_error={this.state.username_error}
                                        firstname_error={this.state.firstname_error}
                                        lastname_error={this.state.lastname_error}
                                        email_error={this.state.email_error}
                                        password_error={this.state.password_error}
                                        detail_error={this.state.detail_error}
                                        handleChange={this.handleChange}
                                        handleClick={this.handleClick}
                                        onBlurFunc={this.onBlurFunc}
                                        handleSubmit={this.handleSubmit}
                                        flag={flag_label}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-profile">
                            <div className="card-avatar">
                                <a href="/#" onClick={this.uploadImage}>
                                    <img className="user_img" src={this.state.image} alt=""/>
                                    <Image cloudName="db5nsevmi" publicId="userimg" crop="scale" />
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="card-category text-gray">{this.state.firstname} / {this.state.lastname} </h6>
                                <div className="userinfocontent">
                                    <ul>
                                        <li>{this.state.username}</li>
                                        <li>{this.state.email}</li>
                                    </ul>
                                </div>
                                <a href="/#" className="btn btn-primary btn-round">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;