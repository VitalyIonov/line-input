import React from 'react';
import PropTypes from 'prop-types';

import MarkedText from './Marked-text';

const Suggestions = ({ value, isOpenSuggestions, searchResult, changeValue, switchSuggestionsBlock }) => {
  const onSuggestionChoice = phrase => () => {
    changeValue(phrase.text);
    switchSuggestionsBlock(false);
  };

  if (!isOpenSuggestions) {
    return null;
  }

  return (
    <div className="line-input__suggestions">
      <ul className="line-input__suggestions-list">
        {searchResult.length !== 0 ? searchResult.map(item => (
          <li
            className="line-input__suggestions-item"
            key={item.id}
          >
            <button
              className="line-input__suggestions-button"
              onClick={onSuggestionChoice(item)}
            >
              <MarkedText
                text={item.text}
                value={value}
              />
            </button>
          </li>
          )) :
        <li className="line-input__suggestions-item line-input__suggestions-item--no-result">
          Нет результатов
        </li>
        }
      </ul>
    </div>
  );
};

Suggestions.propTypes = {
  value: PropTypes.string.isRequired,
  isOpenSuggestions: PropTypes.bool.isRequired,
  searchResult: PropTypes.array,
  changeValue: PropTypes.func.isRequired,
  switchSuggestionsBlock: PropTypes.func.isRequired
};

export default Suggestions;
