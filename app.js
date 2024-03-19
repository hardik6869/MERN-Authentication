const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("Database is Connected! Listening to localhost 5000.");
  })
  .catch((err) => console.log(err));
