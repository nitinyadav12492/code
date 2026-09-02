const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const extaDetails = err.extaDetails || "backend error";

  return res.status(statusCode).json({
    message,
    extaDetails,
  });
};

export default errorMiddleware;