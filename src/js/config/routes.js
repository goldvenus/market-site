import React from "react";
import { Route } from 'react-router-dom';
import Home from "../components/Home";
import About from "../components/Abouts";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import AddGear from "../components/AddGear";
import ViewGear from "../components/ViewGear";
import Dashboard from "../components/Dashboard/Dashboard";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";
import Payment from "../components/Payment";
import ListGear from "../components/ListGear";
import RentGear from "../components/RentGear";

export default (
  <div className="app-content">
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/aboutus" component={About} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/forgotpassword" component={ForgotPassword} />
    <Route path="/addgear" component={AddGear} />
    <Route path="/gear/:id" component={ViewGear} />
    <Route path="/cart" component={Cart} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/payment" component={Payment} />
    <Route path='/listgear' component={ListGear} />
    <Route path='/rentgear' component={RentGear} />
  </div>
);
