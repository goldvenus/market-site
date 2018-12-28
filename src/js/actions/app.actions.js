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
    handleError(error.response.data);
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
    dispatch({
      type: ACTIONS.USER,
      payload: response
    });
  } catch (error) {
    handleError(error);
  }
}

export { register, login, clearError, handleError }
