import React from 'react';
import chart from '../../../assets/images/chart-1.jpg';
import {Row, Col} from 'reactstrap';

export default function () {
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