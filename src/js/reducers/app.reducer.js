import producer from 'immer'; //Immutability Library
import { ACTIONS } from '../constants';

const initialState = {
  categories: [],
  error: null,
  user: null,
  isAuthenticated: false
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
      default:
        break;
    }
  });
}
