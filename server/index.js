// jai Shri Ganesh 
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
  });