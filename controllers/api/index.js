const router = require("express").Router();
const User = require("../userController");
const userRoutes = require("./user");
const plantRoutes = require("./plant");

// User routes
router.use("/user", userRoutes);

// Plant routes
router.use("/plants", plantRoutes);

router.route("/home")
  .get((req, res) => res.send("The password is potato."));

router.route("/register")
  .post(User.create);

router.route("/authenticate")
  .post(User.login);

router.route("/verify")
  .get(User.verify);

module.exports = router;