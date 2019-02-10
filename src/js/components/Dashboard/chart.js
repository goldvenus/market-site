import React from 'react';
import chart from '../../../assets/images/chart-1.jpg';
import {Row, Col} from 'reactstrap';
import LineChart from './LineChart';

const series = {
  totalEarnings: [{
    label: "SEP 2018",
    value: 2000
  }, {
    label: "OCT 2018",
    value: 2500
  }, {
    label: "NOV 2018",
    value: 2500
  }, {
    label: "DEC 2018",
    value: 2800
  }, {
    label: "JAN 2019",
    value: 2500
  }, {
    label: "FEB 2019",
    value: 2800
  }],
  monthlyAverage: [{
    label: "SEP 2018",
    value: 500
  }, {
    label: "OCT 2018",
    value: 1000
  }, {
    label: "NOV 2018",
    value: 1200
  }, {
    label: "DEC 2018",
    value: 1500
  }, {
    label: "JAN 2019",
    value: 500
  }, {
    label: "FEB 2019",
    value: 2000
  }],
  inventory: [{
    label: "SEP 2018",
    value: 4000
  }, {
    label: "OCT 2018",
    value: 4500
  }, {
    label: "NOV 2018",
    value: 4800
  }, {
    label: "DEC 2018",
    value: 4500
  }, {
    label: "JAN 2019",
    value: 3800
  }, {
    label: "FEB 2019",
    value: 5000
  }],
}

export default function () {
  return (
    <Row className="chart">
      <Col sm="12">
        <h4 className="tab-title">Dashboard</h4>
        <div className="wrraper">
          <Row className="line-chart">
            <Col>
              <LineChart series={series} />
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
