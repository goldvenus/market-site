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

const post = async (url, data) => {
  try {
    let response = await axios.post(getAPIUrl(url), data, axiosConfig());
    return response;
  } catch (error) {
    console.log(error);
  }
}

const register = async (data) => {
  try {
    let response = await post('signup', data);
    dispatch({
      type: ACTIONS.USER,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
}

export { register }
