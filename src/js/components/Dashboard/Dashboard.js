import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, TabContent, TabPane} from 'reactstrap';
import Head from './head';
import Tabs from './tabs';
import Chart from './chart';
import AccountDetail from './account_detail';
import MyListings from './listing';
import MyRental from './rental';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-head">
          <Container>
            <Head  />
            <Tabs activeTab={this.state.activeTab} toggle={this.toggle}/>
          </Container>
        </div>
        <div className="dashboard-body">
          <Container>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Chart  />
              </TabPane>
              <TabPane tabId="2">
                <AccountDetail  />
              </TabPane>
              <TabPane tabId="3">
                <MyListings  />
              </TabPane>
              <TabPane tabId="4">
                <MyRental />
              </TabPane>
            </TabContent>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Dashboard);
