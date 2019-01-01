import axios from 'axios';
import { API_URL, ACTIONS } from '../constants';
import store from '../store';

const dispatch = store.dispatch;

const axiosConfig = () => {
  let config = {
    'headers': {
      'Content-Type': 'application/json'
    }
  };

  if (localStorage.accessToken) {
    config['headers']['AccessToken'] = localStorage.accessToken;
  }

  if (localStorage.idToken) {
    config['headers']['Authorization'] = localStorage.idToken;
  }

  return config;
}

const getAPIUrl = (url) => API_URL + url;

const handleError = (error) => {
  dispatch({
    type: ACTIONS.ERROR,
    payload: error
  });
}

const clearError = () => {
  dispatch({
    type: ACTIONS.REMOVE_ERROR,
    payload: null
  });
}

const get = async (url) => {
  try {
    let response = await axios.get(getAPIUrl(url), axiosConfig());
    return response;
  } catch (error) {
    handleError(error && error.message);
  }
}

const post = async (url, data) => {
  try {
    let response = await axios.post(getAPIUrl(url), data, axiosConfig());
    return response;
  } catch (error) {
    handleError(error && error.message);
  }
}

const fetchCategories = () => {
  try {
    let response = axios.get(API_URL + 'getAllProductsCategory');
    dispatch({
      type: ACTIONS.FETCH_CATEGORIES,
      payload: response
    })
  }
  catch (error) {
    handleError(error);
  }
}

const register = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('signup', data);
      dispatch({
        type: ACTIONS.USER,
        payload: response
      });

      resolve(response);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
}

const login = async (data) => {
  try {
    let response = await post('signin', data);

    if(response && response.data) {
      dispatch({
        type: ACTIONS.LOGGED_IN,
        payload: response.data.userAttributes
      });

      // store the token
      const { accessToken, idToken, refreshToken } = response.data.tokens;
      localStorage.accessToken = accessToken;
      localStorage.idToken = idToken;
      localStorage.refreshToken = refreshToken;
    }
  } catch (error) {
    handleError(error);
  }
}

const getUser = async () => {
  try {
    if (localStorage.accessToken) {
      let response = await get('getUserInfo');

      if(response && response.data) {
        dispatch({
          type: ACTIONS.LOGGED_IN,
          payload: response.data.userAttributes
        });
      }
    }
  } catch (error) {
    handleError(error);
  }
}

const readFileData = (event) => {
  return new Promise((resolve, reject) => {
    let input = event.target;

    if (input && input.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve(event.target.result);
      }

      fileReader.onerror = (e) => reject("error");
      fileReader.readAsDataURL(input.files[0]);
    }
  });
}

const addGear = async (data) => {
  try {
    let response = await post('addGearItem', data);
  } catch (error) {
    handleError(error);
  }
}

export { register, login, clearError, handleError, getUser, readFileData, addGear, fetchCategories }
