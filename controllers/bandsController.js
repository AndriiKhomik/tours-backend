const Band = require("../models/Band");

const getAllBands = async (req, res) => {
  const bands = await Band.find().lean();

  // if no bands
  if (!bands?.length) {
    return res.status(400).json({ message: "No bands found" });
  }
  res.json(bands);
};

const createNewBand = async (req, res) => {
  const { name, foundedDate, albums } = req.body;

  if (!name || !foundedDate) {
    res.status(400).json({ message: "All fields are required" });
  }

  // Check duplicates name
  const duplicate = await Band.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate tour title" });
  }

  // Create and store new band
  const band = await Band.create({ name, foundedDate, albums });

  if (band) {
    return res.status(201).json({ message: "New band created" });
  } else {
    return res.status(400).json({ message: "Invalid band data received" });
  }
};

module.exports = {
  getAllBands,
  createNewBand,
};
