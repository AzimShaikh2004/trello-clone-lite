const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo"
    },
    dueDate: {
      type: Date
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);