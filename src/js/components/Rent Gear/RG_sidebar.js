import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Search from './search';
import $ from 'jquery';
import {Link, withRouter} from "react-router-dom";

class Sidebar extends Component {

  categoryHandler() {
    if($('.category-mobile').hasClass('active')){
      $('.category-mobile').removeClass('active') ;
    } else {
      $('.category-mobile').addClass('active') ;
    }
  }

  searchHandler() {
    if($('.catagory-header .search').hasClass('s-active')){
      $('.catagory-header .search').removeClass('s-active') ;

    } else {
      $('.catagory-header .search').addClass('s-active') ;
    }
  }

  componentDidMount() {
    $(function() {
      $(".rent-gear-sidebar-link").click(function () {
        $(".category-mobile").removeClass('active');
        $(".catagory-header .category-action-btn").html($(this).html() + "<i className='fa fa-angle-down' aria-hidden='false'></i>");
      })
    });
  }

  render() {
    const { categories, category } = this.props;
    if (!categories || !category)
      return null;
    const {location: {pathname}} = this.props;

    return (
      <aside className="sidebar">
        {/*<div className="sidebar-title d-none d-lg-flex">*/}
          {/*All Categories*/}
        {/*</div>*/}
        <div className="sidebar-wrapper d-none d-lg-flex">
          <ListGroup>
            <ListGroupItem value='all' key={0}>
              <Link className={`${pathname==='/rentgear/all' ? 'item-active rent-gear-sidebar-link' : ''}`} to='/rentgear/all'>
                All Categories
              </Link>
            </ListGroupItem>
            {categories.map((element, index) =>
              <ListGroupItem value={element} key={index+1}>
                <Link className={`${this.props.category === element.replace(' ', '') ? 'item-active rent-gear-sidebar-link' : ''}`} to={`/rentgear/${element.replace(` `, ``)}`}>
                  {element}
                </Link>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
        <div className="category-mobile d-block d-lg-none">
          <div className="catagory-header">
            <button className="sidebar-title   category-action-btn" onClick={this.categoryHandler}>
              All Categories
              <i className="fa fa-angle-up" aria-hidden="true"/>

            </button>
            <button className="sidebar-title   search-action-btn" onClick={this.searchHandler}>
             <i className="fa fa-search"/>
            </button>
            <Search/>
          </div>

          <ListGroup>
            {categories.map((element, index) =>
              <ListGroupItem value={element} key={index}>
                <Link className={`${this.props.sideid === index ? 'item-active rent-gear-sidebar-link' : 'rent-gear-sidebar-link'}`} to={`/rentgear/${element.replace(` `, ``)}`}>
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
