import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home/HomeResponsive';
import About from './containers/Landing/Abouts';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import RegisterConfirm from './containers/Auth/RegisterConfirm';
import ForgotPassword from './containers/Auth/ForgotPassword';
import Dashboard from './containers/Dashboard/Dashboard';
import OrderDetail from './containers/Dashboard/OrderHistory/OrderDetail';
import AddGear from './containers/Landing/AddGear';
import Cart from './containers/Landing/Cart';
import Checkout from './containers/Landing/Checkout';
import Payment from './containers/Payment/Payment';
import PaymentSuccess from './containers/Payment/PaymentSuccess';
import ListGear from './containers/Landing/ListGear';
import RentGear from './containers/Landing/RentGear';
import RentGearDetail from './containers/Landing/RentGearDetail';
import SearchResults from './containers/Landing/SearchResults';
import Favourites from './containers/Landing/Favourites';
import Partner from './containers/Landing/Partner';
import EditGear from './containers/Landing/EditGear'
import FAQ from './containers/Landing/FAQ';

export default (
  <div className="app-content">
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/aboutus" component={About}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path='/confirm' component={RegisterConfirm}/>
      <Route exact path="/forgotpassword" component={ForgotPassword}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/dashboard/order/detail/:id" component={OrderDetail}/>
      <Route exact path="/addgear" component={AddGear}/>
      <Route exact path="/editgear/:id" component={EditGear}/>
      <Route exact path="/gear/detail/:id" component={RentGearDetail}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/checkout" component={Checkout}/>
      <Route exact path="/payment" component={PaymentSuccess}/>
      <Route exact path="/payment/:id/:tid" component={PaymentSuccess}/>
      <Route exact path='/listgear' component={ListGear}/>
      <Route exact path='/rentgear' component={RentGear}/>
      <Route exact path='/rentgear/:id' component={RentGear}/>
      <Route exact path='/search' component={SearchResults}/>
      <Route exact path='/favourites' component={Favourites}/>
      <Route exact path='/partners' component={Partner}/>
      <Route exact path='/FAQ' component={FAQ}/>
    </Switch>
  </div>
);
