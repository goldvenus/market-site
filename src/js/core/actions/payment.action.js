import constants from "../types";
import {handleError, handleInfo} from "./common.action";
import {post, get} from "../api/index";
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
  dispatch({
    type: constants.GET_TRANSACTIONS_REQUEST,
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getTransHistory', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.GET_TRANSACTIONS_SUCCESS,
          payload: response.data.data
        });
        resolve(true);
      }
      dispatch({
        type: constants.GET_TRANSACTIONS_FAILED,
      });
      resolve(false);
    } catch (error) {
      dispatch({
        type: constants.GET_TRANSACTIONS_FAILED,
      });
      handleError(error);
      reject(error);
    }
  });
};

const savePaymentMethod = (data) => {
  dispatch({
    type: constants.SAVE_METHOD_REQUEST,
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('savePaymentMethod', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.SAVE_METHOD_SUCCESS,
          payload: {...data, methodId: response.data.data}
        });
        handleInfo('Method was saved successfully');
        resolve(true);
        return;
      } else if (response && response.data && response.data.errorMessage) {
        handleError(response.data.errorMessage);
      } else {
        handleError('Method was not saved');
      }
      dispatch({
        type: constants.SAVE_METHOD_FAILED
      });
      resolve(false);
    } catch (error) {
      handleError(error);
      dispatch({
        type: constants.SAVE_METHOD_FAILED
      });
      reject(error);
    }
  });
};

const getPaymentMethods = () => {
  dispatch({
    type: constants.GET_METHODS_REQUEST,
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await get('getPaymentMethods');
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.GET_METHODS_SUCCESS,
          payload: response.data.data
        });
        resolve(true);
        return;
      }
      dispatch({
        type: constants.GET_METHODS_FAILED
      });
      resolve(false);
    } catch (error) {
      handleError(error);
      dispatch({
        type: constants.GET_METHODS_FAILED
      });
      reject(error);
    }
  });
};

const deletePaymentMethod = async (data) => {
  dispatch({
    type: constants.REMOVE_METHOD_REQUEST,
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('removePaymentMethod', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.REMOVE_METHOD_SUCCESS,
          payload: data.methodId
        });
        handleInfo('Method was removed successfully');
        resolve(true);
        return;
      }
      dispatch({
        type: constants.REMOVE_METHOD_FAILED
      });
      handleError('Method was not removed');
      resolve(false);
    } catch (error) {
      handleError(error);
      dispatch({
        type: constants.REMOVE_METHOD_FAILED
      });
      reject(error);
    }
  });
};

const doNummusCharge = async (data) => {
  let res = await post("doNummusCharge", data);
  if (res && res.data && res.data.status === 'success') {
    return res.data.data;
  } else {
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
  payment, getPaidItems, getPaymentCards, getTransHistory, savePaymentMethod, getPaymentMethods, deletePaymentMethod,
  doNummusCharge, createNummusVendor, createNummusCustomer, checkExistingNummusCustomer
}