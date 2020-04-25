import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../404'
import axios from 'axios';
import Cookies from 'js-cookie';
import PasswordReset from "../reset/App";
import Login from "../login/App";
import POPUPbutton from "../login/js/modal";

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export const RouteURL = () => "http://localhost:3031";

export const header = {
  'Access-Control-Allow-Origin': 'http://localhost:3031',
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept",
  "Access-Control-Allow-Credentials": true
}

// 初期ユーザーデータの取得
const date_list = {}
export const userList = (response) => {
    var date_db;
    const tmp_date_list = [];
    if (response !== undefined){
        for (var i = 0; i < response.length; i++){
            date_db = response[i].date_joined
            tmp_date_list.push(date_db)
        }
        tmp_date_list.sort(function(a,b) {
            return (a.date < b.date ? 1 : -1);
        });

        date_list["date"] = tmp_date_list
        date_list["usersLength"] = tmp_date_list.length

        return date_list;
    }
}

// ログイン画面のclassName変更
export const ClassContainer = () => {
    document.getElementById('root').className= "container-main-back"
}

export const UserAuth = (email, password) => {
    const d = {
        "email": email,
        "password": password
    }
    var token = Cookies.get('myapptodo');
    header["Content-Type"] = "application/json"
    header["Authorization"] = "JWT["+token+"]"
    axios.post(RouteURL() + '/userauth/', d, header)
    .then((response) => {
        axios.post(RouteURL() + '/userauth/refresh/', {
            "token": response.data.token,
        }, header)
        .then((response) => {
            Cookies.set("myapp", response.data.token);
        });
        Cookies.remove("myapptodo");
    })
    .catch((error) => {
        console.log(error.response)
    });
}

export const RefreshToken = () => {
    const user_auth = Cookies.get("myapp");
    header["Authorization"] = "JWT["+user_auth+"]"
    axios.post(RouteURL() + '/userauth/refresh/', {
        "token": user_auth,
    }, header)
    .then((response) => {
        Cookies.set("myapp", response.data.token);
        // header[""]
    });
}

export const Loading = (info) => {
    var obj = document.getElementById("loading");
    obj.classList.add("active");
    var element = document.getElementById('loading');
    element.innerHTML = '<div id="loadicon" class="loader"></div>'
    const item =  () => {
        if (info === "login"){
            Cookies.set("login", "login");
            Cookies.remove("myapp");
            window.location.href = "/login";
        } else if (info === "userauth") {
            window.location.href = "/"
        } else if (info === "reset_bt"){
            obj.classList.remove("active");
            const block = document.getElementById("loading");
            const broccoli = block.lastElementChild;
            block.removeChild(broccoli);
            window.history.replaceState('','','/login');
            ReactDOM.render(<Login />, document.getElementById('root'));
        } else if (info === "reset"){
            obj.classList.remove("active");
            const block = document.getElementById("loading");
            const broccoli = block.lastElementChild;
            block.removeChild(broccoli);
            const pathname = window.location.pathname;
            if (pathname === "/user/password/reset/" || pathname === "/user/password/reset"){
                window.history.replaceState('','','/login');
                ReactDOM.render(<Login />, document.getElementById('root'));
                const obj = document.getElementById('popupwin')
                obj.classList.add("popupwin_active");
                ReactDOM.render(<POPUPbutton
                    info="resetpassword"
                />, obj);
            } else if (pathname === "/login" || pathname === "/login/"){
                window.history.replaceState('','','/user/password/reset/');
                ReactDOM.render(<PasswordReset />, document.getElementById('root'));
            } else {
                window.location.href = "/login";
            }
        } else {
          obj.classList.remove("active");
          const block = document.getElementById("loading");
          const broccoli = block.lastElementChild;
          block.removeChild(broccoli);
        }
    }
    setTimeout(item, 1000);
}
