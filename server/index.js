import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
import authRoutes from './routes/auth.js';
import programRoutes from './routes/programs.js';
import cartRoutes from './routes/cart.js';

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/cart', cartRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'ActiveRoots Backend is running!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`ActiveRoots Server running on port ${PORT}`);
    console.log(`check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error);



