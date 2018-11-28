import { ACTIONS } from '../constants';
import store from '../store';

const dispatch = store.dispatch;

const testing = (data) => {
  dispatch({
    type: ACTIONS.CATEGORIES,
    payload: []
  });
}

export { testing }
