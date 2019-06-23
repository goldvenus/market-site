import React, {Component} from 'react';

class CustomStepBar extends Component {
  render() {
    const {curStep, totalStep, result} = this.props;
    const label = !this.props.label ? (new Array(totalStep)).fill('') : this.props.label;
    
    return [1, 2, 3].map((i, index) => (
      <div key={i} className={index <= curStep ? 'step-item active' : 'step-item'}>
        {
          function () {
            console.log(result[index]);
            if (result && result[index] === 1) {
              return <i className='fas fa-check-circle' style={{color: '#1CDB74'}} aria-hidden="true"/>;
            } else if (result && result[index] === -1) {
              return <i className="fas fa-times-circle" style={{color: '#f82462'}} aria-hidden="true"/>;
            } else if (index >= curStep) {
              return <i className='fas fa-dot-circle' aria-hidden="true"/>;
            } else if (index < curStep) {
              return <i className='fas fa-dot-circle' aria-hidden="true"/>;
            }
          }()
        }
        <div className="theme-text-small">{label[index]}</div>
      </div>
    ));
  }
}

export default CustomStepBar;