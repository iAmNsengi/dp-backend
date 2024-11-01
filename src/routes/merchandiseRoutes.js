const express = require("express");
const router = express.Router();
const merchandiseController = require("../controllers/merchandiseController");
const upload = require("../middleware/upload");
// const auth = require("../middleware/auth") || ""; // Assuming you have auth middleware

// Configure multer for merchandise images
const merchandiseUpload = upload.array("images", 5); // Allow up to 5 images per item

// Public routes
router.get("/", merchandiseController.getAllMerchandise);
router.get("/:id", merchandiseController.getMerchandise);

// Protected routes (require authentication)
router.post("/", merchandiseUpload, merchandiseController.createMerchandise);
router.patch(
  "/:id",
  merchandiseUpload,
  merchandiseController.updateMerchandise
);
router.delete("/:id", merchandiseController.deleteMerchandise);
router.patch("/:id/stock", merchandiseController.updateStock);

module.exports = router;
