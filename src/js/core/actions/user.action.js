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
      let res = await post('signup', data);
      if (res.data.status === 'success') {
        dispatch({
          type: constants.SIGNUP_SUCCESS
        });
        handleInfo('You were registered successfully');
      } else {
        dispatch({
          type: constants.SIGNUP_FAILED
        });
        handleError(res.data.errorMessage);
      }
      resolve(res);
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

  let res = await post('signin', data);
  if (!!res && res.data.status === 'success') {
    // store the token
    const { accessToken, idToken, refreshToken } = res.data.data.tokens;
    localStorage.accessToken = accessToken;
    localStorage.idToken = idToken;
    localStorage.refreshToken = refreshToken;
    localStorage.userId = res.data.data.userAttributes.userid;
    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: res.data.data.userAttributes
    });
    getCarts();
    getFavourites();
  } else {
    dispatch({
      type: constants.LOGIN_FAILED
    });
    let error = "";
    if (res && res.data && res.data.errorMessage)
      error = res.data.errorMessage;
    if (error)
      handleError(error);
  }
};

const logout = () => {
  delete localStorage.accessToken;
  delete localStorage.idToken;
  delete localStorage.refreshToken;
  delete localStorage.userId;
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
      let res = await post('updateUser', data);
      if (res.data.status === 'success') {
        dispatch({
          type: constants.UPDATE_USER_SUCCESS,
          payload: res.data.data
        });
        handleInfo('Updated successfully!');
      } else {
        dispatch({
          type: constants.UPDATE_USER_FAILED
        });
        handleError(res.data.errorMessage);
      }
      resolve(res);
    } catch (error) {
      dispatch({
        type: constants.SIGNUP_FAILED
      });
      handleError(error);
      reject(error);
    }
  });
};

const redirectToSignIn = (history) => {
  history.push(`/login?redirect=${window.location.pathname + window.location.search}`);
};

const updatePassword = async (data) => {
  dispatch({
      type: constants.RESET_PWD_REQUEST
  });
  return new Promise(async (resolve, reject) => {
    try {
      let res = await post('updatePassword', data);
      if (res.data.status === 'success') {
        dispatch({
          type: constants.RESET_PWD_SUCCESS
        });
        handleInfo('Password was reset successfully!');
      } else {
        dispatch({
          type: constants.RESET_PWD_FAILED
        });
        handleError(res.data.errorMessage);
      }
      resolve(res);
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
    let res = await post('sendCodeForgotPaswordUser', data);
    if(res && res.data && res.data.status === 'success') {
      dispatch({
        type: constants.RESET_PWD_SUCCESS
      });
      handleInfo("Verification code was sent successfully");
      return true;
    }
    dispatch({
      type: constants.RESET_PWD_FAILED,
    });
    if (res && res.data.errorMessage)
      handleError(res.data.errorMessage.message);
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

    let res = await post('confirmForgotPasswordUser', data);
    if(res && res.status === 200) {
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
    let res = await axios.post(getAPIUrl('getUserRefreshTokens'), { username: localStorage.userId }, config);
    console.log("refresh token: ", res);
    if (res && res.data && res.data.status === 'success') {
      const { accessToken, idToken, refreshToken } = res.data.data;
      localStorage.accessToken = accessToken.jwtToken;
      localStorage.idToken = idToken.jwtToken;
      localStorage.refreshToken = refreshToken.token;
      return res;
    } else {
      // when expired
      logout();
    }
  } catch (error) {
    handleError(error);
  }
};

const getUser = async (data) => {
  try {
    if (localStorage.accessToken) {
      // let token = await refreshToken();
      // if (token) {
        dispatch({
          type: constants.GET_USER_REQUEST
        });
        let res = await post('getUserInfo', data);
        if (res && res.data && res.data.status && res.data.status === 'success') {
          dispatch({
            type: constants.GET_USER_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: constants.GET_USER_FAILED
          });
        }
      // }
    }
  } catch (error) {
    handleError(error);
  }
};

const getUserByID = async (data) => {
  try {
    let res = await post('getUserInfo', data);
    if (res && res.data && res.data.status && res.data.status === 'success') {
      return res.data.data;
    } else {
      return false;
    }
  }
  catch (error) {
  }
};

const socialLogin = async (idToken, accessToken) => {
  dispatch({
    type: constants.LOGIN_REQUEST
  });
  try {
    localStorage.idToken = idToken;
    localStorage.accessToken = accessToken;
    let res = await get('socialProviderTokenExchange');
    if (res && res.data && res.data.status ==='success') {
      dispatch({
        type: constants.LOGIN_SUCCESS,
        payload: res.data.data.userAttributes
      });
      handleInfo("Welcome to Creative Market!");
      // store the token
      const { accessToken, idToken, refreshToken } = res.data.tokens;
      localStorage.accessToken = accessToken;
      localStorage.idToken = idToken;
      localStorage.refreshToken = refreshToken;
      return res;
    }
  } catch (error) {
    dispatch({
      type: constants.LOGIN_FAILED
    });
    handleError(error);
  }
};

const confirmUser = async (username, confirmationCode, fullName) => {
  dispatch({
    type: constants.CONFIRM_USER_REQUEST
  });
  try {
    let res = await post('confirmUser', { username, confirmationCode, fullName });
    dispatch({
      type: constants.CONFIRM_USER_SUCCESS
    });
    res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
    return res;
  } catch (error) {
    dispatch({
      type: constants.CONFIRM_USER_FAILED,
    });
    handleError(error);
  }
};

const createMangoAccount = async (data) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: constants.MANGO_ACCOUNT_CREATE_REQUEST
    });
    try {
      let res = await post('doKycValidation', data);
      if (res && res.data && res.data.status && res.data.status === 'success') {
        dispatch({
          type: constants.MANGO_ACCOUNT_CREATE_SUCCESS
        });
        resolve(res.data.data);
      } else {
        dispatch({
          type: constants.MANGO_ACCOUNT_CREATE_FAILED
        });
        res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
        resolve(false);
      }
      return res;
    } catch (error) {
      dispatch({
        type: constants.MANGO_ACCOUNT_CREATE_FAILED
      });
      handleError(error);
      resolve(false);
    }
  });
};

const doKycValidation = async (data) => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: constants.KYC_VALIDATION_REQUEST
    });
    try {
      let res = await post('doKycValidation', data);
      if (res && res.data && res.data.status && res.data.status === 'success') {
        dispatch({
          type: constants.KYC_VALIDATION_SUCCESS
        });
        resolve(true);
      } else {
        dispatch({
          type: constants.KYC_VALIDATION_FAILED
        });
        res && res.data && res.data.errorMessage && handleError(res.data.errorMessage);
        resolve(false);
      }
      return res;
    } catch (error) {
      dispatch({
        type: constants.KYC_VALIDATION_FAILED
      });
      handleError(error);
      resolve(false);
    }
  });
};

export {
  login,
  logout,
  redirectToSignIn,
  getUser,
  getUserByID,
  updateUser,
  updatePassword,
  register,
  confirmUser,
  refreshToken,
  socialLogin,
  confirmResetPassword,
  sendResetPasswordEmail,
  createMangoAccount,
  doKycValidation
}