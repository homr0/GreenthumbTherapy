const router = require("express").Router();

const Plant = require("../plantController");

// Handles getting from the database as well as creating new entries.
router.route("/")
  .get(Plant.findAll)
  .post(Plant.create);

// Pulls plant data from the Trefle API.
router.route("/search")
  .post(Plant.searchPlants);

module.exports = router;