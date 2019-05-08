import axios from "axios";
import { API_URL } from '../constants';

const getAPIUrl = (url) => API_URL + url;

const axiosConfig = () => {
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
    return await axios.get(getAPIUrl(url), axiosConfig()).then((res) => res)
        .catch(err => {
            return false;
        });
};

const post = async (url, data) => {
    return axios.post(getAPIUrl(url), data, axiosConfig()).then((res) => res)
        .catch(err => {
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
