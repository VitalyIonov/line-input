const sendValue = query => {
  const requestSettings = {
    body: JSON.stringify(query),
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
