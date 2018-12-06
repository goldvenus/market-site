import React from 'react';
import classnames from 'classnames';
import {Nav, NavItem, NavLink, } from 'reactstrap';
import {Row, Col} from 'reactstrap';

export default function (props) {
  const {activeTab , toggle} = props;
  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '1' })}
          onClick={() => { toggle('1'); }}>
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '2' })}
          onClick={() => { toggle('2'); }}>
          Account Detail
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '3' })}
          onClick={() => { toggle('3'); }}>
          My Listing
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({ active: activeTab === '4' })}
          onClick={() => { toggle('4'); }}>
          My Rentals
        </NavLink>
      </NavItem>
    </Nav>
  );
}