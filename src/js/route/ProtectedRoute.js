import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {handleInfo} from "../core/actions/common.action";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (localStorage.userId) {
    return (
      <Route {...rest} render={props => (
        <Component {...props}/>
      )}/>
    );
  } else {
    handleInfo('Please sign in to Creative Market');
    return <Redirect to='/'/>;
  }
};

export default ProtectedRoute;