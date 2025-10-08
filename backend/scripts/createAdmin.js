const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123"
    });

    await admin.save();
    console.log("Admin user created!");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

createAdmin();
