import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../404'
import axios from 'axios';
import Cookies from 'js-cookie';

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
        console.log(response)
        Cookies.set("myapp", response.data.token);
    })
    .catch((error) => {
        console.log(error.response)
    });
}