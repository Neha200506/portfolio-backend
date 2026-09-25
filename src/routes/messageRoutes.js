const express = require("express");

const {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} = require("../controllers/messagesController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public contact form
router.post("/", createMessage);

// Admin-only message management
router.get("/", authMiddleware, getMessages);
router.get("/:id", authMiddleware, getMessageById);
router.put("/:id", authMiddleware, updateMessage);
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;