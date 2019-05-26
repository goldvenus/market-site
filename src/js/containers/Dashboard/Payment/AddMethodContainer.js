import React, {Component} from 'react'
import {connect} from "react-redux";
import AddMethodSwift from "./AddMethodSwift";
import AddMethodCreditCard from "./AddMethodCreditCard";
import {savePaymentMethod} from "../../../core/actions/payment.action";
import CustomSpinner from "../../../components/CustomSpinner";

class AddMethodContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedMode: 1 * this.props.match.params.id
    }
  }
  
  handleSelectMode = (val) => {
    this.setState({selectedMode: val});
  };
  
  handleSaveMethod = async (data) => {
    let res = await savePaymentMethod({...data, type: this.state.selectedMode});
    if (res) {
      this.props.history.push('/dashboard');
    }
  };
  
  render() {
    let {selectedMode} = this.state;
    let {isChanging} = this.props;
    
    return (
      <div className='container'>
        {isChanging && <CustomSpinner/>}
        <h3 className='add-method-heading'>
          <i className='fa fa-arrow-left' onClick={() => this.props.history.push('/dashboard')}/>
          {selectedMode === 1 ? 'Add Payment Method' : 'Add Payout Method'}
        </h3>
        <div className='wrapper-add-method'>
          <div className='method-select-tab-wrapper'>
            {selectedMode === 1 ?
              <div className='tab tab-selected' onClick={() => this.handleSelectMode(1)}>
                <span>CREDIT CARD</span>
                <span>Minimum - $50.00, Fees - 3.5%</span>
              </div> :
            selectedMode > 1 ?
              <div className='tab tab-selected' onClick={() => this.handleSelectMode(2)}>
                <span>SWIFT</span>
                <span>Minimum - $50.00, Fees - 3.5%</span>
              </div> : null
            }
          </div>
          <div className='method-select-tab-content'>
            {selectedMode === 1 ?
              <AddMethodCreditCard onSaveMethod={this.handleSaveMethod}/> :
              <AddMethodSwift onSaveMethod={this.handleSaveMethod}/>}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isChanging: state.payment.isChanging
});

export default connect(mapStateToProps)(AddMethodContainer);