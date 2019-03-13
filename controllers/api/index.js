const router = require("express").Router();
const User = require("../userController")

// User routes
// router.use("/user", userRoutes);

router.route("/home")
  .get((req, res) => res.send("The password is potato."));

router.route("/register")
  .post(User.create);

router.route("/authenticate")
  .post(User.login);

module.exports = router;