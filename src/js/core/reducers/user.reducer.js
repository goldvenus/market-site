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
    user: null,
    errMsg: null
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
                draft.errMsg = action.payload;
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
                draft.errMsg = action.payload;
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
                draft.errMsg = action.payload;
                break;

            case constants.USER_LOGOUT:
                draft.user = null;
                draft.isAuthenticated = false;

                break;
            default:
                break;
        }
    });
}