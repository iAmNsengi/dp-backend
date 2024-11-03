const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Configure multer for track files
const trackUpload = upload.fields([{ name: "coverImage", maxCount: 1 }]);

// Public routes
router.get("/", trackController.getTracks);

router.get("/:id", trackController.getTrack);

// Protected routes
router.post("/", auth, trackUpload, trackController.createTrack);
router.patch("/:id", auth, trackUpload, trackController.updateTrack);
router.delete("/:id", auth, trackController.deleteTrack);

module.exports = router;
