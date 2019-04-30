import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
    Container, Row, Col, Breadcrumb, Table,
    BreadcrumbItem, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {getListGears, deleteGear, handleError} from '../../actions/app.actions';
import BarLoader from "react-bar-loader";
import EmptyActivity from "../../components/EmptyActivity";
import Urllink_class from "../../components/Urllink_class";
import CustomSpinner from "../../components/CustomSpinner";
import {ToastsStore} from "react-toasts";

const ListGearItem = ({onDelete, listItem: {gearid, model = '', brand = '', categoryName = '', numberOfUserImage, pricePerDay, orderStatus: status}}) => {

    let btnClass = classNames({
        'theme-btn': true,
        [`btn-${status}`.replace(' ', '-')]: true
    });

    return (
        <React.Fragment>
            <tr className="list-gear-large">
                <td width="10%">
                    {numberOfUserImage && numberOfUserImage.length > 0
                        ? <img src={numberOfUserImage[0]} className="gear-img" alt=""/>
                        : null
                    }
                </td>
                <td className="gear button-tablet " width="26%">
                    <p className="gear_name_first"><Link to={`/gear/${gearid}`}>{model + ' ' + brand}</Link></p>
                    <p className="theme-text-small text-muted gear_name_second">{categoryName}</p>
                    <button className={btnClass}>{status}</button>
                </td>
                <td className="table-btn button-desktop" width="21.9%">
                    <button className={`${btnClass} gear_button_available`}>{status}</button>
                </td>
                <td width="18%" className="span-tablet "><span>Price Per day</span><span
                    className="gear_price_day">${pricePerDay}</span></td>
                <td width="12%" className="span-tablet "><span>Amount</span><span
                    className="gear_price_amount">${pricePerDay}</span></td>
                <td width="3%" className="d-md-none d-lg-table-cell ">
                    <Link to={`/editgear/${gearid}`}><span className="edit_gear"/></Link>
                </td>
                <td width="5.5%" className="d-md-none d-lg-table-cell">
                    <span className="close" onClick={() => onDelete(gearid)}/>
                </td>
                <td className="d-lg-none button_md_edit_del" width="8.8%">
                    <div>
                        <Link to={`/editgear/${gearid}`}><span className="edit_gear"/></Link>
                    </div>
                    <div>
                        <span className="close" onClick={() => onDelete(gearid)}/>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )
};

class ListGear extends Component {
    constructor(props) {
        super(props);

        this.pageSize = 3;
        this.pageCount = 1;

        this.state = {
            gear_list: this.props.listGears,
            currentPage: 1,
            loading: true,
            deleting: false,
        };

        this.doGetListGears();
    }

    componentWillReceiveProps(props) {
        if (this.state.gear_list !== props.listGears) {
            this.setState({gear_list: props.listGears});
        }
    }

    calcPageCount = (total_count, page_size) => {
        return Math.ceil(total_count / page_size);
    };

    doGetListGears = async () => {
        try {
            this.setState({loading: true});
            await getListGears();
            this.pageCount = this.calcPageCount(this.props.listGears.length, this.pageSize);
            this.setState({
                loading: false
            });
        } catch {
            // handleError('Gear is not added to cart!');
        }
    };

    handleDelete = async (gearid) => {
        this.setState({deleting: true});
        const ret = await deleteGear({gearid});
        if (ret) {
            const new_list = this.state.gear_list.filter(item => item.gearid !== gearid);
            let cur_page = this.state.currentPage;
            this.pageCount = this.calcPageCount(new_list.length, this.pageSize);

            if (this.state.currentPage > this.pageCount) {
                cur_page = this.pageCount;
            }
            this.setState(() => ({gear_list: new_list, currentPage: cur_page}), () => {
                ToastsStore.info("Gear was deleted!");
            });
        } else {
            ToastsStore.error("Gear was not deleted!");
        }
        this.setState({deleting: false});
    };

    handleClick = async (e, page_num) => {
        this.setState({currentPage: page_num});
    };

    getPageGears = () => {
        const { currentPage } = this.state;
        const pageSize = this.pageSize;

        return this.state.gear_list.filter((item, key) =>
            (key >= (currentPage-1)*pageSize) && (key <= currentPage*pageSize - 1));
    };

    render() {
        if (this.state.loading) {
            return <BarLoader color="#F82462" height="5"/>
        }
        else {
            const { currentPage } = this.state;
            const gear_list = this.getPageGears();
            return (
                <React.Fragment>
                    {
                        this.state.deleting ? <CustomSpinner/> : null
                    }
                    <div className="list-gear">
                        <div className="list-gear-head">
                            <Container>
                                <Row>
                                    <Col>
                                        <Breadcrumb>
                                            <Urllink_class name="Home Page"/>
                                            <span className="space_slash_span">/</span>
                                            <BreadcrumbItem active>List Gear</BreadcrumbItem>
                                        </Breadcrumb>

                                        <div className="d-none d-lg-flex align-items-center ">
                                            <h2 className="theme-page-title">List Gear</h2>
                                            <button className="theme-btn theme-btn-primary theme-btn-link ml-auto">
                                                <Link to="/addgear"><span className="fa fa-plus"/>&nbsp; Add Gear</Link>
                                            </button>
                                        </div>
                                    </Col>

                                </Row>
                                <h2 className="d-flex d-lg-none theme-page-title list-gear-title">List Gear</h2>
                                <button
                                    className="d-flex d-lg-none theme-btn theme-btn-primary theme-btn-link ml-auto add-gear-btn">
                                    <Link to="/addgear"><span className="fa fa-plus"/>&nbsp; Add Gear</Link>
                                </button>
                            </Container>
                        </div>
                        <Container>
                            <div className="list-gear-body">
                                {!gear_list.length ? (
                                        <EmptyActivity e_name="Add Gear" e_path="/addgear" e_title="YOUR LIST GEAR IS EMPTY"
                                                       e_img_name="cart"/>
                                    ) :
                                    (
                                        <div className="wrraper">
                                            <Fragment>
                                                <Table className="listing-data-slice">
                                                    <thead className="table-head">
                                                    <tr className="text-muted theme-text-bold">
                                                        <th/>
                                                        <th>Name & Category</th>
                                                        <th>Status</th>
                                                        <th>Price Per day</th>
                                                        <th>Amount</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th/>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        gear_list.map((data, i) => {
                                                        return <ListGearItem listItem={data} key={i}
                                                                             onDelete={this.handleDelete}/>;
                                                    })}
                                                    </tbody>
                                                </Table>
                                                <Pagination aria-label="Page navigation example">
                                                    <PaginationItem disabled={currentPage <= 1}>
                                                        <PaginationLink
                                                            onClick={e => this.handleClick(e, currentPage - 1)}
                                                            previous
                                                        />
                                                    </PaginationItem>

                                                    {[...Array(this.pageCount)].map((page, i) =>
                                                        <PaginationItem active={i + 1 === currentPage} key={i}>
                                                            <PaginationLink onClick={e => this.handleClick(e, i+1)}>
                                                                {i + 1}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    )}

                                                    <PaginationItem disabled={currentPage >= this.pageCount}>
                                                        <PaginationLink
                                                            onClick={e => this.handleClick(e, currentPage + 1)}
                                                            next
                                                        />
                                                    </PaginationItem>

                                                </Pagination>
                                            </Fragment>
                                        </div>
                                    )}

                            </div>
                        </Container>
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = state => ({
    listGears: state.app.listGears,
    categories: state.app.categories
});

export default connect(mapStateToProps)(ListGear);
