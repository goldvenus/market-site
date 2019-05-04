import React from 'react';
import {Row, Col} from 'reactstrap';
import LineChart from './LineChart';

export default function ( props) {
  return (
    <Row className="chart">
      <Col sm="24">
        <h4 className="tab-title">Dashboard</h4>
        <div className="wrraper_dashboard">
          <Row className="line-chart">
            <Col>
              <LineChart series={props.series} />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="totel-listing">
                <h3>10</h3>
                <p className="theme-text-small-bold">Total Listing</p>
              </div>
            </Col>
            <Col>
              <div className="totel-rental">
                <h3>4</h3>
                <p className="theme-text-small-bold">Out On Rent</p>
              </div>
            </Col>
            <Col>
              <div className="avaiable">
                <h3>6</h3>
                <p className="theme-text-small-bold">Avaiable</p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
