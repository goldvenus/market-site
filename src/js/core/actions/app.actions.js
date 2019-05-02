import axios from 'axios';
import { API_URL, API_URL_NEW } from '../constants';
import store from '../../store';
import moment from 'moment';

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


const getAllGears = async () => {
  try {
    let response = await get('viewAllGearList');
    if (response && response.data) {
      dispatch({
        type: ACTIONS.ALL_GEARS,
        payload: response.data.Items
      });
    }
  } catch (error) {
    handleError(error);
  }
};

const getGear = async (gearid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('viewAddedGearItem', { gearid });
      dispatch({
        type: ACTIONS.GEAR,
        payload: response.data[0]
      });
      resolve(response);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};


export {
  getAllGears, getGear
};