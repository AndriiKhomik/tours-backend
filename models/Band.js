const mongoose = require("mongoose");

const bandSchema = new mongoose.Schema({
  name: {
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

module.exports = mongoose.model("Band", bandSchema);
