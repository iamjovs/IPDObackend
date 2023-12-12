class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Error) {
    statusCode = err.statusCode || 500;
    message = err.message || "Internal Server Error";
  }

  res
    .status(statusCode)
    .json({ success: false, status: statusCode, message: message});
};

module.exports = { AppError, errorHandler };
