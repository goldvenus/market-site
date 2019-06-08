import React, {Component} from 'react';
import CustomInput from '../CustomInput';
import {Form} from 'reactstrap';

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: '',
      locationText: '',
    }
  }
  
  render() {
    const {mobileStyle, onSearchTextChange, searchText} = this.props;
    
    return (
      <div className="search" style={mobileStyle}>
        <Form className="theme-form">
          <div className="search-input">
            <CustomInput
              icon="fa-search"
              placeholder="Search"
              type="text"
              label="Search"
              onChange={(value) => {
                onSearchTextChange({target: {value}}, 'searchText');
              }}
              value={searchText}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default Search;