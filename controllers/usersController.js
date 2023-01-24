const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const bands = await User.find().lean();

  // if no bands
  if (!bands?.length) {
    return res.status(400).json({message: "No users found"});
  }
  res.json(bands);
};

const createNewUser = async (req, res) => {
  const {name, foundedDate, albums} = req.body;

  if (!name || !foundedDate) {
    res.status(400).json({message: "All fields are required"});
  }

  // Check duplicates name
  const duplicate = await User.findOne({name})
    .collation({locale: "en", strength: 2})
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({message: "Duplicate tour title"});
  }

  // Create and store new band
  const user = await User.create({name, foundedDate, albums});

  if (user) {
    return res.status(201).json({message: "New user created"});
  } else {
    return res.status(400).json({message: "Invalid user data received"});
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
};
