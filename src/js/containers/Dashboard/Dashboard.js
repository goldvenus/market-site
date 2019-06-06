import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane } from 'reactstrap';
import { viewUserDashboard } from '../../core/actions/dashboard.action';
import Head from './head';
import Tabs from './tabs';
import Chart from './Chart/chart';
import AccountDetail from './AccountDetail';
import MyListings from './GearHistory';
import OrderHistory from './OrderHistory';
import PaymentDashboard from "./PaymentDashboard";
import CustomLoaderLogo from "../../components/common/CustomLoaderLogo";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  componentDidMount() {
    viewUserDashboard();
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    // const Listing_Items = this.props.userListings;
    const { user, isAuthenticated, dashboard } = this.props;
    if (!user || !dashboard) {
      return <CustomLoaderLogo/>;
    }

    return (
      <div className="dashboard">
        <div className="dashboard-head">
          <Container>
            <Head user={user} auth={isAuthenticated}/>
            <Tabs activeTab={this.state.activeTab} toggle={this.toggle}/>
          </Container>
        </div>
        <div className="dashboard-body">
          <Container>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Chart dashboard={dashboard}/>
              </TabPane>
              <TabPane tabId="2">
                <AccountDetail/>
              </TabPane>
              <TabPane tabId="3">
                <MyListings/>
              </TabPane>
              <TabPane tabId="4" id="#order">
                <OrderHistory/>
              </TabPane>
              <TabPane tabId="5">
                <PaymentDashboard history={this.props.history}/>
              </TabPane>
            </TabContent>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userListings: state.dashboard.userListings,
  dashboard: state.dashboard.dashboard,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
