import React from 'react';
import $ from 'jquery';
import MaterialInput from '../MaterialInput/index';

class MaterialInputWithDropdown extends React.Component {
  state = {
    isDropdownOpen: false,
    activeIndex: 0,
    isFocused: false
  };

  itemsRef = [];
  dropdownWrapperRef = null;
  addonWrapperRef = null;
  itemWrapperRef = null;
  curPos = 100;

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillReceiveProps(nextProps, nextState) {
    let {
      dropdownItems
    } = nextProps;

    if (dropdownItems.length !== this.props.dropdownItems) {
      this.setState({activeIndex: 0});
    }
    if (this.state.isFocused) {
      this.setState({isDropdownOpen: true});
    }
  }
  
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (this.dropdownWrapperRef && !this.dropdownWrapperRef.contains(e.target)) {
      this.setState({
        isDropdownOpen: false,
        isFocused: false
      });
    }
  };

  handleFocus = e => {
    this.setState({
      isDropdownOpen: true,
      isFocused: true
    });
  };
  
  handleBlur = e => {
    setTimeout(() => this.setState({
      isDropdownOpen: false,
      isFocused: false
    }), 50);
    e.preventDefault();
  };
  
  handleKeyDown = e => {
    let keyCode = e.keyCode;
    let addOnHeight = (this.addonWrapperRef && this.addonWrapperRef.offsetHeight) || 0;
    
    if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13) {
      return;
    } else if (e.keyCode === 13) {
      this.handleSelectItem(this.props.dropdownItems[this.state.activeIndex]);
      if (this.props.onSearch) {
        this.props.onSearch();
      }
      return;
    }
    
    e.preventDefault();
    
    if (!this.itemsRef) {
      return;
    }
  
    let {activeIndex} = this.state;
    let {dropdownItems} = this.props;
    let curItem = this.itemsRef[activeIndex];
    
    if (this.curPos < addOnHeight) {
      this.curPos = addOnHeight;
    }
    
    if (keyCode === 38) {
      activeIndex --;
      
      if (activeIndex < 0) {
        activeIndex = dropdownItems.length - 1;
        this.curPos = addOnHeight + this.itemWrapperRef.offsetHeight - curItem.offsetHeight - 30;
      } else {
        this.curPos -= curItem.offsetHeight;
      }
    } else if (keyCode === 40) {
      activeIndex ++;
      
      if (activeIndex >= dropdownItems.length) {
        activeIndex = 0;
        this.curPos = addOnHeight;
      } else {
        this.curPos += curItem.offsetHeight;
      }
    }
    $("#dropdown-wrapper").scrollTop(this.curPos);
    this.setState({activeIndex});
  };
  
  handleChange = e => {
    this.props.onChange({ target: {value: e.target.value } });
  };

  handleSelectItem = value => {
    let {onChange} = this.props;
    if (onChange) {
      onChange({ target: { value } });
    }

    this.setState({
      isDropdownOpen: false
    });
  };

  render() {
    const {
      isDropdownOpen,
      activeIndex
    } = this.state;

    const {
      label,
      value,
      dropdownItems,
      dropdownAddons,
      ...props
    } = this.props;

    return (
      <div className="material-input-with-dropdown" ref={ref => {this.wrapperRef = ref}}>
        <MaterialInput
          label={label}
          value={value}
          onChange={(e) => this.handleChange(e)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={(e) => this.handleKeyDown(e)}
          {...props}
        />

        {isDropdownOpen &&
        <div className="material-input-dropdown" id='dropdown-wrapper' ref={ref => this.dropdownWrapperRef = ref}>
          {!!dropdownAddons &&
          <div className="material-input-dropdown-addon" ref={ref => this.addonWrapperRef = ref}>
            {dropdownAddons}
          </div>
          }
          {!!(dropdownItems && dropdownItems.length) &&
          <div className="material-input-dropdown-list" ref={ref => this.itemWrapperRef = ref}>
            {dropdownItems.map((val, key) => (
              <div
                key={key}
                className={`material-input-dropdown-item ${activeIndex === key ? 'active' : ''}`}
                onClick={() => this.handleSelectItem(val)}
                ref={ref => this.itemsRef[key] = ref}
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
