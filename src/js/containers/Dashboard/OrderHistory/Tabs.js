import React from 'react';
import classnames from 'classnames';
import {Nav, NavItem, NavLink, } from 'reactstrap';

export default function (props) {
  const {activeTab , toggle, newCount} = props;
  
  return (
    <div className="gear_history_tab">
      <Nav tabs >
        <NavItem className="nav-item-first">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            Renter
          </NavLink>
        </NavItem>
        <NavItem className="nav-item-second">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            Owner
          </NavLink>
        </NavItem>
        <NavItem>
          {newCount > 0 ?
            <div className='new-order-count'>{newCount}</div> : null}
        </NavItem>
      </Nav>
    </div>
  );
}