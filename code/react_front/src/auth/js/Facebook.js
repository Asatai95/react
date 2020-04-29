import axios from "axios";
import Cookies from 'js-cookie';
import {RouteAUTHURL} from "../../assets/Config";
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

export const facebookReqToken = (info) => {
    if (info === "gettoken"){
        Cookies.set("authToken","facebook")
        window.location.href = "https://www.facebook.com/v2.5/dialog/oauth?response_type=code&redirect_uri=http://localhost:3000/users/auth/facebook/callback&client_id=159779238790256&display=popup&scope=email";
    }
    if (info === "login"){
        Cookies.remove("auth");
        const param = param_item("code");
        const conf = {
            code: param,
            provider: "facebook"
        }

        axios.defaults.withCredentials = true
        axios.post(RouteAUTHURL() + "/social/session/", conf)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error.response)
        })
    }
};
