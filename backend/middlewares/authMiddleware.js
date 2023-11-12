const jwt = require("jsonwebtoken"); // Importing the JSON Web Token library for authentication.
const User = require("../models/UserModel"); // Importing the User model for database operations.
const asyncHandler = require("express-async-handler"); // Wrapping async route handlers for error handling.

// Middleware function for protecting routes with authentication.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Checking if the authorization header with Bearer token exists.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extracting the token from the authorization header.
      token = req.headers.authorization.split(" ")[1];

      // Verifying the token using the JWT_KEY and decoding its payload.
      const decode = jwt.verify(token, process.env.JWT_KEY);

      // Fetching the user data (excluding password) from the database based on the decoded user id.
      req.user = await User.findById(decode.id).select("-password");

      // Proceeding to the next middleware.
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, Token failed"); // Error response if token verification fails.
    }
  }

  // Handling the case where no token is found.
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token"); // Error response if no token is provided.
  }
});

module.exports = { protect }; // Exporting the protect middleware for use in routes.
