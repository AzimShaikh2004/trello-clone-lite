const express = require("express");
const router = express.Router();

const { createBoard, getMyBoards } = require("../controllers/boardController");
const { protect } = require("../middleware/authMiddleware");

// Create board (protected)
router.post("/", protect, createBoard);

// Get my boards (protected)
router.get("/", protect, getMyBoards);

module.exports = router;