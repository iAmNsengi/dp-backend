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
app.use("/src/uploads", express.static(path.join(__dirname, 'uploads')));

// App Config

// Routes
app.use("/api/tracks", require("./routes/trackRoutes"));
app.use("/api/merchandise", require("./routes/merchandiseRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URI,
  {
    serverSelectionTimeoutMS: 30000
  }
    )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, 'localhost', () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

  