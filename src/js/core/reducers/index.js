import { combineReducers } from 'redux';
import appReducer from './app.reducer';
import userReducer from './user.reducer';
import gearReducer from './gear.reducer'

export default combineReducers({
  app: appReducer,
  user: userReducer,
  gear: gearReducer
});
