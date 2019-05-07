import React, { Component } from 'react';
import CustomInput from '../CustomInput';
import { Form} from 'reactstrap';
import { rentGearProductList } from '../../core/actions/gear.action';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
          searchText: '',
          locationText: '',
        }
    }

    render() {
        const {catagory} = this.props;
        return (
            <div className="search">
              <Form className="theme-form">
                <div className="search-input">
                  <CustomInput icon="fa-search" placeholder="Search" type="text" label="Search" onChange={
                    (value) => {
                      this.setState({ searchText: value } , ()=>{
                        rentGearProductList({
                          categoryName: catagory,
                          product_region: this.state.locationText,
                          brand: this.state.searchText
                        });
                      })}}
                    value={this.state.searchText} />
                </div>
              </Form>
            </div>
         );
    }
}

export default Search;