import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Search from './search';
import $ from 'jquery';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

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

  handleClick(index, name) {
    this.props.callback(name);
  }
  render() {
    const { categories } = this.props.app;
    if (!categories) return null;

    return (
      <aside className="sidebar">
        <div className="sidebar-title d-none d-lg-flex">
          All Categories
        </div>
        <div className="sidebar-wrapper d-none d-lg-flex">
          <ListGroup>
            {categories.map((element, index) =>
              <ListGroupItem onClick={this.handleClick.bind(this, index, element.categoryName)} value={element}
                key={index}>
                <div className={`${this.props.sideid === index && 'item-active'}`}>
                  {element.categoryName}
                </div>
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
              <ListGroupItem onClick={this.handleClick.bind(this, index, element.categoryName)} value={element}
                key={index}>
                <div className={`${this.props.sideid === index && 'item-active'}`}>
                  {element.categoryName}
                </div>
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

export default connect(({ app }) => {
  return {
    app
  };
})(Sidebar);
