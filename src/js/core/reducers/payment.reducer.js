import producer from 'immer';
import constants from "../types";

const initialState = {
    isLoading: false,
};

export default (state = initialState, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case constants.DO_PAYMENT_REQUEST:
                draft.isLoading = true;
                break;
            case constants.DO_PAYMENT_SUCCESS:
                draft.isLoading = false;
                break;
            case constants.DO_PAYMENT_FAILED:
                draft.isLoading = false;
                break;

            case constants.GET_PAID_ITEMS_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_PAID_ITEMS_SUCCESS:
                draft.isLoading = false;
                break;
            case constants.GET_PAID_ITEMS_FAILED:
                draft.isLoading = false;
                break;

            case constants.GET_PAY_CARDS_REQUEST:
                draft.isLoading = true;
                break;
            case constants.GET_PAY_CARDS_SUCCESS:
                draft.isLoading = false;
                break;
            case constants.GET_PAY_CARDS_FAILED:
                draft.isLoading = false;
                break;

            default:
                break;
        }
    })
}
