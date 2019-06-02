import producer from 'immer';
import constants from "../types";

const initialState = {
  gear: null,
  listGears: [],
  productList: null,
  newArrivals: null,
  searchResults: null,
  isLoading: false,
  isLoadingGear: false,
  isChanging: false
};

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case constants.ADD_GEAR_REQUEST:
        draft.isChanging = true;
        break;
      case constants.ADD_GEAR_SUCCESS:
        draft.listGears = [...draft.listGears, action.payload];
        draft.isChanging = false;
        break;
      case constants.ADD_GEAR_FAILED:
        draft.isChanging = false;
        break;
      
      case constants.EDIT_GEAR_REQUEST:
        draft.isChanging = true;
        break;
      case constants.EDIT_GEAR_SUCCESS:
        draft.isChanging = false;
        draft.listGears = draft.listGears.map(item =>
          item.gearid === action.payload.gearid ? action.payload : item);
        break;
      case constants.EDIT_GEAR_FAILED:
        draft.isChanging = false;
        break;
      
      case constants.LIST_GEARS_REQUEST:
        draft.isLoading = true;
        break;
      case constants.LIST_GEARS_SUCCESS:
        draft.listGears = action.payload;
        draft.isLoading = false;
        break;
      case constants.LIST_GEARS_FAILED:
        draft.isLoading = false;
        break;
      
      case constants.SEARCH_PRODUCTS_REQUEST:
        draft.isLoading = true;
        break;
      case constants.SEARCH_PRODUCTS_SUCCESS:
        draft.searchResults = action.payload;
        draft.isLoading = false;
        break;
      case constants.SEARCH_PRODUCTS_FAILED:
        draft.isLoading = false;
        break;
        
      case constants.GET_GEAR_REQUEST:
        draft.isLoadingGear = true;
        break;
      case constants.GET_GEAR_SUCCESS:
        draft.gear = action.payload;
        draft.isLoadingGear = false;
        break;
      case constants.GET_GEAR_FAILED:
        draft.isLoadingGear = false;
        break;
      
      case constants.DELETE_GEAR_REQUEST:
        draft.isDeleting = true;
        break;
      case constants.DELETE_GEAR_SUCCESS:
        draft.listGears = draft.listGears.filter(item => item.gearid !== action.payload);
        draft.isDeleting = false;
        draft.gear = null;
        break;
      case constants.DELETE_GEAR_FAILED:
        draft.isDeleting = false;
        draft.gear = null;
        break;
      
      case constants.NEW_ARRIVALS_REQUEST:
        draft.isLoading = true;
        break;
      case constants.NEW_ARRIVALS_SUCCESS:
        draft.newArrivals = action.payload;
        draft.isLoading = false;
        break;
      case constants.NEW_ARRIVALS_FAILED:
        draft.newArrivals = null;
        draft.isLoading = false;
        break;
      
      default:
        break;
    }
  });
}