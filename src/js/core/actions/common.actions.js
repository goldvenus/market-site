import axios from 'axios';
import { API_URL, API_URL_NEW, ACTIONS } from '../../constants';
import store from "../../store";
const dispatch = store.dispatch;
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

const getAPIUrl = (url) => API_URL + url;

const handleError = (error) => {
    dispatch({
        type: ACTIONS.ERROR,
        payload: error || 'Something went wrong'
    });
};

const clearError = () => {
    dispatch({
        type: ACTIONS.REMOVE_ERROR,
        payload: null
    });
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
            handleError(err.response.data.errorMessage);
        });
};

const post_new = async (url, data) => {
    return axios.post(API_URL_NEW + url, data, axiosConfig()).then((res) => res)
        .catch(err => {
            handleError(err.response.data.errorMessage);
        });
};

export {
    axiosConfig, tokenAxiosConfig, getAPIUrl, handleError, clearError, get, get_new, post, post_new
}