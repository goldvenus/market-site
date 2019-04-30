import React from 'react';
import NavbarRight from './NavbarRight';
import NavbarMenu from './NavbarMenu';


const Navbar = () => (
  <React.Fragment>
    <div className="navbar-wrapper">
      
      <NavbarMenu/>
      <NavbarRight/>
    </div>
  
  </React.Fragment>
);
export default Navbar;
