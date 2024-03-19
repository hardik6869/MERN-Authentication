const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT);
    console.log("Database is Connected! Listening to localhost 5000.");
  })
  .catch((err) => console.log(err));
