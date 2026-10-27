const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const extraDetails = err.extraDetails || "backend error";

  return res.status(statusCode).json({
    message,
    extraDetails,
  });
};

export default errorMiddleware;