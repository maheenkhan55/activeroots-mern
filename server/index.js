import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example route
app.get("/", (req, res) => {
  res.send("Active Roots API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
