import React from 'react';
import {Redirect} from "react-router-dom";

const NotFound = () => (
  <div className='container not-found-page'>
    <h3>Page Not Found</h3>
    <Redirect to='/'>Go Home</Redirect>
  </div>
);

export default NotFound;