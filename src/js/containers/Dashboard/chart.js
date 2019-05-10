import React from 'react';
import {Row, Col} from 'reactstrap';
import LineChart from './LineChart';

export default function ({dashboard}) {
  let series = {
    totalEarnings: [],
    monthlyAverage: [],
    inventory: []
  };
  if (dashboard && dashboard.monthlyTotalEarning) {
    series = {
      totalEarnings: dashboard.monthlyTotalEarning,
      monthlyAverage: dashboard.monthlyTotalAvarageEarning,
      inventory: dashboard.monthlyProductsValue
    };
  }
  let monthlyTotalEarnnig = dashboard.monthlyTotalAvarageEarning.reduce((total, item) => total + item.Value, 0);
  let monthlyProductsValue = dashboard.monthlyProductsValue.reduce((total, item) => total + item.Value, 0);

  return (
    <div className="chart">
      <h4 className="tab-title">Dashboard</h4>
      <div className="wrraper_dashboard dashboard-chart-wrapper">
          <Row className="line-chart">
            <div className="chart-wrapper-left">
              <LineChart series={series} />
            </div>
            <div className="chart-wrapper-right">
              <div className="chart-detail-wrapper">
                <p className="total-detail-heading">Total Earnings</p>
                <p className="total-detail-value">${monthlyTotalEarnnig}</p>
              </div>
              <div className="chart-detail-wrapper">
                <p className="total-detail-heading">Monthly Average</p>
                <p className="total-detail-value">${dashboard.monthlyAverage}</p>
                <p className="total-detail-compare-value">{dashboard.monthlyAverage}% compared to last month</p>
              </div>
              <div className="chart-detail-wrapper">
                <p className="total-detail-heading">Inventory Value</p>
                <p className="total-detail-value">${monthlyProductsValue}</p>
              </div>
            </div>
          </Row>
          <Row className="total-count-wrapper">
            <Col>
              <div className="totel-listing">
                <h2>{dashboard.totalListingGear}</h2>
                <p className="theme-text-small-bold">Total Listings</p>
              </div>
            </Col>
            <Col>
              <div className="totel-rental">
                <h2>{dashboard.rented}</h2>
                <p className="theme-text-small-bold">Out on Rent</p>
              </div>
            </Col>
            <Col>
              <div className="avaiable">
                <h2>{dashboard.available}</h2>
                <p className="theme-text-small-bold">Avaiable</p>
              </div>
            </Col>
          </Row>
        </div>
    </div>
  );
}
