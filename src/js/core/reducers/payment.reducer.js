import producer from 'immer';
import constants from "../types";

const initialState = {
  isLoading: false,
  isLoadingMethod: false,
  isLoadingHistory: false,
  isChanging: false,
  paymentMethods: [],
  transactions: []
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
        
      case constants.GET_METHODS_REQUEST:
        draft.isLoadingMethod = true;
        break;
      case constants.GET_METHODS_SUCCESS:
        draft.isLoadingMethod = false;
        draft.paymentMethods = action.payload;
        break;
      case constants.GET_METHODS_FAILED:
        draft.isLoadingMethod = false;
        break;

      case constants.SAVE_METHOD_REQUEST:
        draft.isChanging = true;
        break;
      case constants.SAVE_METHOD_SUCCESS:
        draft.isChanging = false;
        draft.paymentMethods = [...draft.paymentMethods, action.payload];
        break;
      case constants.SAVE_METHOD_FAILED:
        draft.isChanging = false;
        break;
  
      case constants.REMOVE_METHOD_REQUEST:
        draft.isChanging = true;
        break;
      case constants.REMOVE_METHOD_SUCCESS:
        draft.isChanging = false;
        draft.paymentMethods = draft.paymentMethods.filter(item => item.methodId !== action.payload);
        break;
      case constants.REMOVE_METHOD_FAILED:
        draft.isChanging = false;
        break;
        
      case constants.GET_TRANSACTIONS_REQUEST:
        draft.isLoadingHistory = true;
        break;
      case constants.GET_TRANSACTIONS_SUCCESS:
        draft.isLoadingHistory = false;
        draft.transactions = action.payload;
        break;
      case constants.GET_TRANSACTIONS_FAILED:
        draft.isLoadingHistory = false;
        break;
  
      default:
        break;
    }
  })
}
