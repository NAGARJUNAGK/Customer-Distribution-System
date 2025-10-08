const express = require("express");
const Agent = require("../models/Agent.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// Add new agent (only for logged-in admin)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if agent already exists
    const existingAgent = await Agent.findOne({ email, createdBy: req.userId });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }
    const agent = new Agent({ name, email, mobile, password, createdBy: req.userId });
    console.log(agent.createdBy);
    await agent.save();
    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating agent", error: error.message });
  }
});

// Get all agents (protected route)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find({createdBy: req.userId});
    res.json(agents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching agents", error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedAgent = await Agent.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId,
    });
    if (!deletedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting agent", error: error.message });
  }
});


module.exports = router;
