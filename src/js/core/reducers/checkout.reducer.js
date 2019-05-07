import producer from 'immer';
import constants from "../types";

const initialState = {
    isLoading: false,
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.GET_CHECKOUT_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_CHECKOUT_SUCCESS:
                draft.isLoading = false;
                break;
            case constants.GET_CHECKOUT_FAILED:
                draft.isLoading = false;
                break;

            default:
                break;
        }
    })
}
