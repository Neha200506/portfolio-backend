const express = require("express");

const {
  uploadMedia,
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} = require("../controllers/mediaController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload media file
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadMedia
);

// Media CRUD
router.get("/", authMiddleware, getMedia);

router.get("/:id", authMiddleware, getMediaById);

router.post("/", authMiddleware, createMedia);

router.put("/:id", authMiddleware, updateMedia);

router.delete("/:id", authMiddleware, deleteMedia);

module.exports = router;