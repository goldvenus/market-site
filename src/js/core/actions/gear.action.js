import constants from "../types";
import {handleError, handleInfo} from "./common.action";
import {post, get} from "../api/index";
import store from '../../store';

const dispatch = store.dispatch;

const addGear = async (data) => {
  dispatch({
    type: constants.ADD_GEAR_REQUEST,
  });
  let res = await post('addGearItem', data);
  if (res && res.data && res.data.status === 'success') {
    dispatch({
      type: constants.ADD_GEAR_SUCCESS,
      payload: res.data.data
    });
    handleInfo('Gear was added successfully');
    return res.data.data;
  } else {
    handleError('Failed to add gear');
    return false;
  }
};

const editGear = async (data) => {
  dispatch({
    type: constants.EDIT_GEAR_REQUEST,
  });
  try {
    let res = await post('editGearItem', data);
    if (res && res.data && res.data.status === 'success') {
      dispatch({
        type: constants.EDIT_GEAR_SUCCESS,
        payload: res.data.data
      });
      handleInfo('Gear was edited');
      return true;
    } else {
      handleError('Gear editing was failed');
      return false;
    }
  } catch (error) {
    handleError(error);
  }
};

const getGear = async (gearid) => {
  dispatch({
    type: constants.GET_GEAR_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let res = await post('viewAddedGearItem', {gearid});
      if (res && res.data && res.data.status === 'success') {
        dispatch({
          type: constants.GET_GEAR_SUCCESS,
          payload: res.data.data
        });
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      dispatch({
        type: constants.GET_GEAR_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const getListGears = async () => {
  dispatch({
    type: constants.LIST_GEARS_REQUEST
  });
  try {
    let res = await get('viewUserGearList');
    if (res && res.data && res.data.status === 'success') {
      dispatch({
        type: constants.LIST_GEARS_SUCCESS,
        payload: res.data.data
      });
    }
  } catch (error) {
    dispatch({
      type: constants.LIST_GEARS_FAILED
    });
    handleError(error);
  }
};

// const getUsedNames = async () => {
//   try {
//     let res = await get('getGearUsedNames');
//     if (res && res.data && res.data.status === 'success') {
//       return res.data.data;
//     }
//     return false;
//   } catch (error) {
//     handleError(error);
//     return false;
//   }
// };

const rentGearProductList = async (catDetail) => {
  if (!localStorage.accessToken) {
    return;
  }
  dispatch({
    type: constants.SEARCH_PRODUCTS_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let res = await post('showRentGearProductsList', catDetail);
      if (res && res.data && res.data.status === 'success') {
        dispatch({
          type: constants.SEARCH_PRODUCTS_SUCCESS,
          payload: res.data.data
        });
        resolve(res.data.data);
      } else {
        res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
        dispatch({
          type: constants.SEARCH_PRODUCTS_FAILED
        });
        resolve(false);
      }
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

// const newArrivals = async () => {
//   dispatch({
//     type: constants.NEW_ARRIVALS_REQUEST,
//   });
//   try {
//     let res = await get('viewNewArrivalGears');
//
//     if (res) {
//       dispatch({
//         type: constants.NEW_ARRIVALS_SUCCESS,
//         payload: res.data
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: constants.NEW_ARRIVALS_FAILED,
//     });
//     handleError(error);
//   }
// };

const deleteGear = async (data) => {
  dispatch({
    type: constants.DELETE_GEAR_REQUEST
  });
  return new Promise(async (resolve) => {
    try {
      let res = await post('deleteUserGear', data);
      if (res && res.data && res.data.status === 'success') {
        dispatch({
          type: constants.DELETE_GEAR_SUCCESS,
          payload: data.gearid
        });
        handleInfo('Gear was removed successfully');
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      dispatch({
        type: constants.DELETE_GEAR_FAILED
      });
      handleError(error);
    }
  });
};

export {
  addGear, deleteGear, getGear, rentGearProductList, getListGears, editGear
};