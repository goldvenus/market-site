import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Container, Row, Col, Breadcrumb, Table, Form, ListGroup, ListGroupItem,
} from 'reactstrap';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
    this.categories = [
      "Cameras",
      "Lenses",
      "Audio Equipments",
      "Computer & Electronic",
      "Tipods, Stabilization & Rigs",
      "Drones",
      "Camera Accessories",
      "Studio Spaces",
      "Office Spaces",
      "Others"
    ];
  }

  handleClick(index) {
    let activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({ activeIndex });
  }
  
  render() {
    return (
      <aside className="sidebar">
        <div className="sidebar-title">
          All Categories
        </div>
        <div className="sidebar-wrapper">
          <ListGroup>
            {this.categories.map((element, index) =>
              <ListGroupItem onClick={this.handleClick.bind(this, index)} value={element}
                key={index}>
                <div className={`${this.state.activeIndex === index && 'item-active'}`}>
                  {element}
                </div>
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </aside>
    );
  }
}

export default connect((store) => {
  return {
  };
})(Sidebar);
