const handleError = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Server Not Found";
  return res.status(errorStatus).json({
    status: false,
    message: errorMessage,
    stack: err.stack,
  });
};

export default handleError;
