const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/tracks", require("./routes/trackRoutes"));
app.use("/api/merchandise", require("./routes/merchandiseRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '127.0.0.1', () => console.log(`Server running on port ${PORT}`));
