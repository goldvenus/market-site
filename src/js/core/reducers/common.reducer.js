import producer from 'immer';
import constants from "../types";

const initialState = {
    errorMsg: null,
    isLoading: false,
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.ERROR:
                draft.errorMsg = action.payload;
                break;

            case constants.CLEAR_ERROR:
                draft.errorMsg = null;
                break;

            default:
                break;
        }
    });
}
