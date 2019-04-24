import React from 'react';
import classnames from 'classnames';
import {Nav, NavItem, NavLink, } from 'reactstrap';

export default function (props) {
  const {activeTab , toggle} = props;
  return (
      <div className="gear_history_tab">
    <Nav tabs >
      <NavItem className="nav-item-first">
        <NavLink
          className={classnames({ active: activeTab === '1' })}
          onClick={() => { toggle('1'); }}>
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem className="nav-item-second">
        <NavLink
          className={classnames({ active: activeTab === '2' })}
          onClick={() => { toggle('2'); }}>
          Account Detail
        </NavLink>
      </NavItem>
      <NavItem className="nav-item-third">
        <NavLink
          className={classnames({ active: activeTab === '3' })}
          onClick={() => { toggle('3'); }}>
          Gear History
        </NavLink>
      </NavItem>
      <NavItem className="nav-item-four">
        <NavLink
          className={classnames({ active: activeTab === '4' })}
          onClick={() => { toggle('4'); }}>
          Rental History
        </NavLink>
      </NavItem>
        <NavItem className="nav-item-four">
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}>
            Order History
          </NavLink>
        </NavItem>
    </Nav>
      </div>
  );
}