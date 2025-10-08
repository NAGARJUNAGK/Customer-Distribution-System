const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authroute");
const agentRoutes = require("./routes/agentRoutes");
const customerRoutes = require("./routes/customerRoutes.js");

dotenv.config();
//connecting to mongodb
connectDB(); 

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Backend is running....');
});

app.use("/api/auth", authRoute);
app.use("/api/agents", agentRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});