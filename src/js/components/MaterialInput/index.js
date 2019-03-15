import React from 'react';
import PropTypes from 'prop-types';

export class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }

  toggleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    const {
      showPassword,
    } = this.state;

    const {
      type,
      label,
      value,
      onChange,
      help,
      className,
      min,
      controls,
      noHelp,
      ...props
    } = this.props;

    const inputType =
      type === 'password'
        ? (showPassword ? 'text' : 'password')
        : (type || 'text');

    return (
      <div className={'material-input ' + (className || '')}>
        <input type={inputType} required="required" aria-label={label} min={min} value={value} onChange={onChange}
               step="0.00000001"
               {...props}
        />
        {type === 'password' &&
        <button className="toggle-password" onClick={this.toggleShowPassword} tabIndex="-1">
          {showPassword
            ? (<i className="fas fa-eye-slash"/>)
            : (<i className="fas fa-eye"/>)
          }
        </button>
        }
        {controls}
        <span className="highlight"/>
        <span className="bar"/>
        <label>{label}</label>
        {!noHelp &&
        <span className="help">{help}</span>
        }
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  help: PropTypes.string,
  className: PropTypes.string,
  min: PropTypes.any,
  controls: PropTypes.any,
};

export class TextField extends React.Component {
  render() {
    const {
      label,
      value,
      rows,
      onChange,
      help,
      className,
    } = this.props;

    return (
      <div className={'material-input ' + (className || '')}>
        <textarea required="required" value={value} onChange={onChange} rows={rows || 5}/>
        <span className="highlight"/>
        <span className="bar"/>
        <label>{label}</label>
        <span className="help">{help}</span>
      </div>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  help: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
