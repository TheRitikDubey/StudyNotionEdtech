// jai Shri Ganesh 
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

app.use(express.json());

app.listen(PORT, () => {
    console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
  });