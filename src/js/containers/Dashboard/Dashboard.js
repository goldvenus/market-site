import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane } from 'reactstrap';
import { dashboardMyListing, dashboardMyRentals, viewUserDashboard } from '../../core/actions/dashboard.action';
import Head from './head';
import Tabs from './tabs';
import Chart from './chart';
import AccountDetail from './account_detail';
import MyListings from './GearHistory';
import MyRental from './rental';
import OrderHistory from './OrderHistory'

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
    const Rental_Items = this.props.userRentals.Items;
    const Listing_Items = this.props.userListings.Items;
    const { user, isAuthenticated, dashboard } = this.props;
    let series;

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
              <TabPane tabId="4">
                <MyRental list={Rental_Items}/>
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
  userListings: state.app.userListings,
  userRentals: state.app.userRentals,
  user: state.app.user,
  isAuthenticated: state.app.isAuthenticated,
  dashboard: state.app.dashboard,
});

export default connect(mapStateToProps)(Dashboard);
