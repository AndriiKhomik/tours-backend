const express = require("express");
const router = express.Router();
const toursController = require("../controllers/toursController");

router
  .route("/")
  .get(toursController.getAllTours)
  .post(toursController.createNewTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
