import React from 'react';
import {Col,Row} from 'reactstrap';

const ThemeRow = ({children}) =>{
  return(
    <Row className="theme-row">
      {children}
    </Row>
  )
}

export default ThemeRow;