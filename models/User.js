const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foundedDate: {
    type: String,
    required: true,
  },
  albums: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
