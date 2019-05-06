import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Search from './search';
import $ from 'jquery';
import {Link} from "react-router-dom";

class Sidebar extends Component {

  categoryhandler() {
    if($('.category-mobile').hasClass('active')){
      $('.category-mobile').removeClass('active') ;
    } else {
      $('.category-mobile').addClass('active') ;
    }
  }

  searchhandler() {
    if($('.catagory-header .search').hasClass('s-active')){
      $('.catagory-header .search').removeClass('s-active') ;

    } else {
      $('.catagory-header .search').addClass('s-active') ;
    }
  }

  render() {
    const { categories, category } = this.props;
    if (!categories || !category)
      return null;

    return (
      <aside className="sidebar">
        <div className="sidebar-title d-none d-lg-flex">
          All Categories
        </div>
        <div className="sidebar-wrapper d-none d-lg-flex">
          <ListGroup>
            {categories.map((element, index) =>
              <ListGroupItem value={element} key={index}>
                <Link className={`${this.props.category === element.replace(' ', '') ? 'item-active' : ''}`} to={`/rentgear/${element.replace(` `, ``)}`}>
                  {element}
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
        <div className="category-mobile d-block d-lg-none">
          <div className="catagory-header">
            <button className="sidebar-title   category-action-btn" onClick={this.categoryhandler}>
              All Categories
              <i className="fa fa-angle-down" aria-hidden="true"></i>

            </button>
            <button className="sidebar-title   search-action-btn" onClick={this.searchhandler}>
             <i className="fa fa-search"></i>
            </button>
            <Search></Search>
          </div>

          <ListGroup>
            {categories.map((element, index) =>
              <ListGroupItem value={element} key={index}>
                <Link className={`${this.props.sideid === index ? 'item-active' : ''}`} to={`/rentgear/${element.replace(` `, ``)}`}>
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

export default Sidebar;
