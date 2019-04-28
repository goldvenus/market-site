import producer from 'immer'; //Immutability Library
import constants from "../types";

const initialState = {
    isAuthorizing: false,
    isAuthenticated: false,
    isRegistering: false,
    isRegistered: false,
    isRegisteringFailed: false,
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

            case constants.USER_LOGOUT:
                draft.user = null;
                draft.isAuthenticated = false;

                break;
            default:
                break;
        }
    });
}