import React, { Component } from 'react';

import MarkedText from './marked-text';

import { phrasesList } from './constants/data';
import { getResultList, getMatchingValue } from './utils/search';
import { sendValue } from './sources';

class LineInput extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      isFocused: false,
      isHaveValue: false,
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
      matchingValue: getMatchingValue(value),
      isHaveValue: !!value
    });
  }

  onFocus(e) {
    const { value } = this.state;

    this.setState({
      isOpenSuggestions: true,
      isFocused: true,
      searchResult: getResultList(value)
    });
    e.target.addEventListener('keypress', this.onEnter);
    document.addEventListener('click', this.clickHandler);
  }

  onBlur(e) {
    this.setState({
      isFocused: false,
    });

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
    const lineInput = document.querySelector('#line-input');

    //closest
    if (!lineInput.contains(e.target)) {
      console.log(e.target);
      this.setState({
        isOpenSuggestions: false
      });

      document.removeEventListener('click', this.clickHandler);
    }
  }

  clearInput() {
    const lineInput = document.querySelector('#input');

    lineInput.focus();

    this.setState({
      value: '',
      matchingValue: null,
      searchResult: phrasesList
    });
  }

  render() {
    const { isOpenSuggestions, searchResult, value, isFocused, isHaveValue } = this.state;

    return (
      <section id="line-input" className="line-input">
        <div className="line-input__wrapper">
          <button
            className="line-input__icon"
            onClick={() => this.onSendValue('click')}
          />
          <input
            id="input"
            className="line-input__field"
            type="text"
            placeholder="Введите слово для поиска"
            value={value}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {isHaveValue && (
            <button
              className="line-input__clear"
              onClick={this.clearInput}
            />
          )}
          {(isHaveValue || isFocused) && (
            <button
              className="line-input__find"
              onClick={() => this.onSendValue('click')}
            >
              Найти
            </button>
          )}
        </div>
        {isOpenSuggestions && (
          <div className="line-input__suggestions">
            <ul className="line-input__suggestions-list">
              {searchResult.length !== 0 ? searchResult.map(item => {
                return (
                  <li
                    className="line-input__suggestions-item"
                    key={item.id}
                    onClick={() => this.onSuggestionChoice(item)}
                  >
                    <MarkedText
                      text={item.text}
                      value={value}
                    />
                  </li>
                  );
                }) :
              <li className="line-input__suggestions-item line-input__suggestions-item--no-result">
                No result
              </li>
              }
            </ul>
          </div>
        )}
      </section>
    );
  }
}

export default LineInput;
