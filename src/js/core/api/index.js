import axios from "axios";
import { API_URL } from '../constants';
import {logout} from "../actions/user.action";

const getAPIUrl = (url) => API_URL + url;

const axiosConfig = () => {
    // origin: ["*"],
    //     headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
    //     credentials: true
    let config = {
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    if (localStorage.accessToken) {
        config['headers']['accesstoken'] = localStorage.accessToken;
    }

    if (localStorage.idToken) {
        config['headers']['Authorization'] = localStorage.idToken;
    }

    return config;
};

const tokenAxiosConfig = () => {
    let config = {
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    if (localStorage.accessToken) {
      config['headers']['accesstoken'] = localStorage.accessToken;
    }

    if (localStorage.refreshToken) {
        config['headers']['refreshToken'] = localStorage.refreshToken;
    }

    if (localStorage.idToken) {
      config['headers']['Authorization'] = localStorage.idToken;
    }

    return config;
};

const get = async (url) => {
    return await axios.get(getAPIUrl(url), axiosConfig()).then((res) => {
        if (res.data && res.data.status === 'fail' && res.data.errorMessage === 'Access Token has expired') {
            // logout();
            console.log("Access Token has expired, logging out");
        } else {
            res.data.errorMessage && console.log(res.data.errorMessage);
            return res;
        }
    }).catch(err => {
        return false;
    });
};

const post = async (url, data) => {
    return axios.post(getAPIUrl(url), data, axiosConfig()).then((res) => {
        if (res.data && res.data.status === 'fail' && res.data.errorMessage === 'Access Token has expired') {
            logout();
            console.log("Access Token has expired, logging out");
        } else {
            return res;
        }
    }).catch(err => {
        return false;
    });
};

// export default {
//     user: {
//         login: async (credentials) => axios.post(API_URL + 'signin', credentials),
//         register: user => axios.post(API_URL + 'signup', user)
//     }
// }

export {
    getAPIUrl, axiosConfig, tokenAxiosConfig, get, post
}
