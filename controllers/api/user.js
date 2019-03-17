const router = require("express").Router();

const User = require("../userController");

router.route("/:id")
  .get(User.getPlants)
  .post(User.favoritePlant)
  .delete(User.removePlant);