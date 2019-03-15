import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../components/Pages/Home/HomeResponsive';
import About from '../components/Pages/Abouts/Abouts';
import Login from '../components/Pages/Login/Login';
import Register from '../components/Pages/Register/Register';
import RegisterConfirm from '../components/Pages/RegisterConfirm/RegisterConfirm';
import ForgotPassword from '../components/Pages/ForgotPassword/ForgotPassword';
import Dashboard from '../components/Pages/Dashboard/Dashboard';
import AddGear from '../components/Pages/AddGear/AddGear';
import ViewGear from '../components/Pages/ViewGear/ViewGear';
import Cart from '../components/Pages/Cart/Cart';
import Checkout from '../components/Pages/Checkout/Checkout';
import Payment from '../components/Pages/Payment/Payment';
import ListGear from '../components/Pages/ListGear/ListGear';
import RentGear from '../components/Pages/RentGear/RentGear';
import SearchResults from '../components/Pages/SearchResults/SearchResults';
import Favourites from '../components/Pages/Favourites/Favourites';
import Partner from '../components/Pages/Partner/Partner';

import FAQ from '../components/Pages/FAQ/FAQ';

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
      <Route exact path="/addgear" component={AddGear}/>
      <Route exact path="/gear/:id" component={ViewGear}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/checkout" component={Checkout}/>
      <Route exact path="/payment" component={Payment}/>
      <Route exact path='/listgear' component={ListGear}/>
      <Route exact path='/rentgear' component={RentGear}/>
      <Route exact path='/search' component={SearchResults}/>
      <Route exact path='/favourites' component={Favourites}/>
      <Route exact path='/partners' component={Partner}/>
      <Route exact path='/FAQ' component={FAQ}/>
    </Switch>
  </div>
);
