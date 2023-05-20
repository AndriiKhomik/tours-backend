const Expense = require("../models/Expense");

const getAllExpenses = async (req, res) => {
  const expenses = await Expense.find().lean();

  if (!expenses?.length) {
    // return res.status(400).json({ message: "No expenses found" });
    return res.json([]);
  }
  res.json(expenses);
};

const createNewExpense = async (req, res) => {
  const { storeName, expenseAmount, expenseDate, paymentMethod } = req.body;

  if (!storeName || !expenseAmount || !expenseDate || !paymentMethod) {
    res.status(400).json({ message: "All fields are required" });
  }

  const expense = await Expense.create({
    storeName,
    expenseAmount,
    expenseDate,
    paymentMethod,
  });

  if (expense) {
    return res.status(201).json({ message: "New expense created" });
  } else {
    return res.status(400).json({ message: "Invalid expense data received" });
  }
};

module.exports = {
  getAllExpenses,
  createNewExpense,
};
