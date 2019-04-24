import producer from 'immer'; //Immutability Library
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
                    draft.isLoading = true;
            case constants.LOGIN_SUCCESS:
                return {
                    isAuthenticated: true,
                    isAuthorizing: false,
                    isLoading: false
                }
        }
    });
}