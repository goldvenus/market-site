import React, {Component} from "react";
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'
import IsolatedScroll from 'react-isolated-scroll';

let suggestions = [];

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
        return suggestions;
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return suggestions.filter(language => regex.test(language));
}

function getSuggestionValue(suggestion) {
    return suggestion;
}

function renderSuggestion(suggestion, { query }) {
    const matches = AutosuggestHighlightMatch(suggestion, query);
    const parts = AutosuggestHighlightParse(suggestion, matches);

    return (
        <span>
          {parts.map((part, index) => {
              const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;
              return (
                  <span className={className} key={index}>
                    {part.text}
                  </span>
              );
          })}
        </span>
    );
}

function renderSuggestionsContainer({ containerProps, children }) {
    const { ref, ...restContainerProps } = containerProps;
    const callRef = isolatedScroll => {
        if (isolatedScroll !== null) {
            ref(isolatedScroll.component);
        }
    };

    return (
        <IsolatedScroll ref={callRef} {...restContainerProps}>
            {children}
        </IsolatedScroll>
    );
}

class CustomAutosuggest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: this.props.suggestions
        };
        suggestions = this.props.suggestions;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.suggestions)
            suggestions = nextProps.suggestions;
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleChange = (event, { newValue, method }) => {
        this.setState({value: newValue});
        this.props.handleChange(newValue);
    };

    render() {
        const inputProps = {
            value: this.state.value,          // usually comes from the application state
            onChange: this.handleChange,       // called every time the input value changes
            // onBlur,         // called when the input loses focus, e.g. when user presses Tab
            placeholder: 'Product Name'
        };

        return (
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                highlightFirstSuggestion={true}
                renderSuggestionsContainer={renderSuggestionsContainer}
            />
        );
    }
}

export default CustomAutosuggest;
