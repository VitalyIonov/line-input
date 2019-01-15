const getElapsedTime = time => {
  if (!time) {
    return null;
  }

  const sendTime = new Date();

  return sendTime - time;
};

export {
  getElapsedTime
};
