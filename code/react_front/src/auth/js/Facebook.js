import axios from "axios";
import Cookies from 'js-cookie';
import { RouteAUTHURL, RouteURL, header } from "../../assets/Config";
// import DjangoCSRFToken from 'django-react-csrftoken'

const param_item = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// var token = () => {
//     const item = document.getElementsByTagName("csrfmiddlewaretoken")
//     console.log(item)
//     if(item.value !== ""){
//         console.log(item.value)
//     }
// }

// setInterval(token, 500);

export const facebookReqToken = (info) => {
    if (info === "gettoken"){
        const item = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log(item)
        Cookies.set("authToken","facebook")
        window.location.href = "https://www.facebook.com/v6.0/dialog/oauth?response_type=code&redirect_uri=http://localhost:3000/users/auth/facebook/callback&client_id=159779238790256&display=popup&scope=email";
    }
    if (info === "login"){

        Cookies.remove("auth");
        const param = param_item("code")
        axios.get("https://graph.facebook.com/v7.0/oauth/access_token?redirect_uri=http://localhost:3000/users/auth/facebook/callback&client_id=159779238790256&client_secret=12bf3a9fb1ac4a08bceaae1156aa3884&code="+param+"")
        .then((response) => {
            var conf = {
                "provider": "facebook",
                "code": response.data.access_token
            }
            console.log(conf)
            // const item = document.getElementsByTagName("csrfmiddlewaretoken").value
            // console.log(item)
            // Cookies.set("csrftoken", "Bp9cKaAqVGWWGGFdnyqIM0A6Z23KqkmtmKemrHDTDvGpnEMMHvEVxG0ILDlemcsf")
            // var csrftoken = getCookie('csrfmiddlewaretoken');
            // console.log("csrftoken")
            // console.log(conf)
            axios.defaults.xsrfCookieName = 'csrfmiddlewaretoken';
            axios.defaults.xsrfHeaderName = "X-CSRFToken";
            axios.defaults.withCredentials = true
            axios.post(RouteAUTHURL() + "/social/session/", conf)
            .then((response) => {
                console.log("response")
                console.log(response)
            })
            .catch((error) => {
                console.log(error.response)
                console.log(error.response.data)
            })
        })
        // window.location.href = ""
    }
    if (info === "access"){
        // const param = param_item("code");
        // console.log(param)
        // var conf = {
        //     "provider": "facebook",
        //     "code": "EAACRUYDFRHABAP3ZADiZBHuOhKTp8Jigz1oPSBHS1SOD9wzZB9YjkZC0fXAD3wvZBvA4QnL5HIHXIgGavbsMfvZAByFrFP3v2FRta31YQdWhR1uwADiMpGb47tszjNbM3PI0eE1CEdTHOdu4H1jFCoRwZBgfXbvJpMsXGcYyIhGCo7XuJfcoXDGNzvPDC7VcY2wICQ6E1z7vQZDZD"
        // }
        // console.log("conf")
        // console.log(conf)
        // axios.defaults.withCredentials = true
        // axios.post(RouteAUTHURL() + "/social/session/" , conf)
        // .then((response) => {
        //     console.log("item response")
        //     console.log("response")
        //     console.log(response)
        // })
        // .catch((error) => {
        //     console.log("response")
        //     console.log(error)
        //     console.log(error.response)
        // })
    }
};