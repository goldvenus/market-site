import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import gearReducer from './gear.reducer';
import cartReducer from './cart.reducer';
import categoryReducer from './category.reducer';
import checkoutReducer from './checkout.reducer';
import commonReducer from './common.reducer';
import dashboardReducer from './dashboard.reducer';
import favouriteReducer from './favourite.reducer';
import paymentReducer from './payment.reducer';

export default combineReducers({
  user: userReducer,
  gear: gearReducer,
  cart: cartReducer,
  category: categoryReducer,
  checkout: checkoutReducer,
  common: commonReducer,
  dashboard: dashboardReducer,
  favourite: favouriteReducer,
  payment: paymentReducer
});
