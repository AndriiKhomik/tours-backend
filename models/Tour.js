const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  bandName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  tourDescription: {
    type: String,
    required: true
  },
  cities: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('Tour', tourSchema)