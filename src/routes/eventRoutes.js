const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const upload = require("../middleware/upload");
const { auth } = require("../middleware/auth");

// Configure multer for event images
const eventUpload = upload.single("image");

// Public routes
router.get("/", eventController.getEvents);
router.get("/upcoming", eventController.getUpcomingEvents);
router.get("/:id", eventController.getEvent);

// Protected routes (require authentication)
router.post("/", auth, eventUpload, eventController.createEvent);
router.patch("/:id", auth, eventUpload, eventController.updateEvent);
router.delete("/:id", auth, eventController.deleteEvent);
router.patch("/:id/status", auth, eventController.updateEventStatus);

module.exports = router;
