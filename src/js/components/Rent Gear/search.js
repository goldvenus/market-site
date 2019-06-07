import React, {Component} from 'react';
import CustomInput from '../CustomInput';
import {Form} from 'reactstrap';
import {rentGearProductList} from '../../core/actions/gear.action';

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: '',
      locationText: '',
    }
  }
  
  render() {
    const {category, mobileStyle} = this.props;
    
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
                console.log(value);
                this.setState({searchText: value}, () => {
                  rentGearProductList({
                    categoryName: category,
                    product_region: this.state.locationText,
                    brand: this.state.searchText
                  });
                })
              }}
              value={this.state.searchText}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default Search;