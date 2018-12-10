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
    const { placeholder, type ,label, value } = this.props;
    return (
      <div className="custom-input mr-2">
        <label htmlFor={label} className="theme-text-small label">{label}</label>
        <Input
          placeholder={ placeholder }
          type={type}
          onChange={ this.onInputChange.bind(this) }
          value={value}
          />
      </div>
    );
  }
}

export default connect((store) => {
  return {
  };
})(CustomInput);
