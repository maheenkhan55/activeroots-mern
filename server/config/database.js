import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;

// This module is responsible for connecting to the MongoDB database using Mongoose.
// It reads the connection string from environment variables and handles connection errors.
// The connectDB function is exported for use in the main application file.
// It ensures that the application can connect to the database before starting the server.
// The connection string should be set in the .env file as MONGO_URI.
// This module is essential for establishing a connection to the database,
// which is required for the application to function properly.
// It also provides error handling to ensure that the application does not start if the database connection fails
// This module is crucial for the application's data persistence layer, allowing it to store and retrieve data from MongoDB.
