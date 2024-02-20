  // Load environment variables from .env file
require('dotenv').config();

  // Import required packages
const express  = require('express');
const morgan   = require('morgan');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

  // Create an Express server instance
const server = express();

  // Log the database password from environment variables
console.log('env', process.env.DB_PASSWORD);

  // Establish database connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log('database connected');
}

            // Middleware setup
  // Enable Cross-Origin Resource Sharing
server.use(cors()); 
  // Parse JSON request bodies
server.use(express.json()); 
  // Logger function - Log HTTP requests
server.use(morgan('default')); 

  // Serve static files.. build code of react app
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR))); 
  // Route requests starting with /products to productRouter
server.use('/products', productRouter.router); 
  // Route requests starting with /users to userRouter
server.use('/users', userRouter.router); 

  // Route for handling "ALL" other requests
server.use('*', (req, res) => {
  // Send the index.html file for any other request
  // path is not really required but using it is a good practice, so it works on all windows and mac devices
  // __dirname is the of current directory

  /**
   * The routes that could not be resolved by the backend like "/add"
   * for those pages backend will say "can't get /add"
   * so those routes will be handled by this function 
   * this function will check those paths in the frontend (react app)
   */

  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));  
});

  // Start the server and listen on the specified port from environment variables 
server.listen(process.env.PORT, () => {
  console.log('server started');
});
