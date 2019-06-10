import producer from 'immer'; //Immutability Library
import constants from "../types";

const initialState = {
  isAuthorizing: false,
  isAuthenticated: false,
  isRegistering: false,
  isRegistered: false,
  isRegisteringFailed: false,
  isSendingFWDEmail: false,
  isSentFWDEmail: false,
  isSendingFWDEmailFailed: false,
  isConfirmingFWD: false,
  isConfirmedFWD: false,
  isConfirmingFWDFailed: false,
  isLoading: false,
  isUpdating: false,
  user: null
};

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case constants.LOGIN_REQUEST:
        draft.isAuthorizing = true;
        break;
      case constants.LOGIN_SUCCESS:
        draft.user = action.payload;
        draft.isAuthenticated = true;
        draft.isAuthorizing = false;
        break;
      case constants.LOGIN_FAILED:
        draft.isAuthenticated = false;
        draft.isAuthorizing = false;
        break;
      
      case constants.SIGNUP_REQUEST:
        draft.isRegistering = true;
        draft.isRegistered = false;
        draft.isRegisteringFailed = false;
        break;
      case constants.SIGNUP_SUCCESS:
        draft.isRegistering = false;
        draft.isRegistered = true;
        draft.isRegisteringFailed = false;
        break;
      case constants.SIGNUP_FAILED:
        draft.isRegistering = false;
        draft.isRegistered = false;
        draft.isRegisteringFailed = true;
        break;
      
      case constants.GET_USER_REQUEST:
        draft.isLoading = true;
        break;
      case constants.GET_USER_SUCCESS:
        draft.user = action.payload;
        draft.isLoading = false;
        draft.isAuthenticated = true;
        break;
      case constants.GET_USER_FAILED:
        draft.isLoading = false;
        break;
      
      case constants.UPDATE_USER_REQUEST:
        draft.isUpdating = true;
        break;
      case constants.UPDATE_USER_SUCCESS:
        draft.isUpdating = false;
        draft.user = {...draft.user, ...action.payload};
        break;
      case constants.UPDATE_USER_FAILED:
        draft.isUpdating = false;
        break;
      
      case constants.RESET_PWD_REQUEST:
        draft.isSendingFWDEmail = true;
        draft.isSentFWDEmail = false;
        draft.isSendingFWDEmailFailed = false;
        break;
      case constants.RESET_PWD_SUCCESS:
        draft.isSendingFWDEmail = false;
        draft.isSentFWDEmail = true;
        draft.isSendingFWDEmailFailed = false;
        break;
      case constants.RESET_PWD_FAILED:
        draft.isSendingFWDEmail = false;
        draft.isSentFWDEmail = false;
        draft.isSendingFWDEmailFailed = true;
        break;
      
      case constants.USER_LOGOUT:
        draft.user = null;
        draft.isAuthenticated = false;
        break;
      
      case constants.CONFIRM_USER_REQUEST:
        draft.isLoading = true;
        break;
      case constants.CONFIRM_USER_SUCCESS:
        draft.isLoading = false;
        break;
      case constants.CONFIRM_USER_FAILED:
        draft.isLoading = false;
        break;
      
      default:
        break;
    }
  });
}