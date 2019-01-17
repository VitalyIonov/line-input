import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LineInput extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    const { changeValue } = this.props;

    changeValue(value);
  }

  onFocus(e) {
    const { switchSuggestionsBlock, onEnter, onClick } = this.props;

    switchSuggestionsBlock(true);

    e.target.addEventListener('keypress', onEnter);
    document.addEventListener('click', onClick);
  }

  onBlur(e) {
    const { onEnter } = this.props;

    e.target.removeEventListener('keypress', onEnter);
  }

  clearInput() {
    const { changeValue } = this.props;
    const lineInput = document.querySelector('#input');

    changeValue('');
    lineInput.focus();
  }

  render() {
    const { value, sendValue } = this.props;

    return (
      <div className="line-input__wrapper">
        <button
          className="line-input__icon"
          onClick={sendValue('click')}
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
        <button
          className={`line-input__clear ${value && 'line-input__clear--show'}`}
          onClick={this.clearInput}
        />
        <button
          className={`line-input__find ${value && 'line-input__find--show'}`}
          onClick={sendValue('click')}
        >
          Найти
        </button>
      </div>
    );
  }
}

LineInput.propTypes = {
  value: PropTypes.string.isRequired,
  onEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  sendValue: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  switchSuggestionsBlock: PropTypes.func.isRequired
};

export default LineInput;
