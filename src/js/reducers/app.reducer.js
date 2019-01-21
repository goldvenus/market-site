import producer from 'immer'; //Immutability Library
import { ACTIONS } from '../constants';

const initialState = {
  categories: [],
  listGears: [],
  error: null,
  user: null,
  isAuthenticated: false,
  gear: null,
  productList :[]
}

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case ACTIONS.CATEGORIES:
        draft.categories = action.payload;
        break;
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
      case ACTIONS.GEAR:
        draft.gear = action.payload;
        break;

      case ACTIONS.CARTS:
        draft.carts = action.payload;
        break;

      case ACTIONS.GEAR_PRODUCT_LIST :
        draft.productList = action.payload;

      default:
        break;
    }
  });
}
