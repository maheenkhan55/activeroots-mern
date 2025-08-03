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
// This module connects to the MongoDB database using Mongoose.
// It reads the connection string from environment variables and handles errors gracefully.
// Make sure to set the MONGO_URI in your .env file before running the application.
