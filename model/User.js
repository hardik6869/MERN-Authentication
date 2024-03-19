const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const userSchema = new Schema({
  name: { type: string, require: true },
  email: { type: string, require: true, unique: true },
  password: { type: string, require: true, minlength: 6 },
});

mongoose.export = mongoose.model("User", userSchema);
