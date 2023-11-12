const errorHandler = (err, req, res, next) => {
  // Determine the appropriate status code for the response based on the error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set the response status code
  res.status(statusCode);

  // Create a JSON response object containing the error message
  // In development mode, include the stack trace; in production mode, omit it
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Export the errorHandler middleware for use in other parts of the application
module.exports = { errorHandler };
