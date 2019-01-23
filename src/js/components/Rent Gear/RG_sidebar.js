import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem,
} from 'reactstrap';
import { fetchCategories } from '../../actions/app.actions';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      category_name: ""
    }
  }
  componentDidMount() {
    fetchCategories();
  }

  handleClick(index, name) {
    let activeIndex = this.state.activeIndex === index ? null : index;
    this.setState({
      activeIndex,
      category_name: name
    },
    ()=>{
      this.props.callback(this.state.category_name);
      }
    );
  }
  render() {
    const { categories } = this.props.app;

    return (
      <aside className="sidebar">
        <div className="sidebar-title">
          All Categories
        </div>
        <div className="sidebar-wrapper">
          <ListGroup>
            {categories.map((element, index) =>
              <ListGroupItem onClick={this.handleClick.bind(this, index, element.categoryName)} value={element}
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

Sidebar.protoTypes = {
  callback: PropTypes.func,
}

export default connect(({ app }) => {
  return {
    app
  };
})(Sidebar);
