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
  </div>
);
