const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    default: "",
  },
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent", // This links customer to an Agent
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
