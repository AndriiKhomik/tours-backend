const express = require("express");
const router = express.Router();
const bandsController = require("../controllers/bandsController");

router.route("/")
  .get(bandsController.getAllBands)
  .post(bandsController.createNewBand);

module.exports = router;
