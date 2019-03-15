import React from 'react';

import MaterialInput from '../MaterialInput';

class MaterialInputWithDropdown extends React.Component {
  state = {
    isDropdownOpen: false,
  };

  wrapperRef = null;

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({
        isDropdownOpen: false,
      });
    }
  };

  handleFocus = e => {
    this.setState({
      isDropdownOpen: true,
    });
  };

  handleSelectItem = value => {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } });
    }

    this.setState({
      isDropdownOpen: false,
    });
  };

  render() {
    const {
      isDropdownOpen,
    } = this.state;

    const {
      label,
      value,
      onChange,
      dropdownItems,
      dropdownAddons,
      ...props
    } = this.props;

    return (
      <div className="material-input-with-dropdown" ref={ref => {this.wrapperRef = ref;}}>
        <MaterialInput
          label={label}
          value={value}
          onChange={onChange}
          onFocus={this.handleFocus}
          {...props}
        />

        {isDropdownOpen &&
        <div className="material-input-dropdown">
          {!!dropdownAddons &&
          <div className="material-input-dropdown-addon">
            {dropdownAddons}
          </div>
          }
          {!!(dropdownItems && dropdownItems.length) &&
          <div className="material-input-dropdown-list">
            {dropdownItems.map((val, key) => (
              <div
                className="material-input-dropdown-item"
                key={key}
                onClick={() => this.handleSelectItem(val)}
              >
                {val}
              </div>
            ))}
          </div>
          }
        </div>
        }
      </div>
    );
  }
}

export default MaterialInputWithDropdown;
