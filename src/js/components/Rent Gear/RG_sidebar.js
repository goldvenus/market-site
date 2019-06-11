import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Search from './search';
import {Link, withRouter} from "react-router-dom";

class Sidebar extends Component {
  state = {
    isActive: false,
    isSearch: false
  };

  categoryHandler = () => {
    this.setState({isActive: !this.state.isActive, isSearch: false});
  };

  searchHandler = () => {
    this.setState({isActive: false, isSearch: !this.state.isSearch});
  };

  render() {
    const { categories, category, onSearchTextChange, searchText } = this.props;
    const { isActive, isSearch } = this.state;
    
    if (!categories || !category)
      return null;
    const {location: {pathname}} = this.props;

    return (
      <aside className="sidebar">
        <div className="sidebar-wrapper d-none d-lg-flex">
          <ListGroup>
            <ListGroupItem value='all' key={0}>
              <Link className={`${pathname === '/rent-gear?type=all' ? 'item-active rent-gear-sidebar-link' : ''}`} to='/rent-gear?type=all'>
                All Categories
              </Link>
            </ListGroupItem>
            {categories.map((element, index) =>
              <ListGroupItem value={element} key={index+1}>
                <Link className={`${this.props.category === element.replace(/ /g, '') ? 'item-active rent-gear-sidebar-link' : ''}`} to={`/rent-gear?type=${element.replace(/ /g, '')}`}>
                  {element}
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
        <div className="category-mobile d-block d-lg-none">
          <div className="catagory-header">
            <button className="sidebar-title category-action-btn" onClick={this.categoryHandler}>
              All Categories
              <i className={`fa ${isActive ? 'fa-angle-down' : 'fa-angle-up'}`} aria-hidden="true"/>
            </button>
            <button className="sidebar-title search-action-btn" onClick={this.searchHandler}>
              <i className="fa fa-search"/>
            </button>
            {isSearch &&
            <Search
              category={category}
              searchText={searchText}
              mobileStyle={{display: 'block'}}
              onSearchTextChange={onSearchTextChange}
            />}
          </div>

          <ListGroup className={`category-container ${isActive ? 'active' : ''}`}>
            <ListGroupItem value='all' key={0}>
              <Link className={`${pathname === '/rent-gear?type=all' ? 'item-active rent-gear-sidebar-link' : ''}`} to='/rent-gear?type=all'>
                All Categories
              </Link>
            </ListGroupItem>
            {categories.map((element, index) =>
              <ListGroupItem value={element} key={index}>
                <Link className={`${this.props.sideid === index ? 'item-active rent-gear-sidebar-link' : 'rent-gear-sidebar-link'}`} to={`/rent-gear?type=${element.replace(/ /g, '')}`}>
                  {element}
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </aside>
    );
  }
}

Sidebar.protoTypes = {
  callback: PropTypes.func,
};

export default withRouter(Sidebar);
