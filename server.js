const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
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
// const mongo_uri = "mongodb://localhost/react-auth";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/greenthumbtherapy", {useNewUrlParser: true});

// Add routes for API and for database.
app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
