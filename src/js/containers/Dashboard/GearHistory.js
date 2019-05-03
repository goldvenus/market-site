import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import EmpetyList from './Empety_list'
import { getListGears } from '../../core/actions/gear.action';
import connect from "react-redux/es/connect/connect";
import Calendar from "./GearHistory/Calendar";
import BarLoader from "react-bar-loader";
import History_dialog from "../../components/common/History_dialog";

const MyListingItem = ({ listItem, showdialog , gearkey}) => (
  <tr>
    <td width="5%" className="d-md-none d-none d-lg-table-cell listing-data-image">{<img src={listItem.numberOfUserImage[0]} className="gear-img"/>}</td>
    <td width="20%" className="d-lg-none d-md-table-cell listing-data-image">{<img src={listItem.numberOfUserImage[0]} className="gear-img"/>}</td>
    <td className="d-none d-lg-table-cell" width="20%">
      <p >{listItem.brand}</p>
      <p className="theme-text-small text-muted">{listItem.categoryName}</p>
    </td>
    <td className="listing-p d-lg-none d-md-table-cell" width="40%">
          <p className="theme-text-small text-muted table-content-name">{listItem.categoryName}</p>
          <p className="table-content-name-body">{listItem.brand}</p>
      </td>
    <td className="d-none d-lg-table-cell rental-period" width="25%">
      <p>
        {/* {`${listItem.startDate.split(' ')[0]} to ${listItem.endDate.split(' ')[0]} `} */}
      </p>
      <p className="theme-text-small text-muted">
        {` ${listItem.totalRentedNumerOfDay} days`}
      </p>
    </td>
    <td className="d-lg-none d-md-table-cell listing-temp-right" width="40%" >
        <div className="rental-period listing-temp-right-top" width="100%" height="50%">
            <p className="listing-temp-right-top-number"> 201.94.17-12345
                {/* {`${listItem.startDate.split(' ')[0]} to ${listItem.endDate.split(' ')[0]} `} */}
            </p>
            <p className="theme-text-small text-muted">
                {` ${listItem.totalRentedNumerOfDay} days`}
            </p>
        </div>
        <div className="listing-temp-right-bottom" width="100%" height="50%">
            <div className="d-lg-none d-md-table-cell listing-temp-right-bottom-left" width="50%">
                <p className="listing-temp-right-bottom-left-p">Price per day</p>
                {`${listItem.pricePerDay} $`}
            </div>
            <div className="d-lg-none d-md-table-cell listing-temp-right-bottom-right" width="50%">
                <p className="listing-temp-right-bottom-right-p">Amouth</p>
                {`${listItem.totalRentedNumerOfDay * listItem.pricePerDay} $`}
            </div>
        </div>

      </td>
    <td width="25%" className="d-md-none d-lg-table-cell">
      <img src={listItem.numberOfUserImage[0]} className = "landrord-img circle-region-picture" />
      <span className="ml-1 "> {listItem.clientName} </span>
    </td>
    <td className="d-none d-lg-table-cell" width="15%">{`${listItem.pricePerDay} $`} </td>
    <td className="d-none d-lg-table-cell" width="15%">{`${listItem.totalRentedNumerOfDay * listItem.pricePerDay} $`}</td>
     <td width="15%">
         <div className="gear_history_next_btn" onClick={() => showdialog(gearkey)}/>
     </td>
  </tr>
);

class MyListings extends React.Component {
  constructor(props) {
    super(props);
    // Data set of random length
    this.pageSize = 3;
    this.pagesCount = 0;
    this.state = {
      currentPage: 0,
      openGearHistoryVisible: false,
      openGearDialogKey: 0
    };
    getListGears();
  }
  handleClick(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }
  showHistoryItemDialog =(key) => {
      this.setState({openGearHistoryVisible: true, openGearDialogKey: key});
  };
  hideHistoryItemDialog = () => {
      this.setState({openGearHistoryVisible: false});
  };

  render() {
    const { currentPage} = this.state;
    const { list } = this.props;
    // if (isLoading) {
    //   return <BarLoader color="#F82462" height="5"/>;
    // }

    this.pagesCount = Math.ceil(list ? list.length / this.pageSize : "");

    return (
        <div>
            <Row className="my-listing my-listing-tabs gear-history-top-panel">
        <Col sm="24" className="listing-body calendar_all_parent">
          <div className="d-flex align-items-center">
            <h4 className="tab-title tab-title-listings">Gear history</h4>
            <Link to='/listGear' className="theme-btn theme-btn-primary ml-auto mb-3">List Gear</Link>
          </div>


         <Tabs className="fa-table-selected">

          <TabList >
              <Tab ><div className="list-menu-letter"><i className="fa fa-list"></i>List</div></Tab>
              <Tab ><div className="list-calendar-letter"><i className="fa fa-calendar"></i> Calender</div></Tab>
          </TabList>
          <div className="wrraper wrraper-region calendar_wrraper">
            <TabPanel>
            { (list.length <= 0) ? <EmpetyList/> :
               (
                 <React.Fragment>
                      <div className="table-responsive">
                        <Table className="listing-data-slice" >

                          <thead  className="d-md-none d-lg-table d-sm-none list-table-head">
                            <tr className="text-muted theme-text-bold listing-data-thead">
                              <th></th>
                              <th>Name & Category</th>
                              <th>Rental Period</th>
                              <th>Client</th>
                              <th>Price Per day</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody className="listing-data-tbody">
                            {list ? list
                              .slice(
                                currentPage * this.pageSize,
                                (currentPage + 1) * this.pageSize
                              )
                              .map((data, i) =>
                                <MyListingItem showdialog = {this.showHistoryItemDialog} listItem={data} key={i} gearkey = {i}/>
                            ) : ""}

                          </tbody>
                        </Table>
                      </div>
                      <Pagination aria-label="Page navigation example" className="listing-data-pagenation">

                        <PaginationItem disabled={currentPage <= 0}>
                          <PaginationLink
                            onClick={e => this.handleClick(e, currentPage - 1)}
                            previous
                            href="#"
                          />
                        </PaginationItem>

                        {[...Array(this.pagesCount)].map((page, i) =>
                          <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                          <PaginationLink
                            onClick={e => this.handleClick(e, currentPage + 1)}
                            next
                            href="#"
                          />
                        </PaginationItem>

                      </Pagination>
                    </React.Fragment>
               )
             }
            </TabPanel>
            <TabPanel>
                <Calendar listGears={list}/>
            </TabPanel>
          </div>
        </Tabs>
        </Col>
      </Row >
      <History_dialog info = {list[this.state.openGearDialogKey]} open = {this.state.openGearHistoryVisible} close = {this.hideHistoryItemDialog}/>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.gear.listGears,
  isLoading: state.gear.isLoading
});

export default connect(mapStateToProps)(MyListings);
