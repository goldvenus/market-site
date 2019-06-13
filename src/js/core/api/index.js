import axios from "axios";
import {API_URL} from '../constants';
import {logout} from "../actions/user.action";
import {handleError} from "../actions/common.action";

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
  return await axios.get(getAPIUrl(url), axiosConfig())
    .then((res) => {
      if (res.data && res.data.status === 'fail' && res.data.errorMessage === 'Access Token has expired') {
        console.log(url);
        console.log("Access Token has expired, logging out");
        let redirect = window.location.pathname + window.location.search;
        logout();
        window.location.href = `/login?redirect=${redirect}`;
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

const post = async (url, data) => {
  return axios.post(getAPIUrl(url), data, axiosConfig())
    .then((res) => {
      if (res.data && res.data.status === 'fail' && res.data.errorMessage === 'Access Token has expired') {
        console.log(url);
        console.log("Access Token has expired, logging out");
        let redirect = window.location.pathname + window.location.search;
        logout();
        window.location.href = `/login?redirect=${redirect}`;
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

// export default {
//     user: {
//         login: async (credentials) => axios.post(API_URL + 'signin', credentials),
//         register: user => axios.post(API_URL + 'signup', user)
//     }
// }

export {
  getAPIUrl, axiosConfig, tokenAxiosConfig, get, post
}
