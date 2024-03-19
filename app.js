const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT);
    console.log("Database is Connected! Listening to localhost 5000.");
  })
  .catch((err) => console.log(err));
