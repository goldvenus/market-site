import React, {Component} from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class GooglePlaceAutocomplete extends Component {
  
  render() {
    let {restriction, onPlaceChange, onPlaceKeyDown, types, initialValue, showIcon} = this.props;
    return (
      <GooglePlacesAutocomplete
        initialValue={initialValue || ''}
        // loader={<img className='google-place-loader' src='/images/Icons/marker/marker-input.svg' />}
        placeholder=''
        renderInput={(props) => (
          <div className="google-places-input-wrapper custom-input">
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
    )
  }
}

export default GooglePlaceAutocomplete;