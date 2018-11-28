import producer from 'immer'; //Immutability Library
import { ACTIONS } from '../constants';

const initialState = {
  categories: []
}

export default (state = initialState, action) => {
  return producer(state, draft => {
    switch (action.type) {
      case ACTIONS.CATEGORIES:
        draft.categories = action.payload;
        break;
      default:
        break;
    }
  });
}
