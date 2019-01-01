import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducer);

export default store;
