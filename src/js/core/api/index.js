import axios from "axios";
import {API_URL, API_URL1} from '../constants';
import {logout} from "../actions/user.action";
import {handleError} from "../actions/common.action";

const getAPIUrl = (url) => API_URL + url;
const getAPIUrl1 = (url) => API_URL1 + url;

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

const get = async (url, urlNew) => {
  return await axios.get(urlNew ? getAPIUrl1(url) : getAPIUrl(url), axiosConfig())
    .then((res) => {
      if (res.data && res.data.status === 'fail' && res.data.errorMessage === 'Access Token has expired') {
        console.log(url);
        console.log("Access Token has expired, logging out");
        redirectToLogin();
      } else {
        if (res.data.errorMessage)
          console.log(res.data.errorMessage);
        return res;
      }
    })
    .catch ((error) => {
      if (!error.response) {
        // network error
        handleError("Network Connection Error");
      } else {
        handleError(error.response.data.message);
      }
      return false;
    });
};

const post = async (url, data, urlNew) => {
  return axios.post(urlNew ? getAPIUrl1(url) : getAPIUrl(url), data, axiosConfig())
    .then((res) => {
      if (res.data && res.data.status === 'fail' && res.data.errorMessage === 'Access Token has expired') {
        console.log(url);
        console.log("Access Token has expired, logging out");
        redirectToLogin();
      } else {
        if (res.data.errorMessage)
          console.log(res.data.errorMessage);
        return res;
      }
    })
    .catch ((error) => {
      if (!error.response) {
        // network error
        handleError("Network Connection Error");
      } else {
        console.log(error.response.data);
        handleError(error.response.data.message);
      }
      return false;
    });
};

const redirectToLogin = () => {
  let redirect = window.location.pathname + window.location.search;
  logout();
  if (window.location.search.indexOf('login') < 0
    && window.location.search.indexOf('register') < 0) {
      window.location.href = `/login?redirect=${redirect}`;
  } else {
    window.location.href = '/login';
  }
};

export {
  getAPIUrl, axiosConfig, tokenAxiosConfig, get, post
}
