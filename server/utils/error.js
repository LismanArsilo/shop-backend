const createError = (status, message, validation) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  err.stack = validation || err.stack;
  return err;
};

export { createError };
