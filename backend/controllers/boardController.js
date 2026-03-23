const Board = require("../models/Board");

// @desc   Create a new board
// @route  POST /api/boards
// @access Private
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const board = await Board.create({
      title,
      userId: req.user._id
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all boards of logged-in user
// @route  GET /api/boards
// @access Private
exports.getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};