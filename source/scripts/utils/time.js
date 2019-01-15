const getElapsedTime = time => {
  if (!time) {
    return null;
  }

  const sendTime = new Date();

  console.log('diff', sendTime - time);

  return time;
};

export {
  getElapsedTime
};
