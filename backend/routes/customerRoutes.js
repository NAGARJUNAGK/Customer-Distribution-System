const express = require("express");
const multer = require("multer");
const path = require("path");
const Customer = require("../models/Customer.js");
const Agent = require("../models/Agent.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const csv = require("csv-parser");
const { Readable } = require("stream");

const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage(); // keep file in memory
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only .csv files
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".csv") {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Optional: 2MB limit
});

// Upload CSV route
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const customers = [];

      // Convert buffer to readable stream
      const stream = Readable.from(req.file.buffer);

      // Parse CSV
      stream
        .pipe(csv())
        .on("data", (row) => {
          // Validate row fields
          if (row.firstName && row.phone) {
            customers.push({
              firstName: row.firstName.trim(),
              phone: row.phone.trim(),
              notes: row.notes ? row.notes.trim() : "",
            });
          }
        })
        .on("end", async () => {
          try {
            // Get all agents
            const agents = await Agent.find({ createdBy: req.userId });
            if (agents.length === 0) {
              return res.status(400).json({ message: "No agents available" });
            }

            // Distribute customers among agents
            let savedCustomers = [];
            for (let i = 0; i < customers.length; i++) {
              const agent = agents[i % agents.length];

              // Check if phone already exists
              const existingCustomer = await Customer.findOne({
                phone: customers[i].phone,
                createdBy: req.userId,
              });
              if (existingCustomer) continue;

              const customer = new Customer({
                ...customers[i],
                assignedAgent: agent._id,
                createdBy: req.userId,
              });
              await customer.save();
              savedCustomers.push(customer);
            }

            res.json({
              message: "Customers uploaded & distributed successfully",
              total: savedCustomers.length,
              distributedTo: agents.length,
              customers: savedCustomers,
            });
          } catch (error) {
            res
              .status(500)
              .json({
                message: "Error saving customers",
                error: error.message,
              });
          }
        })
        .on("error", (err) => {
          res
            .status(500)
            .json({ message: "Error parsing CSV", error: err.message });
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error uploading file", error: error.message });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find({ createdBy: req.userId }).populate(
      "assignedAgent",
      "name email mobile"
    );
    res.json(customers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
});

router.delete("/", authMiddleware, async (req, res) => {
  try {
    await Customer.deleteMany({ createdBy: req.userId });
    res.json({ message: "All customers deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customers" });
  }
});

module.exports = router;
