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

const getAPIUrl = (url) => API_URL + url;

const handleError = (error) => {
  dispatch({
    type: ACTIONS.ERROR,
    payload: error || 'Something went wrong'
  });
};

const clearError = () => {
  dispatch({
    type: ACTIONS.REMOVE_ERROR,
    payload: null
  });
};

const get = async (url) => {
  return await axios.get(getAPIUrl(url), axiosConfig()).then((res) => res)
    .catch(err => {
      //handleError(err.response && err.response.data.errorMessage)
    });
};

const get_new = async (url) => {
  return await axios.get(API_URL_NEW + url, axiosConfig()).then((res) => res)
    .catch(err => {
      //handleError(err.response && err.response.data.errorMessage)
    });
};

const post = async (url, data) => {
  return axios.post(getAPIUrl(url), data, axiosConfig()).then((res) => res)
    .catch(err => {
      handleError(err.response.data.errorMessage);
    });
};

const post_new = async (url, data) => {
  return axios.post(API_URL_NEW + url, data, axiosConfig()).then((res) => res)
    .catch(err => {
      handleError(err.response.data.errorMessage);
    });
};

const fetchCategories = () => {
  try {
    let response = axios.get(API_URL + 'getAllProductsCategory');
    dispatch({
      type: ACTIONS.FETCH_CATEGORIES,
      payload: response
    });
  } catch (error) {
    handleError(error);
  }
};

const refreshToken = async () => {
  try {
    let response = await axios.post(getAPIUrl('getUserRefreshTokens'), { username: localStorage.userId }, tokenAxiosConfig());

    if (response && response.data) {
      const { accessToken, idToken, refreshToken, userName } = response.data;
      localStorage.accessToken = accessToken.jwtToken;
      localStorage.idToken = idToken.jwtToken;
      localStorage.refreshToken = refreshToken.token;
      localStorage.username = userName;
      return response;
    }
  } catch (error) {
    // handleError(error);
  }
};

const getUser = async () => {
  try {
    if (localStorage.accessToken) {
      const token = await refreshToken();
      if (token) {
        let response = await get('getUserInfo');
        dispatch({
          type: ACTIONS.ERROR,
          payload: ''
        });
        if (response && response.data) {
          dispatch({
            type: ACTIONS.LOGGED_IN,
            payload: response.data.userAttributes
          });

          getCarts();
          getFavourites();
          fetchCategories();
        }
      }
    }
  } catch (error) {
    // handleError(error);
  }
};

const readFileData = (event) => {
  return new Promise((resolve, reject) => {
    let input = event.target;

    if (input && input.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve(event.target.result);
      };

      fileReader.onerror = (e) => reject('error');
      fileReader.readAsDataURL(input.files[0]);
    }
  });
};

const addGear = async (data) => {
  try {
    let response = await post('addGearItem', data);
    return response.data.status;
  } catch (error) {
    handleError(error);
  }
};

const getListGears = async () => {
  try {
    let response = await get('viewUserGearList');
    if (response && response.data) {
      dispatch({
        type: ACTIONS.LIST_GEARS,
        payload: response.data.Items
      });
    }
  } catch (error) {
    handleError(error);
  }
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

const addCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('addGearIntoCart', data);
      if (response.data.status === 'success') {
        dispatch({
          type: ACTIONS.ADD_TO_CART,
          payload: response.data.data
        });
      }
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const checkout = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('docheckout', data);
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const getCheckout = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getcheckout', {user_id: data});
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const payment = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let param = data;
      param.email = localStorage.userEmail;
      let response = await post('dopayment', param);
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const getPaymentCards = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getpaycards', {user_id: data});
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const getPaidItems = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getpaiditems', data);
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const getCarts = async () => {
  try {
    let response = await get('viewUserCart');

    dispatch({
      type: ACTIONS.CARTS,
      payload: response.data
    });
  } catch (error) {
    handleError(error);
  }
};

const getOrderHistory = async () => {
    try {
        let response = await get('getorderhistory');
        if (response.data.status === 'success') {
            dispatch({
                type: ACTIONS.ORDER_HISTORY,
                payload: response.data.data
            });
        }
    } catch (error) {
        handleError(error);
    }
};

const getOrderDetail = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await post('getorderdetail', data);
            if (response.data.status === 'success') {
                resolve(response.data.data);
            } else {
                reject(false);
            }
        } catch (error) {
            handleError(error);
            reject(false);
        }
    });
};

const rentGearProductList = async (catDetail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('showRentGearProductsList', catDetail);
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

const dashboardMyListing = async () => {
  try {
    let response = await get('viewUserGearList');
    if (response && response.data) {
      dispatch({
        type:ACTIONS.DASHBOARD_MY_LISTINGS,
        payload: response.data.Items
      });
    }
  } catch (error) {
    handleError(error);
  }
};

const dashboardMyRentals = async () => {
  try {
    let response = await get('userDashboardRentalProductList');
    dispatch({
      type: ACTIONS.DASHBOARD_MY_RENTALS,
      payload: response.data
    });
  } catch (error) {
    handleError(error);
  }
};

const formatDate = (date) => {
  return date && moment(date).format('YYYY-MM-DD');
};

const days = (d1, d2) => { return moment(d2).diff(moment(d1), 'days') + 1; };

const confirmUser = async (username, confirmationCode) => {
  try {
    let response = await post('confirmUser', { username, confirmationCode });
    return response;
  } catch (error) {
    handleError(error);
  }
};

const search = async (brand, product_region) => {
  try {
    let response = await post_new('showHomePageSearch', {
      brand,
      product_region
    });

    if (response) {
      dispatch({
        type: ACTIONS.SEARCH_RESULTS,
        payload: response.data
      });
    }
  } catch (error) {
    handleError(error);
  }
};

const addFavourites = async (data) => {
  try {
    let response = await post_new('addUserFavouriteGear', data);

    // here must be some code for state change
    return response;
  } catch (error) {
    handleError(error);
  }
};

const getFavourites = async () => {
  try {
    let response = await get_new('viewUserFavouriteGear');
    if (response) {
      dispatch({
        type: ACTIONS.FAVOURITES,
        payload: response.data
      });
    }
  } catch (error) {
    handleError(error);
  }
};

const viewUserDashboard = async () => {
  try {
    let response = await get('viewUserDashboard');

    if (response) {
      dispatch({
        type: ACTIONS.DASHBOARD,
        payload: response.data
      });
    }
  } catch (error) {
    //handleError(error);
  }
};

const deleteFavourite = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post_new('deleteUserFavouriteGear', data);
      if (response.data.status === 'success') {
        dispatch({
          type: ACTIONS.DELETE_FAVOR_ITEM,
          payload: data.gearid
        });
      } else {
        resolve(false);
      }
    } catch (error) {
      handleError(error);
    }
  });
};

const newArrivals = async () => {
  try {
    let response = await get_new('viewNewArrivalGears');

    if (response) {
      dispatch({
        type: ACTIONS.NEW_ARRIVALS,
        payload: response.data
      });
    }
  } catch (error) {
    handleError(error);
  }
};

const deleteCartItem = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('deleteGearFromCart', data);
      if (response.data.status === 'success') {
        dispatch({
          type: ACTIONS.DELETE_CART_ITEM,
          payload: data.gearid
        });
      } else {
        resolve(false);
      }
    } catch (error) {
      handleError(error);
    }
  });
};

const deleteGear = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post_new('deleteUserGear', data);
      if (response) {
        dispatch({
          type: ACTIONS.DELETE_GEAR,
          payload: data.gearid
        });
        resolve(response.status);
      } else {

      }
    } catch (error) {
      handleError(error);
    }
  });
};

const socialLogin = async (idToken, accessToken) => {
  try {
    localStorage.idToken = idToken;
    localStorage.accessToken = accessToken;

    let response = await get_new('socialProviderTokenExchange');

    if (response && response.data) {
      dispatch({
        type: ACTIONS.LOGGED_IN,
        payload: response.data.userAttributes
      });

      // store the token
      const { accessToken, idToken, refreshToken } = response.data.tokens;
      localStorage.accessToken = accessToken;
      localStorage.idToken = idToken;
      localStorage.refreshToken = refreshToken;

      return response;
    }
  } catch (error) {
    handleError(error);
  }
};

const getGearRentState = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('getGearRentState', data);
      resolve(response.data.data);
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
      resolve(response.data);
    } catch (error) {
      handleError(error);
      reject(false);
    }
  });
};

export {
  confirmUser, handleError, getUser,
  readFileData, fetchCategories, addCart, getCarts, deleteCartItem,
  search, addFavourites, getFavourites, deleteFavourite, newArrivals,
  formatDate, days,
  viewUserDashboard, dashboardMyListing, dashboardMyRentals, getGearRentState, setBlockPeriod, getOrderHistory, getOrderDetail,
  socialLogin,
  getListGears, getAllGears, getGear, addGear, deleteGear, rentGearProductList,
  checkout, getCheckout, payment, getPaymentCards, getPaidItems
};