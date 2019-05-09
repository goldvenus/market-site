import React from 'react';
import {Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Pagination, PaginationItem, PaginationLink, Table} from 'reactstrap';
import "react-tabs/style/react-tabs.css";
import EmpetyList from './Empety_list'
import {getListGears} from '../../core/actions/gear.action';
import connect from "react-redux/es/connect/connect";
import RentalCalendarModal from "./GearHistory/RentalCalendarModal";
import GearEditModal from "./GearHistory/GearEditModal";
import BarLoader from "react-bar-loader";

const MyListingItem = ({ listItem, openEdit, openCalendar }) => (
    <React.Fragment>
        <tr className="desktop-gear-item">
            <td width="5%" className="d-md-none d-none d-lg-table-cell listing-data-image">{<img
                src={listItem.numberOfUserImage[0]} className="gear-img" alt="Number of User"/>}</td>
            <td width="20%" className="d-lg-none d-md-table-cell listing-data-image">{<img
                src={listItem.numberOfUserImage[0]} className="gear-img" alt="Number of User"/>}</td>
            <td className="d-none d-lg-table-cell" width="20%">
                <p className="gear-brand">{listItem.brand}</p>
                <p className="theme-text-small gear-category text-muted">{listItem.categoryName}</p>
            </td>
            <td className="listing-p d-lg-none d-md-table-cell" width="40%">
                <p className="theme-text-small gear-category text-muted table-content-name">{listItem.categoryName}</p>
                <p className="table-content-name-body gear-brand">{listItem.brand}</p>
            </td>
            <td className="d-none d-lg-table-cell gear-price-per-day" width="15%">${listItem.pricePerDay} </td>
            <td className="d-none d-lg-table-cell gear-replacement-value" width="15%">${listItem.replacementValue}</td>
            <td className="d-none d-lg-table-cell" width="15%">
                <button className='theme-btn rent-cal-btn' onClick={() => openCalendar(listItem.gearid)}>Rental Calendar</button>
            </td>
            <td width="15%" className="edit-gear-td">
                <span className="edit_my_gear" onClick={() => openEdit(listItem.gearid)}/>
            </td>
        </tr>
        <tr className="tablet-gear-item">
            <td width="5%" className="listing-data-image">{<img
                src={listItem.numberOfUserImage[0]} className="gear-img" alt="Number of User"/>}</td>
            <td className="" width="20%">
                <p className="gear-brand">{listItem.brand}</p>
                <p className="theme-text-small gear-category text-muted">{listItem.categoryName}</p>
            </td>
            <td className="gear-price-per-day" width="15%">${listItem.pricePerDay} </td>
            <td className="gear-replacement-value" width="15%">${listItem.replacementValue}</td>
            <td className="" width="15%">
                <button className='theme-btn rent-cal-btn' onClick={() => openCalendar(listItem.gearid)}>Rental Calendar</button>
            </td>
            <td width="15%" className="edit-gear-td">
                <span className="edit_my_gear" onClick={() => openEdit(listItem.gearid)}/>
            </td>
        </tr>
    </React.Fragment>
);

const MyListingItemSm = ({ listItem, openEdit, openCalendar }) => (
    <div className="mylistingitem_sm_parent_div">
        <div className="d-flex mlspd_first">
            <div  className="listing-data-image">
                {<img src={listItem.numberOfUserImage[0]} className="gear-img" alt="Number of User"/>}
            </div>
            <div className="d-block mlspdf_name_tag">
                <p className="theme-text-small text-muted mlspdf_name_tag_categoryName">{listItem.categoryName}</p>
                <p className="mlspdf_name_tag_brandName">{listItem.brand}</p>
            </div>
        </div>
        <div className="d-flex mlspd_second">
            <div className="d-block col-12 mlspds_child mlspd_second_first">
                <p className="mlspdf_name_tag_brandName">Price per day</p>
                <div >${listItem.pricePerDay} </div>
            </div>
            <div className="d-block col-12 mlspds_child">
                <p className="mlspdf_name_tag_brandName">Value</p>
                <div className="mlspd_second_replacementValue">${listItem.replacementValue}</div>
            </div>
        </div>
        <div className="d-flex slspd_third">
            <div className="slspdt_rental_btn">
                <button className='theme-btn rent-cal-btn' onClick={() => openCalendar(listItem.gearid)}>Rental Calendar
                </button>
            </div>
            <div className="edit-gear-td slspdt_edit_icon">
                <span className="edit_my_gear" onClick={() => openEdit(listItem.gearid)}/>
            </div>
        </div>
    </div>
);

class MyListings extends React.Component {
    constructor(props) {
        super(props);
        // Data set of random length
        this.pageSize = 3;
        this.pagesCount = 0;
        this.state = {
            currentPage: 0,
            modal_open_st: 0,
            cur_gear: null
        };
        getListGears();
    }

    handleOpenRentalCalendar = (gearid) => {
        this.setState({modal_open_st: 1, cur_gear: gearid});
    };

    handleOpenGearEdit = (gearid) => {
        this.setState({modal_open_st: 2, cur_gear: gearid});
    };

    handleClose = () => {
        this.setState({modal_open_st: 0});
    };

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    render() {
        const {currentPage} = this.state;
        const {list, isLoading} = this.props;
        if (isLoading) {
            return <BarLoader color="#F82462" height="5"/>;
        }

        this.pagesCount = Math.ceil(list ? list.length / this.pageSize : "");

        return (
            <div>
                <Row className="my-listing my-listing-tabs gear-history-top-panel">
                    <Col sm="24" className="listing-body calendar_all_parent">
                        <div className="d-flex align-items-center">
                            <h4 className="tab-title tab-title-listings">My Gear</h4>
                            <button className="theme-btn theme-btn-primary ml-auto"><Link to="/addgear">Add Gear</Link>
                            </button>
                        </div>

                        <div className="wrraper_dashboard wrraper-region">
                            {(list.length <= 0) ? <EmpetyList/> :
                                (
                                    <React.Fragment>
                                        <div className="table-responsive">
                                            <Table className="listing-data-slice">
                                                <thead className="list-table-head">
                                                    <tr className="text-muted theme-text-bold listing-data-thead">
                                                        <th></th>
                                                        <th>Name & Category</th>
                                                        <th>Price Per day</th>
                                                        <th>Value</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="listing-data-tbody">
                                                {list ? list
                                                    .slice(
                                                        currentPage * this.pageSize,
                                                        (currentPage + 1) * this.pageSize
                                                    )
                                                    .map((data, i) =>
                                                        <MyListingItem
                                                            listItem={data} key={i}
                                                            openEdit={this.handleOpenGearEdit}
                                                            openCalendar={this.handleOpenRentalCalendar}
                                                        />
                                                    ) : ""}
                                                {list ? list
                                                    .slice(
                                                        currentPage * this.pageSize,
                                                        (currentPage + 1) * this.pageSize
                                                    )
                                                    .map((data, i) =>
                                                        <MyListingItemSm
                                                            listItem={data}
                                                            key={i}
                                                            openEdit={this.handleOpenGearEdit}
                                                            openCalendar={this.handleOpenRentalCalendar}
                                                        />
                                                    ) : ""}
                                                </tbody>
                                            </Table>
                                        </div>
                                        <Pagination aria-label="Page navigation example"
                                                    className="listing-data-pagenation">
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
                        </div>
                    </Col>
                </Row>
                {
                    this.state.modal_open_st === 2 ?
                        <GearEditModal
                            gearid={this.state.cur_gear}
                            onClose={this.handleClose}
                            onCalendar={this.handleOpenRentalCalendar}
                        /> :
                    this.state.modal_open_st === 1 ?
                        <RentalCalendarModal
                            gearid={this.state.cur_gear}
                            onClose={this.handleClose}
                            listGears={list}
                        /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.gear.listGears,
    isLoading: state.gear.isLoading
});

export default connect(mapStateToProps)(MyListings);
