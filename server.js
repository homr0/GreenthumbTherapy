const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const routes = require("./views");
const User = require("./models/User");
const withAuth = require("./middleware");
const app = express();
const PORT = process.env.PORT || 3001;
const secret = "mysecretsshhh";

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and views


// Connect to the Mongo DB
const mongo_uri = "mongodb://localhost/react-auth";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/greenthumbtherapy");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("./api/home", function(req, res) {
  res.send("The password is potato");
});

app.post("./api/register", function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post("./api/authenticate", function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
      .json({
        error: "Internal error please try again"
      });
    } else if (!user) {
      res.status(401)
      .json({
        error: "Incorrect email or password"
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
          .json({
            error: "Internal error please try again"
          });
        } else if (!same) {
          res.status(401)
          .json({
            error: "Incorrect email or password"
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

app.get("./checkToken", withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
