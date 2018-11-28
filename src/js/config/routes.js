import React from "react";
import { Route } from 'react-router-dom';
import Home from "../components/Home";

export default (
  <div className="app-content">
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
  </div>
);
