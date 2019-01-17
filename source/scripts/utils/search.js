import { getElapsedTime } from './time';
import { phrasesList } from '../constants/data';

const toLowerCase = text => text.toLowerCase();

const getMatchingValue = value => {
  let result = null;

  for (let i = 0; i <= phrasesList.length - 1; i += 1) {
    const phrase = phrasesList[i];
    const lowerCaseText = toLowerCase(phrase.text);
    const lowerCaseValue = toLowerCase(value);

    if (lowerCaseValue === lowerCaseText) {
      result = phrase;
      break;
    }
  }

  return result;
};

const getResultList = value => phrasesList.filter(phrase => {
  const lowerCaseText = toLowerCase(phrase.text);
  const lowerCaseValue = toLowerCase(value);

  return lowerCaseText.indexOf(lowerCaseValue) !== -1;
});

const getQuery = data => {
  const { type, value, startInputTime } = data;

  const matchingValue = getMatchingValue(value);

  return {
    data: matchingValue || value,
    type,
    elapsedTime: getElapsedTime(startInputTime)
  };
};

export {
  getResultList,
  getQuery
};
