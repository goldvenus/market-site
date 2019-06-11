import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/HomeResponsive';
import Messages from './containers/Messages';
import About from './containers/Landing/Abouts';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import RegisterConfirm from './containers/Auth/RegisterConfirm';
import ForgotPassword from './containers/Auth/ForgotPassword';
import Dashboard from './containers/Dashboard/Dashboard';
import OrderDetail from './containers/Dashboard/OrderHistory/OrderDetail';
import AddMethodContainer from './containers/Dashboard/Payment/AddMethodContainer';
import AddGear from './containers/Landing/AddGear';
import Cart from './containers/Landing/Cart';
import Checkout from './containers/Checkout/Checkout';
import Payment from './containers/Payment/Payment';
import PaymentSuccess from './containers/Payment/PaymentSuccess';
import RentGear from './containers/Landing/RentGear';
import RentGearDetail from './containers/Landing/RentGearDetail';
import SearchResults from './containers/Landing/SearchResults';
import Favourites from './containers/Landing/Favourites';
import FAQ from './containers/Landing/FAQ';
import PrivacyPolicy from './containers/TermsAndPolicy/PrivacyPolicy';
import TermsConditions from './containers/TermsAndPolicy/TermsConditions';
import NotFound from './containers/NotFound';
import ProtectedRoute from "./route/ProtectedRoute";

export default (
  <div className="app-content" id="nummus-container">
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about-us" component={About}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path='/confirm' component={RegisterConfirm}/>
      <Route exact path="/forgot-password" component={ForgotPassword}/>
      <Route exact path='/faq' component={FAQ}/>
      <Route exact path='/privacy' component={PrivacyPolicy}/>
      <Route exact path='/terms-use' component={TermsConditions}/>
      <Route exact path='/terms-condition' component={TermsConditions}/>
      <Route exact path='/rent-gear' component={RentGear}/>
      <Route exact path="/gear/detail/:id" component={RentGearDetail}/>

      <ProtectedRoute exact path="/messages/:id1?" component={Messages}/>
      <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
      <ProtectedRoute exact path="/dashboard/order/detail/:id" component={OrderDetail}/>
      <ProtectedRoute exact path="/dashboard/method-add/:id" component={AddMethodContainer}/>
      <ProtectedRoute exact path="/add-gear" component={AddGear}/>
      <ProtectedRoute exact path="/cart" component={Cart}/>
      <ProtectedRoute exact path="/checkout" component={Checkout}/>
      <ProtectedRoute exact path="/payment/:id" component={Payment}/>
      <ProtectedRoute exact path="/payment/:id/:tid" component={PaymentSuccess}/>
      <ProtectedRoute exact path='/search' component={SearchResults}/>
      <ProtectedRoute exact path='/favourites' component={Favourites}/>
      
      <Route component={NotFound}/>
    </Switch>
  </div>
);
