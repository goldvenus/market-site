import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input} from 'reactstrap';

class CustomInput extends Component {
  onInputChange(e) {
    const { onChange } = this.props;
    const value = e.target.value;

    if(onChange) {
      onChange(value);
    }
  }

  render() {
    const { placeholder, type } = this.props;
    return (
      <div className="custom-input">
        <Input placeholder={ placeholder } type={type} onChange={ this.onInputChange.bind(this) } />
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(CustomInput);
