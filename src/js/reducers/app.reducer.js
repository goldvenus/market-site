import producer from 'immer'; //Immutability Library
import { ACTIONS } from '../constants';
import { Action } from 'rxjs/internal/scheduler/Action';

const initialState = {
  categories: [],
  listGears: [],
  allGears: [],
  error: null,
  user: null,
  isAuthenticated: false,
  gear: null,
  productList :[],
  userListings :[],
  userRentals :[],
  searchResults: [],
  newArrivals: [],
  dashboard: {},
}

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case ACTIONS.ERROR:
        draft.error = action.payload;
        break;
      case ACTIONS.REMOVE_ERROR:
        draft.error = null;
        break;
      case ACTIONS.LOGGED_IN:
        draft.user = action.payload;
        draft.isAuthenticated = true;
        break;
      case ACTIONS.LOGGED_OUT:
        draft.user = null;
        draft.isAuthenticated = false;
        break;
      case ACTIONS.FETCH_CATEGORIES :
        draft.categories = action.payload.data;
        break;
      case ACTIONS.LIST_GEARS:
        draft.listGears = action.payload;
        break;
      case ACTIONS.ALL_GEARS:
        draft.allGears = action.payload;
        break;
      case ACTIONS.GEAR:
        draft.gear = action.payload;
        break;

      case ACTIONS.CARTS:
        draft.carts = action.payload;
        break;

      case ACTIONS.GEAR_PRODUCT_LIST :
        draft.productList = action.payload;
        break;

      case ACTIONS.DASHBOARD_MY_LISTINGS:
        draft.userListings = action.payload;
        break;

      case ACTIONS.DASHBOARD_MY_RENTALS:
        draft.userRentals = action.payload;
        break;

      case ACTIONS.SEARCH_RESULTS:
        draft.searchResults = action.payload;
        break;

      case ACTIONS.FAVOURITES:
        draft.favourites = action.payload;
        break;
      case ACTIONS.NEW_ARRIVALS:
        draft.newArrivals = action.payload;
        break;
      case ACTIONS.DASHBOARD:
        draft.dashboard = action.payload;
        break;
      default:
        break;
    }
  });
}
