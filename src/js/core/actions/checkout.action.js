import constants from "../types";
import {handleError} from "./common.action";
import {post} from "../api/index";
import store from '../../store';

const dispatch = store.dispatch;

const checkout = data => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: constants.DO_CHECKOUT_REQUEST
    });
    try {
      let response = await post('docheckout', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.DO_CHECKOUT_SUCCESS,
          payload: response.data.data
        });
        resolve(response.data.data);
      } else if (response.data.errorMessage === 'duplicated') {
        handleError('You should provide another project name!');
        resolve(false);
      }
    } catch (error) {
      dispatch({
        type: constants.DO_CHECKOUT_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const getCheckout = data => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: constants.GET_CHECKOUT_REQUEST
    });
    try {
      let response = await post('getcheckout', {user_id: data});
      dispatch({
        type: constants.GET_CHECKOUT_SUCCESS,
        payload: response.data
      });
      resolve(response.data);
    } catch (error) {
      handleError(error);
      dispatch({
        type: constants.GET_CHECKOUT_FAILED
      });
      reject(error);
    }
  });
};

const saveCheckoutInfo = data => {
  dispatch({
    type: constants.SAVE_CHECKOUT_INFO,
    payload: data
  })
};

export {
  checkout, getCheckout, saveCheckoutInfo
}