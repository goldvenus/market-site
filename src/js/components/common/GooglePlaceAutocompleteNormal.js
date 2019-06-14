import React, {Component} from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class GooglePlaceAutocompleteNormal extends Component {
  render() {
    let {onPlaceKeyDown, initialValue, onPlaceChange, restriction, showIcon, placeholder, types, customClass} = this.props;
    return (
      <GooglePlacesAutocomplete
        initialValue={initialValue || ''}
        // loader={<img className='google-place-loader' src='/images/Icons/marker/marker-input.svg' />}
        placeholder={placeholder || ''}
        autoComplete={true}
        autocompletionRequest={{
          // bounds: Array<LatLng>,
          componentRestrictions: {
            country: restriction.country
          },
          // location: LatLng,
          // offset: Number,
          // radius: Number,
          types: types
        }}
        onSelect={onPlaceChange}
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
      />
    )
  }
}

export default GooglePlaceAutocompleteNormal;