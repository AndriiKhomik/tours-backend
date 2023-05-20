const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  expenseDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
