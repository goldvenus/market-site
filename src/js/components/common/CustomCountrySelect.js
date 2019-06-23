import React from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: 'none',
    backgroundColor: state.isSelected ? '#eaeaea' : state.isFocused ? '#F7F7F7' : state.isClicked ? '#F7F7F7' : 'white',
    color: '#252525',
    cursor: 'pointer',
    padding: 10,
  }),
  container: () => ({
    width: '60%',
    marginTop: '30px',
    borderBottom: 'solid 1px #eaeaea !important'
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: '100%',
    display: 'flex',
    cursor: 'pointer'
  }),
  indicatorsContainer: () => ({
    // backgroundColor: 'yellow'
  }),
  menu: (provided) => ({
    ...provided,
    position: 'relative',
    border: 'none'
  }),
  menuList: (provided) => ({
    ...provided,
    position: 'absolute',
    width: '100%'
  })
};
let options = countryList().getData();

const CustomCountrySelect = ({country, onHandleChange}) => (
  <Select
    options={options}
    value={country}
    onChange={(e) => onHandleChange({target: {value: e}}, 'country')}
    className='country-selector'
    styles={customStyles}
  />
);

export default CustomCountrySelect;