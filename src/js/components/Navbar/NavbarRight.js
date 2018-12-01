import React from 'react';
import { Link } from 'react-router-dom';

const NavbarRight = () => (
  <ul className="theme-nav-right">
    <li>
      <Link to="/ListGear" >List Gear</Link>
    </li>
    <li>
      <Link to="/RentGear" >Rent Gear</Link>
    </li>
    <li>
      <button className="theme-btn theme-btn-outline-white ml-3">Login</button>
    </li>
    <li>
      <button className="theme-btn theme-btn-filled-white ml-2">Register</button>
    </li>
  </ul>
);

export default NavbarRight;