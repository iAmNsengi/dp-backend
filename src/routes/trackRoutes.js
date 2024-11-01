const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const upload = require("../middleware/upload");

const multiUpload = upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

router.post("/", multiUpload, trackController.createTrack);
router.get("/", trackController.getTracks);

module.exports = router;
