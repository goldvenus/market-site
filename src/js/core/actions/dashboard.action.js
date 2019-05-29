import constants from "../types";
import {handleError} from "./common.action";
import {get, post} from "../api/index"
import store from '../../store';

const dispatch = store.dispatch;

function compare(a, b) {
  const genreA = a.RecordCreated;
  const genreB = b.RecordCreated;
  
  let comparison = 0;
  if (genreA < genreB) {
    comparison = 1;
  } else if (genreA > genreB) {
    comparison = -1;
  }
  return comparison;
}

const viewUserDashboard = async () => {
  dispatch({
    type: constants.GET_USER_DASHBOARD_REQUEST,
  });
  try {
    let response = await get('viewUserDashboard');
    if (response && response.data && response.data.status === 'success') {
      dispatch({
        type: constants.GET_USER_DASHBOARD_SUCCESS,
        payload: response.data.data
      });
    }
  } catch (error) {
    dispatch({
      type: constants.GET_USER_DASHBOARD_FAILED,
    });
    handleError(error);
  }
};

// order history
const getOrderHistory = async () => {
  dispatch({
    type: constants.GET_ORDER_HISTORY_REQUEST,
  });
  try {
    let response = await get('getOrderHistory');
    if (response && response.data && response.data.status === 'success') {
      let renter = response.data.data.renter;
      let owner = response.data.data.owner;
      renter.sort(compare);
      owner.sort(compare);
      
      dispatch({
        type: constants.GET_ORDER_HISTORY_SUCCESS,
        payload: {renter, owner}
      });
    } else {
      dispatch({
        type: constants.GET_ORDER_HISTORY_FAILED
      });
    }
  } catch (error) {
    dispatch({
      type: constants.GET_ORDER_HISTORY_FAILED
    });
    handleError(error);
  }
};

const getOrderDetail = async (data) => {
  dispatch({
    type: constants.GET_ORDER_DETAIL_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getOrderDetail', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.GET_ORDER_DETAIL_SUCCESS
        });
        resolve(response.data.data);
      } else {
        reject(false);
      }
    } catch (error) {
      dispatch({
        type: constants.GET_ORDER_DETAIL_FAILED
      });
      handleError(error);
      reject(false);
    }
  });
};

const setRating = async (data) => {
  let res = await post("setRating", data);
  if (res && res.data && res.data.status === 'success') {
    return true;
  } else {
    res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
    return false;
  }
};

const setReturnGearStatus = async (data) => {
  let res = await post("setReturnGearStatus", data);
  if (res && res.data && res.data.status === 'success') {
    return true;
  } else {
    res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
    return false;
  }
};

//  gear history
const setPickupState = async (data) => {
  let res = await post("setPickupState", data);
  if (res && res.data && res.data.status === 'success') {
    return true;
  } else {
    res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
    return false;
  }
};

const getGearRentState = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getGearRentState', data);
      if (response && response.data && response.data.status === 'success') {
        resolve(response.data.data);
      }
      reject(false);
    } catch (error) {
      handleError(error);
      reject(false);
    }
  });
};

const setBlockPeriod = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('setBlockPeriod', data);
      if (response && response.data && response.data.status === 'success') {
        resolve(true);
      }
      reject(false);
    } catch (error) {
      handleError(error);
      reject(false);
    }
  });
};

export {
  viewUserDashboard,
  getGearRentState, setBlockPeriod,
  getOrderDetail, getOrderHistory, setPickupState, setRating, setReturnGearStatus
}