const express = require("express");

const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill
} = require("../controllers/skillsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public read routes
router.get("/", getSkills);
router.get("/:id", getSkillById);

// Protected admin routes
router.post("/", authMiddleware, createSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;