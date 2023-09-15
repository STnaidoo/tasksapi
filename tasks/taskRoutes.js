const express = require("express");
const router = express.Router();
const Task = require("../models").Task;

router.get("/:userId/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.params.userId } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:userId/tasks/:taskId", async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.taskId, userId: req.params.userId },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/:userId/tasks", async (req, res) => {
  try {
    const task = await Task.create({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      date_time: req.body.date_time,
      userId: req.params.userId,
    });

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:userId/tasks/:taskId", async (req, res) => {
  try {
    const [updatedRows] = await Task.update(
      {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        date_time: req.body.date_time,
      },
      {
        where: { id: req.params.taskId, userId: req.params.userId },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:userId/tasks/:taskId", async (req, res) => {
  try {
    const deletedRowCount = await Task.destroy({
      where: { id: req.params.taskId, userId: req.params.userId },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
