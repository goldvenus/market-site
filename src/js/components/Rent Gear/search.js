import React, { Component } from 'react';
import { connect } from "react-redux";
import CustomInput from '../CustomInput';
import { Form} from 'reactstrap';

import { rentGearProductList } from '../../actions/app.actions';

class Search extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchText: '',
          locationText: '',
        }
      }
    
      componentDidMount(){
        rentGearProductList({
          categoryName: "Cameras",
          product_region: this.state.locationText,
          brand: this.state.searchText
        });
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