const express = require("express");
const router = express.Router();
const bandsController = require("../controllers/usersController");

router
  .route("/")
  .get(bandsController.getAllUsers)
  .post(bandsController.createNewUser);

module.exports = router;
