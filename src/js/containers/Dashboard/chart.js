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
            <div className="chart-wrapper-left">
              <LineChart series={props.series} />
            </div>
            <div className="chart-wrapper-right">
              <div className="chart-detail-wrapper">
                <p className="total-detail-heading">Total Earnings</p>
                <p className="total-detail-value">$2039</p>
              </div>
              <div className="chart-detail-wrapper">
                <p className="total-detail-heading">Monthly Average</p>
                <p className="total-detail-value">$2039</p>
                <p className="total-detail-compare-value">% compared to last month</p>
              </div>
              <div className="chart-detail-wrapper">
                <p className="total-detail-heading">Inventory Value</p>
                <p className="total-detail-value">$2039</p>
              </div>
            </div>
          </Row>
          <Row className="total-count-wrapper">
            <Col>
              <div className="totel-listing">
                <h2>10</h2>
                <p className="theme-text-small-bold">Total Listing</p>
              </div>
            </Col>
            <Col>
              <div className="totel-rental">
                <h2>4</h2>
                <p className="theme-text-small-bold">Out On Rent</p>
              </div>
            </Col>
            <Col>
              <div className="avaiable">
                <h2>6</h2>
                <p className="theme-text-small-bold">Avaiable</p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
