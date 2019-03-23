const router = require("express").Router();

const User = require("../userController");

router.route("/:id")
  .get(User.getPlants)
  .post(User.favoritePlant)

router.route("/:id/plants")
  .get(User.getPlantIds);

router.route("/:id/preferences")
  .get(User.getPreferences)
  .post(User.setPreferences);

router.route("/:id/:plant_id") 
  .delete(User.removePlant);

module.exports = router;