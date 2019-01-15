import React, { Component } from 'react';

import { phrasesList } from './constants/data';
import { getResultList, getMatchingValue } from './utils/search';
import { sendValue } from './sources';

class LineInput extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      startInputTime: null,
      matchingValue: null,
      isOpenSuggestions: false,
      searchResult: phrasesList
    };

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onSuggestionChoice = this.onSuggestionChoice.bind(this);
    this.onSendValue = this.onSendValue.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    const { value } = this.state;
    const { value: newValue } = nextState;

    if (!value && newValue) {
      this.setState({
        startInputTime: new Date()
      });
    }

    if (value && !newValue) {
      this.setState({
        startInputTime: null
      });
    }
  }

  onChange(e) {
    const { value } = e.target;

    this.setState({
      value,
      searchResult: getResultList(value),
      matchingValue: getMatchingValue(value)
    });
  }

  onFocus(e) {
    this.setState({
      isOpenSuggestions: true
    });
    e.target.addEventListener('keypress', this.onEnter);
    document.addEventListener('click', this.clickHandler);
  }

  onBlur(e) {
    e.target.removeEventListener('keypress', this.onEnter);
  }

  onEnter(e) {
    if (e.keyCode === 13) {
      this.onSendValue('enter');
    }
  }

  onSuggestionChoice(phrase) {
    this.setState({
      matchingValue: phrase,
      value: phrase.text,
      isOpenSuggestions: false
    });
  }

  onSendValue(type) {
    const { value, matchingValue, startInputTime } = this.state;

    sendValue(value, matchingValue, type, startInputTime);
  }

  clickHandler(e) {
    const lineInput = document.querySelector('.line-input');

    if (!lineInput.contains(e.target)) {
      this.setState({
        isOpenSuggestions: false
      });

      document.removeEventListener('click', this.clickHandler);
    }
  }

  clearInput() {
    const lineInput = document.querySelector('#line-input');

    lineInput.focus();

    this.setState({
      value: '',
      matchingValue: null,
      searchResult: phrasesList
    });
  }

  render() {
    const { isOpenSuggestions, searchResult, value } = this.state;

    return (
      <section className="line-input">
        <div className="line-input__wrapper">
          <button
            className="line-input__icon"
            onClick={() => this.onSendValue('click')}
          >

          </button>
          <input
            id="line-input"
            className="line-input__field"
            type="text"
            placeholder="Введите слово для поиска"
            value={value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <button
            className="line-input__clear"
            onClick={this.clearInput}
          >

          </button>
          <button
            className="line-input__find"
            onClick={() => this.onSendValue('click')}
          >
            Найти
          </button>
        </div>
        {isOpenSuggestions && (
          <div className="line-input__suggestions">
            <ul className="line-input__suggestions-list">
              {searchResult.length !== 0 ? searchResult.map(item => (
                <li
                  className="line-input__suggestions-item"
                  key={item.id}
                  onClick={() => this.onSuggestionChoice(item)}
                >
                  {item.text}
                </li>
              )) :
              <li>No result</li>
              }
            </ul>
          </div>
        )}
      </section>
    );
  }
}

export default LineInput;
