import React, {Component} from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class GooglePlaceAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.items = [];
    this.activeIndex = -1;
    this.state = {
      initialValue: this.props.initialValue
    }
  }
  handleSetItems = (place, places) => {
    if (this.items === places)
      return;
    this.items = places;
    this.activeIndex = -1;
  };
  handlePlaceChange = (place, places) => {
    place && this.props.onPlaceChange(place);
    this.items = places;
    this.setState({
      initialValue: place && place.terms.map(item => item.value).join(', '),
      activeIndex: -1
    });
  };
  handlePlaceKeyDown = (e) => {
    let activeIndex = this.activeIndex;
    if (e.keyCode === 40) {
      activeIndex ++;
      if (activeIndex >= this.items.length)
        activeIndex = 0;
    } else if (e.keyCode === 38) {
      if (activeIndex <= 0)
        activeIndex = this.items.length - 1;
      else
        activeIndex --;
    } else if (e.keyCode === 13) {
      this.props.onPlaceChange(this.items[activeIndex], true);
      return;
    }
    this.props.onPlaceKeyDown(e);
    this.activeIndex = activeIndex;
    this.setState({
      initialValue: e.target.value,
    });
  };
  render() {
    let activeIndex = this.activeIndex;
    let {initialValue, restriction, types, showIcon, placeholder, customClass} = this.props;

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
        renderInput={(props) => (
          <div className={`google-places-input-wrapper custom-input ${customClass}`}>
            {showIcon &&
            <img className='google-place-icon' src='/images/Icons/marker/marker-input.svg' alt=''/>}
            <input
              className='google-places-input'
              onKeyUp={(e) => this.handlePlaceKeyDown(e)}
              {...props}
            />
          </div>
        )}
        renderSuggestions={(active, suggestions) => {
          this.handleSetItems(active, suggestions);
          return (
            <div className="suggestions-container">
              {
                suggestions.map((suggestion, key) => (
                  <div className={`suggestion-container ${activeIndex === key ? 'active' : ''}`} key={key}>
                    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.5 5.05556C9.5 5.63352 9.23211 6.45483 8.76861 7.41339C8.31353 8.35454 7.70195 9.36452 7.08315 10.2987C6.46552 11.2311 5.84695 12.0787 5.38232 12.6937C5.23839 12.8841 5.10941 13.0521 5 13.1931C4.89059 13.0521 4.76161 12.8841 4.61768 12.6937C4.15305 12.0787 3.53448 11.2311 2.91685 10.2987C2.29805 9.36452 1.68647 8.35454 1.23139 7.41339C0.767891 6.45483 0.5 5.63352 0.5 5.05556C0.5 2.53437 2.51991 0.5 5 0.5C7.48009 0.5 9.5 2.53437 9.5 5.05556Z"
                        stroke="#252525" strokeOpacity="0.7"/>
                      <path
                        d="M7.19223 5.05547C7.19223 6.288 6.20551 7.2777 4.99992 7.2777C3.79434 7.2777 2.80762 6.288 2.80762 5.05547C2.80762 3.82295 3.79434 2.83325 4.99992 2.83325C6.20551 2.83325 7.19223 3.82295 7.19223 5.05547Z"
                        stroke="#252525" strokeOpacity="0.7"/>
                    </svg>
                    <div className='suggestion' onClick={() => {
                      this.handlePlaceChange(suggestion, suggestions);
                    }}>
                      {suggestion.description}
                    </div>
                  </div>
                ))
              }
            </div>)
          }
        }
      />
    )
  }
}

export default GooglePlaceAutocomplete;