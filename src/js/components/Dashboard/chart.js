import React from 'react';
import chart from '../../../assets/images/chart-1.jpg';
import {Row, Col} from 'reactstrap';
import LineChart from './LineChart';

export default function () {
  const series = [{
    data: [{
      year: 2011,
      score: 500
    },
    {
      year: 2013,
      score: 1000
    },
    {
      year: 2015,
      score: 100
    },
    ]
  }, {
    data: [{
      year: 2014,
      score: 2200
    },
    {
      year: 2010,
      score: 100
    },
    {
      year: 2095,
      score: 8000
    },
    ]
  }]
  return (
    <Row className="chart">
      <Col sm="12">
        <h4 className="tab-title">Dashboard</h4>
        <div className="wrraper">
          <Row>
            <Col>
              {/* This image is temporary.... we are going to have actual chart
                              Component here */}
              <img src={chart} />
              <LineChart series={series} minYear="1950" maxYear="2080" />
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
