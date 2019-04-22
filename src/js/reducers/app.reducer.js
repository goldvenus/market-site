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
  carts: [],
  favorites: [],
  gear_histories: [],
  my_gear_names: []
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
      case ACTIONS.DELETE_GEAR:
        draft.listGears = draft.listGears.filter(item => item.gearid !== action.payload);
        break;
      case ACTIONS.CARTS:
        draft.carts = action.payload;
        break;
      case ACTIONS.ADD_TO_CART:
        draft.carts = [...draft.carts, action.payload];
        break;
      case ACTIONS.DELETE_CART_ITEM:
        draft.carts = draft.carts.reduce((arr, item) =>
            item.gearid !== action.payload ?
                arr.concat(item) : arr, []);
        break;

      case ACTIONS.ADD_TO_FAVORITE:
        draft.favourites = [...draft.favourites, action.payload];
        break;
      case ACTIONS.DELETE_FAVOR_ITEM:
        draft.favorites = draft.favorites.reduce((arr, item) =>
            item.gearid !== action.payload ?
                arr.concat(item) : arr, []);
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
      case ACTIONS.GEAR_HISTORY:
          draft.gear_histories = action.payload;
      case ACTIONS.MY_GEAR_NAME:
            draft.my_gear_names = action.payload;
      default:
        break;
    }
  });
}
