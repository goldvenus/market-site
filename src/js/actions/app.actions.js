import axios from 'axios';
import { API_URL, API_URL_NEW, ACTIONS } from '../constants';
import store from '../store';
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
}

const getAPIUrl = (url) => API_URL + url;

const handleError = (error) => {
  dispatch({
    type: ACTIONS.ERROR,
    payload: error || "Something went wrong"
  });
}

const clearError = () => {
  dispatch({
    type: ACTIONS.REMOVE_ERROR,
    payload: null
  });
}

const get = async (url) => {
  return await axios.get(getAPIUrl(url), axiosConfig()).then((res) => res)
    .catch(err => {
      handleError(err.response && err.response.data.errorMessage)
    });
}

const get_new = async (url) => {
  return await axios.get(API_URL_NEW + url, axiosConfig()).then((res) => res)
    .catch(err => {
      handleError(err.response && err.response.data.errorMessage)
    });
}

const post = async (url, data) => {
  return axios.post(getAPIUrl(url), data, axiosConfig()).then((res) => res)
    .catch(err => {
      handleError(err.response.data.errorMessage)
    });
}

const post_new = async (url, data) => {
  return axios.post(API_URL_NEW + url, data, axiosConfig()).then((res) => res)
    .catch(err => {
      handleError(err.response.data.errorMessage)
    });
}

const fetchCategories = () => {
  try {
    let response = axios.get(API_URL + 'getAllProductsCategory');
    dispatch({
      type: ACTIONS.FETCH_CATEGORIES,
      payload: response
    })
  }
  catch (error) {
    handleError(error);
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
}

const getUser = async () => {
  try {
    if (localStorage.accessToken) {
      let response = await get('getUserInfo');
      dispatch({
        type: ACTIONS.ERROR,
        payload: ""
      });
      if (response && response.data) {
        dispatch({
          type: ACTIONS.LOGGED_IN,
          payload: response.data.userAttributes
        });

        getCarts();
        getFavourites()
      }
    }
  } catch (error) {
    // handleError(error);
  }
}

const readFileData = (event) => {
  return new Promise((resolve, reject) => {
    let input = event.target;

    if (input && input.files.length > 0) {
      let fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve(event.target.result);
      }

      fileReader.onerror = (e) => reject("error");
      fileReader.readAsDataURL(input.files[0]);
    }
  });
}

const addGear = async (data) => {
  try {
    let response = await post('addGearItem', data);
    return response.data.status;
  } catch (error) {
    handleError(error);
  }
}

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
}

const logout = () => {
  delete localStorage.accessToken;
  delete localStorage.idToken;
  delete localStorage.refreshToken;

  dispatch({
    type: ACTIONS.LOGGED_OUT,
    payload: null
  });
}

const getGear = async (gearid) => {
  try {
    let response = await post('viewAddedGearItem', { gearid });
    dispatch({
      type: ACTIONS.GEAR,
      payload: response.data[0]
    });
  } catch (error) {
    handleError(error);
  }
}


const addCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('addGearIntoCart', data);
      resolve(response);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
}

const checkout = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('checkOut', data);
      resolve(response);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
}

const payment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('payment', data);
      resolve(response);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
}

const getCarts = async () => {
  try {
    let response = await get('viewUserCart');

    dispatch({
      type: ACTIONS.CARTS,
      payload: response.data
    });
  }
  catch (error) {
    handleError(error);
  }
}

const rentGearProductList = async (catDetail) => {
  try {
    let response = await post('showRentGearProductsList', catDetail)

    dispatch({
      type: ACTIONS.GEAR_PRODUCT_LIST,
      payload: response.data
    })

  }
  catch (error) {

    handleError(error);
  }
}

const dashboardMyListing = async () =>{
  try{
    let response = await get('userDashboardProductList');
    dispatch({
      type : ACTIONS.DASHBOARD_MY_LISTINGS,
      payload : response.data
    })
  }
  catch(error){
    handleError(error);
  }
}

const dashboardMyRentals = async () => {
  try {
    let response = await get('userDashboardRentalProductList');
    dispatch({
      type: ACTIONS.DASHBOARD_MY_RENTALS,
      payload: response.data
    })
  }
  catch (error) {
    handleError(error);
  }
}

const formatDate = (date) => {
  return date && moment(date).format('YYYY-MM-DD');
}

const days = (d1, d2) => { return moment(d2).diff(moment(d1), 'days') + 1 };

const confirmUser = async (username, confirmationCode) => {
  try {
    let response = await post('confirmUser', {username, confirmationCode});
    return response;
  }
  catch (error) {
    handleError(error);
  }
}


const search = async (brand, product_region) => {
  try {
    let response = await post_new('showHomePageSearch', {
      brand,
      product_region
    })

    if(response) {
      dispatch({
        type: ACTIONS.SEARCH_RESULTS,
        payload: response.data
      })
    }
  }
  catch (error) {
    handleError(error);
  }
}

const addFavourites = async (data) => {
  try {
    let response = await post_new('addUserFavouriteGear', data);
    return response;
  } catch (error) {
    handleError(error);
  }
}

const getFavourites = async () => {
  try {
    let response = await get_new('viewUserFavouriteGear');

    if(response) {
      dispatch({
        type: ACTIONS.FAVOURITES,
        payload: response.data
      });
    }
  }
  catch (error) {
    handleError(error);
  }
}

const deleteFavourite = async (data) => {
  try {
    let response = await post_new('deleteUserFavouriteGear', data);
    return response;
  } catch (error) {
    handleError(error);
  }
}


const newArrivals = async () => {
  try {
    let response = await get_new('viewNewArrivalGears');

    if(response) {
      dispatch({
        type: ACTIONS.NEW_ARRIVALS,
        payload: response.data
      });
    }
  }
  catch (error) {
    handleError(error);
  }
}

export { register, confirmUser, login, logout, clearError, handleError, getUser,
    readFileData, addGear, fetchCategories, getListGears, getGear, addCart, getCarts,
    formatDate, days, checkout, payment, rentGearProductList, dashboardMyListing,
    dashboardMyRentals, search, addFavourites, getFavourites, deleteFavourite, newArrivals}
