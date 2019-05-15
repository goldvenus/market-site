import axios from "axios";
import { tokenAxiosConfig, getAPIUrl, get, post} from '../api'
import { handleError, handleInfo } from './common.action'
import { getCarts } from "./cart.action";
import { getFavourites } from "./favourite.action";
import constants from "../types";
import store from '../../store';
const dispatch = store.dispatch;

const register = async (data) => {
  dispatch({
    type: constants.SIGNUP_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('signup', data);
      if (response.data.status === 'success') {
        dispatch({
          type: constants.SIGNUP_SUCCESS
        });
        handleInfo('You were registered successfully');
      } else {
        dispatch({
          type: constants.SIGNUP_FAILED
        });
        handleError(response.data.errorMessage);
      }
      resolve(response);
    } catch (error) {
      dispatch({
          type: constants.SIGNUP_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const login = async (data) => {
  dispatch({
      type: constants.LOGIN_REQUEST
  });

  let response = await post('signin', data);
  if (!!response && response.data.status === 'success') {
    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: response.data.data.userAttributes
    });
    handleInfo("Welcome to Creative Market!");
    // store the token
    const { accessToken, idToken, refreshToken } = response.data.data.tokens;
    localStorage.accessToken = accessToken;
    localStorage.idToken = idToken;
    localStorage.refreshToken = refreshToken;
    localStorage.userId = response.data.data.userAttributes.userid;
    console.log("login result: ", response.data.data.tokens);
    getCarts();
    getFavourites();
  } else {
    dispatch({
      type: constants.LOGIN_FAILED
    });
    let error = "";
    if (response && response.data.errorMessage)
      error = response.data.errorMessage;
    if (error)
      handleError(error);
  }
};

const logout = () => {
  delete localStorage.accessToken;
  delete localStorage.idToken;
  delete localStorage.refreshToken;
  delete localStorage.userid;

  dispatch({
    type: constants.USER_LOGOUT,
    payload: null
  });
};

const updateUser = async (data) => {
  dispatch({
      type: constants.UPDATE_USER_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('updateUser', data);
      if (response.data.status === 'success') {
        dispatch({
          type: constants.UPDATE_USER_SUCCESS,
          payload: response.data.data
        });
        handleInfo('Updated successfully!');
      } else {
        dispatch({
          type: constants.UPDATE_USER_FAILED
        });
        handleError(response.data.errorMessage);
      }
      resolve(response);
    } catch (error) {
      dispatch({
        type: constants.SIGNUP_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const updatePassword = async (data) => {
  dispatch({
      type: constants.RESET_PWD_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await post('updatePassword', data);
      if (response.data.status === 'success') {
        dispatch({
          type: constants.RESET_PWD_SUCCESS
        });
        handleInfo('Password was reset successfully!');
      } else {
        dispatch({
          type: constants.RESET_PWD_FAILED
        });
        handleError(response.data.errorMessage);
      }
      resolve(response);
    } catch (error) {
      dispatch({
        type: constants.SIGNUP_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const sendResetPasswordEmail = async (data) => {
  dispatch({
    type: constants.RESET_PWD_REQUEST
  });
  try {
    let response = await post('sendCodeForgotPaswordUser', data);
    if(response && response.data.status === 'success') {
      dispatch({
        type: constants.RESET_PWD_SUCCESS
      });
      handleError("Successfully Send!");
      return true;
    }
    dispatch({
      type: constants.RESET_PWD_FAILED,
    });
    if (response && response.data.errorMessage)
      handleError(response.data.errorMessage.message);
    return false;
  } catch (error) {
    dispatch({
      type: constants.RESET_PWD_FAILED
    });
    return false;
  }
};

const confirmResetPassword = async (data) => {
  try {
    if(data.password !== data.password_new) {
      handleError('Passwords don\'t match');
      return;
    }

    let response = await post('confirmForgotPasswordUser', data);
    if(response && response.status === 200) {
      return true;
    }
    handleError('Something went wrong');
    return false
  } catch(error) {
    handleError(error);
    return false
  }
};

const refreshToken = async () => {
  try {
    let config = tokenAxiosConfig();
    let response = await axios.post(getAPIUrl('getUserRefreshTokens'), { username: localStorage.userId }, config);
    if (response && response.data && response.data.status === 'success') {
      const { accessToken, idToken, refreshToken } = response.data.data;
      localStorage.accessToken = accessToken.jwtToken;
      localStorage.idToken = idToken.jwtToken;
      localStorage.refreshToken = refreshToken.token;
      return response;
    } else {
      // when expired
      logout();
      delete localStorage.accessToken;
      delete localStorage.idToken;
      delete localStorage.refreshToken;
      // window.location.href = '/home';
    }
  } catch (error) {
    handleError(error);
  }
};

const getUser = async () => {
  try {
    if (localStorage.accessToken) {
      let token = await refreshToken();
      if (token) {
        let response = await get('getUserInfo');
        if (response && response.data && response.data.status && response.data.status === 'success') {
          dispatch({
            type: constants.GET_USER_SUCCESS,
            payload: response.data.data.userAttributes
          });
        }
      }
    }
  } catch (error) {
    handleError(error);
  }
};

const socialLogin = async (idToken, accessToken) => {
  dispatch({
    type: constants.LOGIN_REQUEST
  });
  try {
    localStorage.idToken = idToken;
    localStorage.accessToken = accessToken;
    let response = await get('socialProviderTokenExchange');
    if (response && response.data) {
      dispatch({
        type: constants.LOGIN_SUCCESS,
        payload: response.data.userAttributes
      });
      handleInfo("Welcome to Creative Market!");
      // store the token
      const { accessToken, idToken, refreshToken } = response.data.tokens;
      localStorage.accessToken = accessToken;
      localStorage.idToken = idToken;
      localStorage.refreshToken = refreshToken;
      return response;
    }
  } catch (error) {
    dispatch({
      type: constants.LOGIN_FAILED
    });
    handleError(error);
  }
};

const confirmUser = async (username, confirmationCode) => {
  dispatch({
    type: constants.CONFIRM_USER_REQUEST
  });
  try {
    let response = await post('confirmUser', { username, confirmationCode });
    dispatch({
      type: constants.CONFIRM_USER_SUCCESS
    });
    return response;
  } catch (error) {
    dispatch({
      type: constants.CONFIRM_USER_FAILED,
    });
    handleError(error);
  }
};

export {
  login,
  logout,
  getUser,
  updateUser,
  updatePassword,
  register,
  confirmUser,
  refreshToken,
  socialLogin,
  confirmResetPassword,
  sendResetPasswordEmail,
}