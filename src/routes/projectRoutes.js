const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} = require("../controllers/projectsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;