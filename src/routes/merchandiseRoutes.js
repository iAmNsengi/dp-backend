const express = require("express");
const router = express.Router();
const merchandiseController = require("../controllers/merchandiseController");
const upload = require("../middleware/upload");
const { auth } = require("../middleware/auth");

// Configure multer for merchandise images
const merchandiseUpload = upload.fields([{ name: "images", maxCount: 5 }]);

// Public routes
router.get("/", merchandiseController.getAllMerchandise);
router.get("/:id", merchandiseController.getMerchandise);

// Protected routes (require authentication)
router.post(
  "/",
  auth,
  merchandiseUpload,
  merchandiseController.createMerchandise
);
router.patch(
  "/:id",
  auth,
  merchandiseUpload,
  merchandiseController.updateMerchandise
);
router.delete("/:id", merchandiseController.deleteMerchandise);
router.patch("/:id/stock", merchandiseController.updateStock);

module.exports = router;
