import axios from "axios";
import { API_URL, API_URL_NEW } from '../constants';
// import { handleError } from "../actions/common.action";

const getAPIUrl = (url) => API_URL + url;

const axiosConfig = () => {
    let config = {
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    if (localStorage.accessToken) {
        config['headers']['accessToken'] = localStorage.accessToken;
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

    // if (localStorage.accessToken) {
    //   config['headers']['AccessToken'] = localStorage.accessToken;
    // }

    if (localStorage.refreshToken) {
        config['headers']['refreshToken'] = localStorage.refreshToken;
    }

    // if (localStorage.idToken) {
    //   config['headers']['Authorization'] = localStorage.idToken;
    // }

    return config;
};

const get = async (url) => {
    return await axios.get(getAPIUrl(url), axiosConfig()).then((res) => res)
        .catch(err => {
            //handleError(err.response && err.response.data.errorMessage)
        });
};

const get_new = async (url) => {
    return await axios.get(API_URL_NEW + url, axiosConfig()).then((res) => res)
        .catch(err => {
            //handleError(err.response && err.response.data.errorMessage)
        });
};

const post = async (url, data) => {
    return axios.post(getAPIUrl(url), data, axiosConfig()).then((res) => res)
        .catch(err => {
            // handleError(err.response.data.errorMessage);
        });
};

const post_new = async (url, data) => {
    return axios.post(API_URL_NEW + url, data, axiosConfig()).then((res) => res)
        .catch(err => {
            // handleError(err.response.data.errorMessage);
        });
};

// export default {
//     user: {
//         login: async (credentials) => axios.post(API_URL + 'signin', credentials),
//         register: user => axios.post(API_URL + 'signup', user)
//     }
// }

export {
    getAPIUrl, axiosConfig, tokenAxiosConfig, get, get_new, post, post_new
}
