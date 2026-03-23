const Task = require("../models/Task");

// @desc   Create a new task in a board
// @route  POST /api/tasks
// @access Private
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, boardId } = req.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "Title and boardId are required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      boardId
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all tasks of a board
// @route  GET /api/tasks/:boardId
// @access Private
exports.getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const tasks = await Task.find({ boardId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update task status (todo/doing/done)
// @route  PUT /api/tasks/:id/status
// @access Private
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};