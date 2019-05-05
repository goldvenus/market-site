import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane } from 'reactstrap';
import { dashboardMyListing, dashboardMyRentals, viewUserDashboard } from '../../core/actions/dashboard.action';
import Head from './head';
import Tabs from './tabs';
import Chart from './chart';
import AccountDetail from './AccountDetail';
import MyListings from './GearHistory';
import OrderHistory from './OrderHistory'
import BarLoader from "react-bar-loader";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  componentDidMount() {
    dashboardMyListing();
    dashboardMyRentals();
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
    const Rental_Items = this.props.userRentals;
    const Listing_Items = this.props.userListings;
    const { user, isAuthenticated, dashboard } = this.props;
    let series;

    if (!Rental_Items || !Listing_Items) {
      return <BarLoader color="#F82462" height="5"/>;
    }
    if (dashboard && dashboard.monthlyTotalEarning) {
      series = {
        totalEarnings: dashboard.monthlyTotalEarning,
        monthlyAverage: dashboard.monthlyTotalAvarageEarning,
        inventory: dashboard.monthlyProductsValue
      };
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
                <Chart series={series}/>
              </TabPane>
              <TabPane tabId="2">
                <AccountDetail/>
              </TabPane>
              <TabPane tabId="3">
                <MyListings list={Listing_Items}/>
              </TabPane>
              <TabPane tabId="5" id="#order">
                <OrderHistory list={OrderHistory}/>
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
  userRentals: state.dashboard.userRentals,
  dashboard: state.dashboard.dashboard,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
