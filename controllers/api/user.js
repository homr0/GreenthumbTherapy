const router = require("express").Router();

const User = require("../userController");

router.route("/:id")
  .get(User.getPlants)
  .post(User.favoritePlant)

router.route("/:id/:plant_id") 
  .delete(User.removePlant);

module.exports = router;