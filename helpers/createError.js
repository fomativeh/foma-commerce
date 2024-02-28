module.exports = createError = (next, message, status) => {
  const error = new Error(message);
  error.status = status;
  next(error);
};
