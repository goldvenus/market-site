import producer from 'immer';
import constants from "../types";
import {getUniqueObjectArray} from "../helper";

const initialState = {
    carts: null,
    isLoading: false,
    isDeleting: false
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.ADD_TO_CART_REQUEST:
                draft.isLoading = true;
                break;
            case constants.ADD_TO_CART_SUCCESS:
                draft.carts = getUniqueObjectArray([...draft.carts, action.payload]);
                draft.isLoading = false;
                break;
            case constants.ADD_TO_CART_FAILED:
                draft.isLoading = false;
                break;

            case constants.GET_CARTS_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_CARTS_SUCCESS:
                draft.carts = action.payload;
                draft.isLoading = false;
                break;
            case constants.GET_CARTS_FAILED:
                draft.isLoading = false;
                break;

            case constants.DELETE_CART_ITEM_REQUEST:
                draft.isDeleting = true;
                break;
            case constants.DELETE_CART_ITEM_SUCCESS:
                draft.carts = draft.carts.filter(item => item.gearid !== action.payload);
                draft.isDeleting = false;
                console.log(draft.carts);
                break;
            case constants.DELETE_CART_ITEM_FAILED:
                draft.isDeleting = false;
                break;

            default:
                break;
        }
    });
}
