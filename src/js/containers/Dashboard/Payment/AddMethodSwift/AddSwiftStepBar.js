import React, {Component} from 'react';

class AddSwiftStepBar extends Component {
  render() {
    const {curStep} = this.props;
    const label = ['SWIFT', 'IBAN', 'CONFIRM'];
    
    return [1, 2, 3].map((i, index) => (
      <div key={i} className={index <= curStep ? 'add-gear-progress-item active' : 'add-gear-progress-item'}>
        {
          function () {
            if (index === curStep) {
              return <i className='fas fa-dot-circle' aria-hidden="true"/>;
            } else if (index < curStep) {
              return <i className='fas fa-check-circle' aria-hidden="true"/>;
            } else {
              return <i className='far fa-circle' aria-hidden="true"/>;
            }
          }()
        }
        <div className="theme-text-small">{label[index]}</div>
      </div>
    ));
  }
}

export default AddSwiftStepBar;