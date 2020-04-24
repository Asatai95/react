import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './edit.css';
import axios from 'axios';
import {RouteURL} from "../assets/Config";
import Cookies from 'js-cookie';
import Form from "./js/Form";
import FormPassword from "./js/FormPassword";
import Validation from "../Validation";
// import {Image} from 'cloudinary-react';
import POPUPbutton from '../login/js/modal';

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
            total: "",
            is_change: false,
            field_filled: "",
            password: "",
            password_check: "",
            username_error: "",
            firstname_error: "",
            lastname_error: "",
            email_error: "",
            password_error: "",
            password_check_error: "",
            image_error: "",
            detail_error: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onBlurFunc = this.onBlurFunc.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.passChangebt = this.passChangebt.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this)
    }

    componentWillMount(){
        axios.get(RouteURL() + "/todoinfo/", {
            headers : {
                Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            const tmp_list = []
            for (var x = 0; x < response.data.length; x++ ){
                if (response.data[x].user_id === 24){
                    tmp_list.push(response.data[x])
                }
            }
            const count = tmp_list.length;
            this.setState({
                total: count
            });
        });
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
        else  {
            const error_label = event.target.name + "_error";
            this.setState({
                [event.target.name]: value,
                [error_label]: Validation.formValidate(event.target.name, value)
            });
            if (event.target.name === "password_check") {
                if (this.state.password_check !== value && this.state.detail_error !== ""){
                    this.setState({
                        detail_error: ""
                    })
                }
                if (value !== this.state.password){
                    this.setState({
                        password_check_error: "パスワードは確認用には同一値を入力してください"
                    })
                }
            }
        }
    }

    uploadImage(event){
        event.preventDefault();
        const myWidget = () => window.cloudinary.createUploadWidget({
            cloudName: 'db5nsevmi', uploadPreset: 'rlsb6fko'}, (error, result) => {
                if (!error && result && result.event === "success") {
                    const d = {
                        'image': result.info.url
                    }
                    axios.put(RouteURL() + "/user/update/", d, {
                        headers: {
                            Authorization: `JWT `+Cookies.get("myapp")+``
                        }
                    })
                    .then((response) => {
                        this.setState({
                            "image": response.data.image
                        })
                    })
                    .catch((error) => {
                        var label = Object.keys(error.response.data)
                        var value = error.response.data[label]
                        this.setState({
                            "image_error": value,
                        });
                    });
                }
            }
        );
        myWidget().open();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChangePassword(){
        if (this.state.is_change === false){
            this.setState({
                "is_change": true
            })
        } else {
            this.setState({
                "is_change": false
            })
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const { username, email } = this.state;
        var {firstname, lastname} = this.state;
        if (firstname === ""){firstname = "MYAPP"}
        if (lastname === ""){lastname = "USER"}
        const conf = {
            'username':username,
            'email': email,
            'first_name': firstname,
            'last_name': lastname
        };

        axios.put(RouteURL() + "/user/update/", conf, {
            headers: {
                Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            var flag = true;
            var obj = document.getElementById("loading");
            obj.classList.add("active");
            var element = document.getElementById('loading');
            element.innerHTML = '<div id="loadicon" class="loader"></div>'
            const item =  () => {
                obj.classList.remove("active");
                this.setState({
                    "username": response.data.username,
                    "email": response.data.email,
                    "firstname": response.data.first_name,
                    "lastname": response.data.last_name,
                })
                const elm = document.getElementById('popupwin');
                elm.classList.add("popupwin_active")
                ReactDOM.render(<POPUPbutton
                    elmflag={flag}
                    info="useredit"
                />, elm);
            }
            setTimeout(item, 1000);
        })
        .catch((error) => {
            if (error.response !== undefined){
                var label = Object.keys(error.response.data)
                for (var i = 0 ; i < label.length; i++){
                    var value = error.response.data[label[i]]
                    var error_label = label[i] + "_error"
                    this.setState({
                        [error_label]: value,
                    });
                }
            }
        });
    }

    passChangebt(event){
        event.preventDefault()
        const classname = event.target.className.split(" ");
        const elm = document.getElementById(classname[1]);
        if (elm.type === "text"){
            elm.type = "password"
        } else {
            elm.type = "text"
        }
    }

    handlePasswordSubmit(event){
        event.preventDefault();
        const {password, password_check} = this.state;
        const conf = {
            "password": password,
            "password_check": password_check
        }

        axios.put(RouteURL() + "/user/password/update/", conf, {
            headers: {
                Authorization: `JWT `+Cookies.get("myapp")+``
            }
        })
        .then((response) => {
            var flag = true;
            var obj = document.getElementById("loading");
            obj.classList.add("active");
            var element = document.getElementById('loading');
            element.innerHTML = '<div id="loadicon" class="loader"></div>'
            const item =  () => {
                this.setState({
                    password: "",
                    password_check: "",
                    is_change: false,
                })
                obj.classList.remove("active");
                const elm = document.getElementById('popupwin');
                elm.classList.add("popupwin_active")
                ReactDOM.render(<POPUPbutton
                    elmflag={flag}
                    info="useredit"
                />, elm);
            }
            setTimeout(item, 1000);
        })
        .catch((error) => {
            var label = Object.keys(error.response.data)
            var value = error.response.data[label]
            this.setState({
                detail_error: value,
            });
        })
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

        return (
            <div className="content">
                <div className="container-fluid user-edit-field">
                    <div className="row col-md-7">
                        <div className="edit_user_formbox">
                            {this.state.is_change === false && (
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
                                        <div className="changepassbt">
                                            <button type="button" onClick={this.handleChangePassword} className="changeBt btn btn-info">PASSWORD CHANGE</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {this.state.is_change === true && (
                                <div className="card userprofile">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">Edit Password</h4>
                                        <p className="card-category">Complete your password</p>
                                    </div>
                                    <div className="card-body">
                                        <FormPassword
                                            password={this.state.password}
                                            password_check={this.state.password_check}
                                            password_error={this.state.password_error}
                                            password_check_error={this.state.password_check_error}
                                            detail_error={this.state.detail_error}
                                            handleChange={this.handleChange}
                                            handleClick={this.handleClick}
                                            onBlurFunc={this.onBlurFunc}
                                            passChangebt={this.passChangebt}
                                            handlePasswordSubmit={this.handlePasswordSubmit}
                                            flag={flag_label}
                                        />
                                        <div className="changepassbt">
                                            <button type="button" onClick={this.handleChangePassword} className="changeBt btn btn-info"> BACK </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-profile">
                            <div className="card-avatar">
                                <a href="/#" onClick={this.uploadImage}>
                                    <img className="user_img" src={this.state.image} alt=""/>
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="card-category text-gray">{this.state.firstname} / {this.state.lastname} </h6>
                                <div className="userinfocontent">
                                    <div>
                                        <p className="label">ユーザー名</p>
                                        <p>{this.state.username}</p>
                                    </div>
                                    <div>
                                        <p className="label">メールアドレス</p>
                                        <p>{this.state.email}</p>
                                    </div>
                                    <div>
                                        <p className="label">TODO</p>
                                        <p>{this.state.total}</p>
                                    </div>
                                </div>
                                {/* <a href="/#" className="btn btn-primary btn-round">Follow</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;