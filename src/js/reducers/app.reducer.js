import producer from 'immer'; //Immutability Library
import { ACTIONS } from '../constants';

const initialState = {
  categories: [],
  error: null
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
      default:
        break;
    }
  });
}
