import React, { Component } from 'react';

class CustomInputWithButton extends Component {
  constructor(props) {
    super(props);
    
    let {id, type, value, editable} = this.props.item;
    this.state = {
      id,
      type,
      value,
      editable
    };
  }
  
  handleClick = () => {
    let {type} = this.state;
    let {onAdd, onRemove} = this.props;
    
    if (type === 0) {
      this.setState({editable: false, type: type + 1}, () => onAdd(this.state));
    } else if (type === 1) {
      onRemove(this.state);
    }
  };
  
  render() {
    let {type, value, editable} = this.state;
    
    return (
      <div className='input-with-button-container'>
        <input
          type='text'
          value={value}
          onChange={(e) => this.setState({value: e.target.value || ''})}
          disabled={editable ? '' : 'disabled'}
        />
        <div className='right-button' onClick={this.handleClick}>
          {type === 1 ?
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7.45019 7.5M13.9004 14L7.45019 7.5M7.45019 7.5L13.9004 1L1 14" stroke="#f82462"/>
            </svg> :
            <span>Add</span>
          }
        </div>
      </div>
    )
  }
}

export default CustomInputWithButton;