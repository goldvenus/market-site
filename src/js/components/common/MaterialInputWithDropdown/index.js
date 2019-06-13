import React from 'react';
import $ from 'jquery';
import CustomInputWithIcon from "../StyledComponent/CustomInputWithIcon";

class MaterialInputWithDropdown extends React.Component {
  state = {
    isDropdownOpen: false,
    activeIndex: 0,
    isFocused: false,
    _mounted: false
  };

  itemsRef = [];
  wrapperRef = null;
  dropdownWrapperRef = null;
  // addonWrapperRef = null;
  itemWrapperRef = null;
  curPos = 100;

  componentDidMount() {
    this._mounted = true;
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  
  componentWillReceiveProps(nextProps, nextState) {
    let {
      dropdownItems
    } = nextProps;

    if (dropdownItems.length !== this.props.dropdownItems) {
      this._mounted && this.setState({activeIndex: 0});
    }
    if (this.state.isFocused && nextProps.value) {
      this._mounted && this.setState({isDropdownOpen: true});
    }
  }
  
  componentWillUnmount() {
    this._mounted = false;
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target) && this.dropdownWrapperRef && !this.dropdownWrapperRef.contains(e.target)) {
      this._mounted && this.setState({
        isDropdownOpen: false,
        isFocused: false,
        activeIndex: 0
      });
    }
  };

  handleFocus = e => {
    if (this._mounted) {
      if (this.props.value) {
        this.setState({
          isDropdownOpen: true,
          isFocused: true
        });
      } else {
        this.setState({
          isDropdownOpen: false,
          isFocused: true
        });
      }
    }
  };
  
  handleBlur = async (e) => {
    setTimeout(() =>
      this._mounted && this.setState({
        isDropdownOpen: false,
        isFocused: false
      }), 100
    );
    e.preventDefault();
  };
  
  handleKeyDown = async e => {
    let keyCode = e.keyCode;
    // let addOnHeight = (this.addonWrapperRef && this.addonWrapperRef.offsetHeight) || 0;
    let addOnHeight = 0;
    
    if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13) {
      return;
    } else if (e.keyCode === 13) {
      // when hit enter, change search value to currently selected item, and then perform search
      await this.props.onHandleChange({ target: { value: (this.props.value && this.props.dropdownItems[this.state.activeIndex]) || '' } });
      this.props.onSearch && this.props.onSearch();
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
    this._mounted && this.setState({activeIndex});
  };
  
  handleChange = e => {
    if (!e.target.value || e.target.value === '') {
      this._mounted && this.setState({
        isDropdownOpen: false
      });
    }
    this.props.onHandleChange({ target: {value: e.target.value } });
  };

  handleSelectItem = value => {
    let {onHandleChange} = this.props;
    if (onHandleChange) {
      onHandleChange({ target: { value } });
    }
  
    this._mounted && this.setState({
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
      onSearch,
      onHandleChange,
      ...props
      // dropdownAddons,
    } = this.props;
    
    return (
      <div className="material-input-with-dropdown" ref={ref => {this.wrapperRef = ref}}>
        {/*<Input*/}
          {/*className={classes.root}*/}
          {/*id="adornment-amount"*/}
          {/*value={value}*/}
          {/*onChange={(e) => this.handleChange(e)}*/}
          {/*onFocus={this.handleFocus}*/}
          {/*onBlur={this.handleBlur}*/}
          {/*onKeyDown={this.handleKeyDown}*/}
          {/*startAdornment={*/}
            {/*<InputAdornment position="start">*/}
              {/*{label === 'Search' ?*/}
                {/*<IconSearch/> :*/}
                {/*<img src='/images/Icons/marker/marker-input.svg' alt=''/>*/}
              {/*}*/}
            {/*</InputAdornment>*/}
          {/*}*/}
          {/*{...props}*/}
        {/*/>*/}
        <CustomInputWithIcon
          value={value}
          handleChange={(e) => this.handleChange(e)}
          handleFocus={this.handleFocus}
          handleBlur={this.handleBlur}
          handleKeyDown={this.handleKeyDown}
          label={label}
        />

        {isDropdownOpen &&
        <div className="material-input-dropdown" id='dropdown-wrapper' ref={ref => this.dropdownWrapperRef = ref}>
          {/*{!!dropdownAddons &&*/}
          {/*<div className="material-input-dropdown-addon" ref={ref => this.addonWrapperRef = ref}>*/}
            {/*{dropdownAddons}*/}
          {/*</div>*/}
          {/*}*/}
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
