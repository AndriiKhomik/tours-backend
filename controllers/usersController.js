const User = require("../models/User");
const Tour = require("../models/Tour");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const bands = await User.find().lean();

  // if no bands
  if (!bands?.length) {
    return res.status(400).json({message: "No users found"});
  }
  res.json(bands);
};

const createNewUser = async (req, res) => {
  const {name, password, foundedDate, albums} = req.body;

  if (!name || !foundedDate || !password) {
    res.status(400).json({message: "All fields are required"});
  }

  // Check duplicates name
  const duplicate = await User.findOne({name})
    .collation({locale: "en", strength: 2})
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({message: "Duplicate name"});
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = !Array.isArray(albums) || !albums.length ? {name, foundedDate, password: hashedPassword} : {
    name,
    foundedDate,
    password: hashedPassword,
    albums,
  };

  // Create and store new band
  const user = await User.create(userObject);

  if (user) {
    return res.status(201).json({message: "New user created"});
  } else {
    return res.status(400).json({message: "Invalid user data received"});
  }
};

const updateUser = async (req, res) => {
  const {id, name, foundedDate, password, albums} = req.body;

  // Confirm data
  if (!id || !name || !foundedDate || !Array.isArray(albums)) {
    return res.status(400).json({message: "All fields are required"});
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.json(400).json({message: "User not found"});
  }

  // Check for duplicate
  const duplicate = await User.findOne({name})
    .collation({locale: "en", strength: 2})
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toSigned() !== id) {
    return res.json(409).json({message: "Duplicate name"});
  }

  user.name = name;
  user.foundedDate = foundedDate;
  user.albums = albums;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updateUser = await user.save();

  res.json({message: `${updateUser.name} updated`});
};

const deleteUser = async (req, res) => {
  const {id} = req.body;

  if (!id) {
    return res.status(400).json({message: "User ID required"});
  }

  const tour = await Tour.findOne({band: id}).lean().exec();

  if (tour) {
    return res.status(400).json({message: "User has assigned tours"});
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({message: "User not found"});
  }

  const result = await user.deleteOne();

  const reply = `User ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
