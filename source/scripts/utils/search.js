import { phrasesList } from '../constants/data';

const toLowerCase = text => text.toLowerCase();

const getResultList = value => phrasesList.reduce((result, phrase) => {
  const lowerCaseText = toLowerCase(phrase.text);
  const lowerCaseValue = toLowerCase(value);

  if (lowerCaseText.indexOf(lowerCaseValue) !== -1) {
    return [...result, phrase];
  }

  return result;
}, []);

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

export {
  getResultList,
  getMatchingValue
};
