const Tour = require("../models/Tour");
const Band = require("../models/Band");

// @desc Get all tours
// @route GET /tours
// @access Common ?????
const getAllTours = async (req, res) => {
  // Get all tours from MongoDB
  const tours = await Tour.find().lean();

  // if no tours
  if (!tours?.length) {
    return res.status(400).json({ message: "No tours found" });
  }

  const tourWithBand = await Promise.all(
    tours.map(async (tour) => {
      const band = await Band.findById(tour.band).lean().exec();
      return { ...tour, name: band.name };
    })
  );

  res.json(tourWithBand);
};

// @desc Create new tour
// @route /tours
// @access Private
const createNewTour = async (req, res) => {
  const { band, title, date, tourDescription, cities } = req.body;
  console.log(band, title, date, tourDescription, cities);
  // Confirm data
  if (!band || !title || !date || !tourDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check duplicate title
  const duplicate = await Tour.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate tour title" });
  }

  // Create and store new tour
  const tour = await Tour.create({
    band,
    title,
    date,
    tourDescription,
    cities,
  });

  if (tour) {
    return res.status(201).json({ message: "New tour created" });
  } else {
    return res.status(400).json({ message: "Invalid tour data received" });
  }
};

const updateTour = async (req, res) => {
  const { id, band, title, date, tourDescription, cities } = req.body;

  // Confirm data
  if (!id || !band || !title || !date || !tourDescription) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm tour exists to update
  const tour = await Tour.findById(id).exec();

  if (!tour) {
    return res.status(400).json({ message: "Tour not found" });
  }

  // Check for duplicate title
  const duplicate = await Tour.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming to the original tour
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate tour title" });
  }

  tour.band = band;
  tour.title = title;
  tour.date = date;
  tour.tourDescription = tourDescription;

  const updateTour = await tour.save();

  res.json({ message: `'${updateTour.title}' updated` });
};

const deleteTour = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Tour id required" });
  }

  // Confirm tour exists to delete
  const tour = await Tour.findById(id).exec();

  if (!tour) {
    return res.status(400).json({ message: "Tour not found" });
  }

  const result = await tour.deleteOne();

  const reply = `Tour '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllTours,
  createNewTour,
  updateTour,
  deleteTour,
};
