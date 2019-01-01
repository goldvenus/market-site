import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container, Row, Col, Breadcrumb, Table, Form, ListGroup, ListGroupItem,
} from 'reactstrap';
import { fetchCategories } from '../../actions/app.actions';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }
  componentDidMount(){
    fetchCategories();
  }

  handleClick(index) {
    let activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({ activeIndex });
  }
  
  render() {
    const {categories} = this.props.app;
    
    return (
      <aside className="sidebar">
        <div className="sidebar-title">
          All Categories
        </div>
        <div className="sidebar-wrapper">
          <ListGroup>
            {categories.map((element, index) =>
              <ListGroupItem onClick={this.handleClick.bind(this, index)} value={element}
                key={index}>
                <div className={`${this.state.activeIndex === index && 'item-active'}`}>
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

export default connect(({ app }) => {
  return {
    app
  };
})(Sidebar);
