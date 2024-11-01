const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    eventType: {
      type: String,
      required: true,
      enum: [
        "Club Performance",
        "Festival",
        "Private Event",
        "Concert",
        "Other",
      ],
    },
    ticketInfo: {
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      purchaseLink: String,
      available: {
        type: Boolean,
        default: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

// Add index for querying upcoming events efficiently
eventSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model("Event", eventSchema);
