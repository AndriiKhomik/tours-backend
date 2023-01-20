const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  band: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Band'
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  tourDescription: {
    type: String,
    required: true,
  },
  cities: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
