const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    band: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bandName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tourDescription: {
      type: String,
      required: true,
    },
    tours: [
      {
        city: { type: String, required: true },
        tourDate: { type: Date, required: true },
        address: { type: String, required: true },
      },
    ],
    image: {
      type: String,
    },
    reviews: [
      {
        description: { type: String },
        reviewDate: { type: Date },
      },
    ],
    marks: {
      type: [Number],
      default: 0,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
