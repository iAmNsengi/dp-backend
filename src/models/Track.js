const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    featuring: {
      type: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Track", trackSchema);
