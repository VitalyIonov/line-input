import { getElapsedTime } from './utils/time';

const sendValue = (value, matchingValue, type, startInputTime) => {
  const result = {
    data: matchingValue || value,
    type,
    elapsedTime: getElapsedTime(startInputTime)
  };

  const requestSettings = {
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };

  fetch('/emptyPath', requestSettings);
};

export {
  sendValue
};
