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
                console.log("1111");
                draft.isLoading = true;
                break;
            case constants.GET_CATEGORIES_SUCCESS:
                draft.categories = action.payload;
                console.log("2222");
                draft.isLoading = false;
                break;
            case constants.GET_CATEGORIES_FAILED:
                console.log("3333");
                draft.isLoading = false;
                break;

            default:
                break;
        }
    })
}
