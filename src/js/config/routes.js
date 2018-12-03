import React from "react";
import { Route } from 'react-router-dom';
import Home from "../components/Home";
import About from "../components/Abouts"

export default (
  <div className="app-content">
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/AboutUs" component={About} />
  </div>
);
