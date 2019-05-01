import producer from 'immer';
import constants from "../types";

const initialState = {
    categories: null,
    isLoading: false,
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.GET_CATEGORIES_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_CATEGORIES_SUCCESS:
                draft.categories = action.payload;
                draft.isLoading = false;
                break;
            case constants.GET_CATEGORIES_FAILED:
                draft.isLoading = false;
                break;

            default:
                break;
        }
    })
}
