import producer from 'immer';
import constants from "../types";

const initialState = {
  dashboard: null,
  userListings: null,
  userRentals: null,
  orderHistories: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case constants.GET_USER_DASHBOARD_REQUEST:
        draft.isLoading = true;
        break;
      case constants.GET_USER_DASHBOARD_SUCCESS:
        draft.dashboard = action.payload;
        draft.isLoading = false;
        break;
      case constants.GET_USER_DASHBOARD_FAILED:
        draft.isLoading = false;
        break;
      
      case constants.GET_MY_LISTINGS_REQUEST:
        draft.isLoading = true;
        break;
      case constants.GET_MY_LISTINGS_SUCCESS:
        draft.userListings = action.payload;
        draft.isLoading = false;
        break;
      case constants.GET_MY_LISTINGS_FAILED:
        draft.isLoading = false;
        break;
      
      case constants.GET_MY_RENTALS_REQUEST:
        draft.isLoading = true;
        break;
      case constants.GET_MY_RENTALS_SUCCESS:
        draft.userRentals = action.payload;
        draft.isLoading = false;
        break;
      case constants.GET_MY_RENTALS_FAILED:
        draft.isLoading = false;
        break;
      
      case constants.GET_ORDER_HISTORY_REQUEST:
        draft.isLoading = true;
        break;
      case constants.GET_ORDER_HISTORY_SUCCESS:
        draft.orderHistories = action.payload;
        draft.isLoading = false;
        break;
      case constants.GET_ORDER_HISTORY_FAILED:
        draft.isLoading = false;
        break;
        
      case constants.GET_ORDER_DETAIL_REQUEST:
        draft.isLoading = true;
        break;
      case constants.GET_ORDER_DETAIL_SUCCESS:
        draft.isLoading = false;
        break;
      case constants.GET_ORDER_DETAIL_FAILED:
        draft.isLoading = false;
        break;
      
      default:
        break;
    }
  });
}
