const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByBoard,
  updateTaskStatus
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

// Create task
router.post("/", protect, createTask);

// Get tasks by board
router.get("/:boardId", protect, getTasksByBoard);

// Update task status
router.put("/:id/status", protect, updateTaskStatus);

module.exports = router;