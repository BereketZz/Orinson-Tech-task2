const Task = require("../models/Task");

//Create a Task
const createTask = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const create = new Task({
      name,
      description,
      status,
      user: req.user._id,
    });

    await create.save();
    res.status(201).json(create);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.find({ user: req.user._id });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: "Error Fetching Task!" });
  }
};
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    // Check if the error is caused by an invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    // Handle other unexpected errors
    res.status(500).json({ error: "Error Fetching Task!" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    // Check if the error is caused by an invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }
    res.status(400).json({ error: "Error updating task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    // Check if the error is caused by an invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    res.status(400).json({ error: "Error deleting task" });
  }
};

const stateTask = async (req, res) => {
  try {
    // Fetch all tasks for the logged-in user
    const totalTasks = await Task.countDocuments({ user: req.user._id });

    // Count the number of completed tasks for the user
    const completedTasks = await Task.countDocuments({
      user: req.user._id,
      status: "completed",
    });

    const pendingTasks = await Task.countDocuments({
      user: req.user._id,
      status: "pending",
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching stats" });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  stateTask,
  getTaskById,
};
