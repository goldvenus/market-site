import axios from 'axios';
import { API_URL, ACTIONS } from '../constants';
import store from '../store';

const dispatch = store.dispatch;

const axiosConfig = () => {
  return {
    'headers': {
      'Content-Type': 'application/json'
    }
  }
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

const post = async (url, data) => {
  try {
    let response = await axios.post(getAPIUrl(url), data, axiosConfig());
    return response;
  } catch (error) {
    handleError(error && error.message);
  }
}

const get = async (url, data) => {
  try {
    let response = await axios.get(getAPIUrl(url), data, axiosConfig());
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

    // retrieve user data
    if (response) {
      const user = {
        userid: response.data.userAttributeData[0].userid,
        email: response.data.userAttributeData[0].email,
        given_name: response.data.userAttributeData[0].cognitoPool.userAttributes.given_name,
        picture: response.data.userAttributeData[0].cognitoPool.userAttributes.picture,
      };

      dispatch({
        type: ACTIONS.LOGGED_IN,
        payload: user
      });
    }
  } catch (error) {
    handleError(error);
  }
}
export { register, login, clearError, handleError, fetchCategories }
