import React, { Component } from 'react';

import LineInput from './Line-input';
import Suggestions from './Suggestions';

import { sendValue } from '../sources';
import { getQuery, getResultList } from '../utils/search';

const ENTER_KEY_CODE = 13;

class InputContainer extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      isOpenSuggestions: false,
    };

    this.isStartFilling = false;
    this.startInputTime = null;

    this.onEnter = this.onEnter.bind(this);
    this.onSendValue = this.onSendValue.bind(this);
    this.onClick = this.onClick.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.switchSuggestionsBlock = this.switchSuggestionsBlock.bind(this);
  }

  onEnter(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onSendValue('enter')();
    }
  }

  onSendValue(type) {
    return () => {
      const { startInputTime } = this;
      const { value } = this.state;

      const query = getQuery({ value, type, startInputTime });

      sendValue(query);
    };
  }

  onClick(e) {
    const lineInput = document.querySelector('#line-input');

    if (!lineInput.contains(e.target)) {
      this.switchSuggestionsBlock(false);

      document.removeEventListener('click', this.onClick);
    }
  }

  changeValue(value) {
    if (!this.isStartFilling) {
      this.isStartFilling = true;
      this.startInputTime = new Date();
    }

    this.setState({
      value
    });
  }

  switchSuggestionsBlock(value) {
    this.setState({
      isOpenSuggestions: value
    });
  }

  render() {
    const { isOpenSuggestions, value } = this.state;

    const searchResult = getResultList(value);

    return (
      <section id="line-input" className="line-input">
        <LineInput
          value={value}
          changeValue={this.changeValue}
          sendValue={this.onSendValue}
          onEnter={this.onEnter}
          onClick={this.onClick}
          switchSuggestionsBlock={this.switchSuggestionsBlock}
        />
        <Suggestions
          value={value}
          searchResult={searchResult}
          isOpenSuggestions={isOpenSuggestions}
          changeValue={this.changeValue}
          switchSuggestionsBlock={this.switchSuggestionsBlock}
        />
      </section>
    );
  }
}

export default InputContainer;
