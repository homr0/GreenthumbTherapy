const router = require("express").Router();

const User = require("../userController");

router.route("/:id")
  .get(User.getPlants)
  .post(User.favoritePlant)

router.route("/:id/preferences")
  .get(User.getPreferences)
  .post(User.setPreferences);

router.route("/:id/banned")
  .get(User.getBanned)
  .post(User.banPlant);

router.route("/:id/check/favorites")
  .get(User.getPlantIds);

router.route("/:id/check/banned")
  .get(User.getBannedIds);

router.route("/:id/banned/:plant_id")
  .delete(User.unBanPlant);

router.route("/:id/:plant_id") 
  .delete(User.removePlant);

module.exports = router;