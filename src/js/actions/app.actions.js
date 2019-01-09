import axios from 'axios';
import { API_URL, ACTIONS } from '../constants';
import store from '../store';
import moment from 'moment';

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
    return response.data.status;
  } catch (error) {
    handleError(error);
  }
}

const getListGears = async () => {
  try {
    let response = await get('viewUserGearList');
    if(response && response.data) {
      dispatch({
        type: ACTIONS.LIST_GEARS,
        payload: response.data
      });
    }
  } catch (error) {
    handleError(error);
  }
}

const logout = () => {
  delete localStorage.accessToken;
  delete localStorage.idToken;
  delete localStorage.refreshToken;

  dispatch({
    type: ACTIONS.LOGGED_OUT,
    payload: null
  });
}

const getGear = async (gearid) => {
  try {
    let response = await post('viewAddedGearItem', { gearid });
    dispatch({
      type: ACTIONS.GEAR,
      payload: response.data[0]
    });
  } catch (error) {
    handleError(error);
  }
}

const addCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('addGearIntoCart', data);
      resolve(response);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
}

const getCarts = async () => {
  try {
    let response = await get('viewUserCart');

    dispatch({
      type: ACTIONS.CARTS,
      payload: response.data
    });
  } catch (error) {
    handleError(error);
  }
}

const formatDate = (date) => {
  return date && moment(date).format('YYYY-MM-DD');
}

export { register, login, logout, clearError, handleError, getUser, readFileData, addGear, fetchCategories, getListGears, getGear, addCart, getCarts, formatDate }
