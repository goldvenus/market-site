import producer from 'immer';
import constants from "../types";

const initialState = {
    isAuthorizing: false,
    isAuthenticated: false,
    isLoading: false,
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

            case constants.USER_LOGOUT:
                draft.user = null;
                draft.isAuthenticated = false;
                break;
            default:
                break;
        }
    });
}