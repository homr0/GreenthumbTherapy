const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
<<<<<<< HEAD
// const routes = require("./views");
const User = require("./models/User");
const withAuth = require("./middleware");
=======

const routes = require("./controllers");

>>>>>>> 727af75283cbe9113361c9643bcaa2923680c8b1
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
<<<<<<< HEAD
const mongo_uri = "mongodb://localhost/react-auth";
=======
// const mongo_uri = "mongodb://localhost/react-auth";
>>>>>>> 727af75283cbe9113361c9643bcaa2923680c8b1
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/greenthumbtherapy");

// Add routes for API and for database.
app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
