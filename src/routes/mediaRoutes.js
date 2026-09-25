const express = require("express");

const {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} = require("../controllers/mediaController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getMedia);
router.get("/:id", authMiddleware, getMediaById);

router.post("/", authMiddleware, createMedia);
router.put("/:id", authMiddleware, updateMedia);
router.delete("/:id", authMiddleware, deleteMedia);

module.exports = router;