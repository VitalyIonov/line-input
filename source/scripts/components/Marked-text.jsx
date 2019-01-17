import React from 'react';

const MarkedText = ({ text, value }) => {
  if (!value) {
    return text;
  }

  const reg = new RegExp(value, 'gi');

  const result = [];
  let match = reg.exec(text);
  let startIndex = 0;

  while (match) {
    result.push(text.slice(startIndex, match.index));
    result.push(text.slice(match.index, reg.lastIndex));
    startIndex = reg.lastIndex;

    match = reg.exec(text);
  }

  result.push(text.slice(startIndex, text.length));

  return result.map((item, index) => {
    if (index % 2 === 0) {
      return item;
    }

    return <b key={index}>{item}</b>;
  });
};

export default MarkedText;
