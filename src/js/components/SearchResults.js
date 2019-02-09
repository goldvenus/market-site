import React, { Component } from 'react';
import { connect } from "react-redux";
import CardView from './Rent Gear/RG_card_view';
class SearchResults extends Component {
  render() {
    const { searchResults } = this.props;
    return (
      <div className="centered-content">
        <h3>Search Results ({ searchResults.length})</h3>
        { searchResults.length > 0 ?
        <div className="search-results-container">
          { searchResults.map(result => (
              <CardView gear_detail={result} />
            ))
          }
        </div> : <div>No results found</div>
      }
      </div>
    );
  }
}

export default connect((store) => {
  return {
    searchResults: store.app.searchResults
  };
})(SearchResults);
