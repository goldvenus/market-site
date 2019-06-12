import React from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const GooglePlaceAutocomplete = ({restriction, onPlaceChange, onPlaceKeyDown, types, initialValue, showIcon, placeholder, customClass}) => (

  <GooglePlacesAutocomplete
    initialValue={initialValue || ''}
    // loader={<img className='google-place-loader' src='/images/Icons/marker/marker-input.svg' />}
    placeholder={placeholder || ''}
    renderInput={(props) => (
      <div className={`google-places-input-wrapper custom-input ${customClass}`}>
        {showIcon &&
        <img className='google-place-icon' src='/images/Icons/marker/marker-input.svg' alt=''/>}
        <input
          className='google-places-input'
          onKeyUp={onPlaceKeyDown}
          {...props}
        />
      </div>
    )}
    onSelect={(item) => (
      onPlaceChange(item)
    )}
    autocompletionRequest = {{
      // bounds: Array<LatLng>,
      componentRestrictions: {
        country: restriction.country
      },
      // location: LatLng,
      // offset: Number,
      // radius: Number,
      types: types
    }}
  />
);

export default GooglePlaceAutocomplete;