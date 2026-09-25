const express = require("express");

const {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout
} = require("../controllers/aboutController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public read routes
router.get("/", getAbout);
router.get("/:id", getAboutById);

// Protected admin routes
router.post("/", authMiddleware, createAbout);
router.put("/:id", authMiddleware, updateAbout);
router.delete("/:id", authMiddleware, deleteAbout);

module.exports = router;