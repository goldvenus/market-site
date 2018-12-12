import React, { Component } from 'react';
import { connect } from "react-redux";
import { Input} from 'reactstrap';

class CustomInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlaceholder: false
    }
  }

  onInputChange(e) {
    const { onChange } = this.props;
    const value = e.target.value;

    this.setState({
      showPlaceholder: value.length > 0
    });

    if(onChange) {
      onChange(value);
    }
  }

  render() {
    const {showPlaceholder} = this.state;
    const { placeholder, type ,label, value, icon } = this.props;
    return (
      <div className= {icon ? "custom-input custom-input-with-icon" : "custom-input"}>
        <label htmlFor={label} className="theme-text-small label">{label}</label>
        { showPlaceholder ?
          <label className="placeholder-label">{placeholder}</label> : null
        }
        {
          icon ? <i className={"fa " + icon } /> : null
        }
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
