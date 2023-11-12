// Import the Express framework
const express = require("express");
// Import the custom errorHandler middleware
const { errorHandler } = require("./middlewares/errorMiddleware");
// Import the products data
const apiRoutes = require("./routes/pdfRoutes");
// Import the dotenv library to load environment variables
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
// Import the database connection function
const connectDb = require("./config/config");
// Import the routes for different API endpoints

// Import bonus task routes (commented out)
// const bonusTaskRoutes = require("./routes/bonusTasksRoutes");

// Load environment variables from a .env file
dotenv.config();

// Establish a connection to the MongoDB database
connectDb();

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Default route to display a welcome message
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Node Server</h1>");
});
app.use("/api", apiRoutes);

// Route handling for bonus task-related API endpoints (commented out)
// app.use("/api/search", bonusTaskRoutes);

// Apply the custom errorHandler middleware to handle errors
app.use(errorHandler);

// Define the port on which the server will listen
const PORT = 8080;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`
      .inverse
  );
});
