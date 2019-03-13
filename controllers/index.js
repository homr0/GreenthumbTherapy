const path = require("path");
const router = require("express").Router();

const apiRoutes = require("./api");
const withAuth = require("./withAuth");

// API Routes
router.use("/api", apiRoutes);

router.route("/checkToken")
  .get(withAuth, (req, res) => res.status(200));

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;