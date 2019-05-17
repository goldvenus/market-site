import constants from "../types";
import {handleError, handleInfo} from "./common.action";
import {get, post} from "../api/index";
import store from '../../store';

const dispatch = store.dispatch;

const addCart = (data) => {
  dispatch({
    type: constants.ADD_TO_CART_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('addGearIntoCart', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.ADD_TO_CART_SUCCESS,
          payload: response.data.data
        });
        if (response.data.removed) {
          // if gear was removed from favor
          dispatch({
            type: constants.DELETE_FAVOURITE_SUCCESS,
            payload: data.gearid
          });
        }
        handleInfo('Gear was added to cart');
        resolve(response.data.data);
      } else {
        let msg = 'Adding to cart was failed';
        if (response.data && response.data.errorMessage) {
          msg = response.data.errorMessage;
          if (response.data.data.blocked && response.data.data.blocked.length > 0) {
              msg += " Gear is unavailable on these days: ";
              msg += response.data.data.blocked.map((item) => (item.start_date + " - " + item.end_date)).join(", ");
          }
          if (response.data.data.booked && response.data.data.booked.length > 0) {
              msg += " Gear is in renting on these days: ";
              msg += response.data.data.booked.map((item) => (item.start_date + " - " + item.end_date)).join(", ");
          }
        }
        handleError(msg);
        resolve(false);
      }
    } catch (error) {
      dispatch({
        type: constants.ADD_TO_CART_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const editCart = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('editGearInCart', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.EDIT_CART_ITEM_SUCCESS,
          payload: data
        });
        handleInfo('Edited successfully');
        resolve(true);
      } else {
        let msg = "Editing failed";
        if (response.data && response.data.errorMessage) {
          msg = response.data.errorMessage;
          if (response.data.data.blocked && response.data.data.blocked.length) {
              msg += " Gear is unavailable on these days: ";
              msg += response.data.data.blocked.map((item) => (item.start_date + " - " + item.end_date)).join(", ");
          }
          if (response.data.data.booked && response.data.data.booked.length) {
              msg += " Gear is in renting on these days: ";
              msg += response.data.data.booked.map((item) => (item.start_date + " - " + item.end_date)).join(", ");
          }
        }
        handleError(msg);
        resolve(false);
      }
    } catch (error) {
      handleError(error);
      reject(false);
    }
  });
};

const getCarts = async () => {
  if (!localStorage.accessToken) {
    return;
  }
  dispatch({
    type: constants.GET_CARTS_REQUEST
  });
  try {
    let response = await get('viewUserCart');
    if (response && response.data && response.data.status === 'success') {
      dispatch({
        type: constants.GET_CARTS_SUCCESS,
        payload: response.data.data
      });
    }
  } catch (error) {
    dispatch({
      type: constants.GET_CARTS_FAILED
    });
    handleError(error);
  }
};

const deleteCartItem = async (data) => {
  dispatch({
      type: constants.DELETE_CART_ITEM_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('deleteGearFromCart', data);
      if (response && response.data && response.data.status === 'success') {
        dispatch({
          type: constants.DELETE_CART_ITEM_SUCCESS,
          payload: data.gearid
        });
        dispatch({
          type: constants.GET_FAVOURITES_SUCCESS,
          payload: response.data.data
        });
        handleInfo('Gear was removed from cart successfully');
      } else {
        resolve(false);
        handleError('Gear was not removed');
      }
    } catch (error) {
        handleError(error);
    }
  })
};

export {addCart, deleteCartItem, getCarts, editCart};