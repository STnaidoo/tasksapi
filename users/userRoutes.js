const express = require("express");
const router = express.Router();
const User = require("../models").User;
const tasksRouter = require("../tasks/taskRoutes");

router.use("/", tasksRouter); // tasks are a sub route of users

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [updatedRowsCount, updatedRows] = await User.update(req.body, {
      where: { id: userId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedRowsCount = await User.destroy({
      where: { id: userId },
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
