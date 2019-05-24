import constants from "../types";
import {handleError} from "./common.action";
import {post} from "../api/index";
import store from '../../store';

const dispatch = store.dispatch;

const payment = data => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: constants.DO_PAYMENT_REQUEST
    });
    try {
      let param = data;
      param.email = localStorage.userEmail;
      let response = await post('dopayment', param);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.DO_PAYMENT_SUCCESS
        });
        resolve(response.data.data);
      }
      reject(false);
    } catch (error) {
      handleError(error);
      dispatch({
        type: constants.DO_PAYMENT_FAILED
      });
      reject(error);
    }
  });
};

const getPaymentCards = data => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: constants.GET_PAY_CARDS_REQUEST
    });
    try {
      let response = await post('getpaycards', {user_id: data});
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.GET_PAY_CARDS_SUCCESS,
          payload: response.data
        });
        resolve(response.data.data);
      }
      reject(false);
    } catch (error) {
      dispatch({
        type: constants.GET_PAY_CARDS_FAILED
      });
      reject(error);
      handleError(error);
    }
  });
};

const getPaidItems = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getPaidItems', data);
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const getTransHistory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getTransHistory', data);
      if (response && response.data && response.data.status === 'success') {
        resolve(response.data);
      }
      resolve(false);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const doNummusCharge = async (data) => {
  let res = await post("doNummusCharge", data);
  if (res && res.data && res.data.status === 'success') {
    return res.data.data;
  } else {
    console.log(res);
    if (res.data && res.data.errorMessage)
      handleError(res.data.errorMessage);
    return false;
  }
};

const createNummusCustomer = async (data) => {
  let res = await post("createNummusCustomer", data);
  if (res && res.data && res.data.status === 'success') {
    return res.data.data;
  } else {
    console.log(res);
    res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
    return false;
  }
};

const createNummusVendor = async (data) => {
  let res = await post("createNummusVendor", data);
  if (res && res.data && res.data.status === 'success') {
    return res;
  } else {
    handleError(res.data.errorMessage);
    return false;
  }
};

const checkExistingNummusCustomer = async (data) => {
  let res = await post("checkNummusCustomer", data);
  if (res && res.data && res.data.status === 'success') {
    return true;
  } else {
    return false;
  }
};

export {
  payment, getPaidItems, getPaymentCards, getTransHistory,
  doNummusCharge, createNummusVendor, createNummusCustomer, checkExistingNummusCustomer
}