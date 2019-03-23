const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const cookieOptions = {httpOnly: true};
const db = require("../models");

module.exports = {
  create: (req, res) => {
    db.User
      .create(req.body)
      .then(() => res.status(200).json({
        message: "Welcome to Greenthumb Therapy!"
      }))
      .catch(err => res.json({
        message: "This email is already tied to another account."
      }).status(500));
  },

  login: (req, res) => {
    const { email, password } = req.body;

    db.User
      .findOne({email: email})
      .then(user => {
        (!user) ? res.json({
          message: "This email does not belong to a recognized user."
        }).status(401) : user.isCorrectPassword(password)
          .then(same => {
            if(!same) res.json({
              message: "Incorrect password."
            }).status(401);
            else {
              // Issues token
              const payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                id: user._id
              };

              const token = jwt.sign(payload, secret);

              res.cookie("token", token, cookieOptions).status(200).json({
                message: "You have signed into Greenthumb Therapy"
              });
            }
          });
      })
      .catch(err => res.json({
          message: "Internal error. Please try again"
        }).status(500));
  },

  verify: (req, res) => {
    const token = 
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;
    
    (!token) ? res.status(401).send("Unauthorized: No token provided") : jwt.verify(token, secret, (err, decoded) => {
      (err) ? res.status(402).send("Unauthorized: Invalid token") : db.User.findOne({_id: decoded.id}).populate("plants")
        .then(dbModel => res.status(200).json({
          id: decoded.id,
          first_name: dbModel.first_name,
          last_name: dbModel.last_name,
          favorites: dbModel.plants
        }))
        .catch(err => res.json({
          message: "Internal error. Could not find a user with this token information."
        }).status(500));
    });
  },

  logout: (req, res) => {
    const token = 
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;

    // Clears the token from the server.
    (!token) ? res.status(401).send("Unauthorized: No token provided") : jwt.verify(token, secret, (err, decoded) =>
      (err) ? res.status(402).send("Unauthorized: Invalid token") : res.clearCookie("token", cookieOptions).status(200).json({
        message: "You have successfully logged out!"
      }));
  },

  getPlants: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plants")
      .then(dbUser => 
        res.status(200).json(dbUser))
      .catch(err => res.json({
          message: "Internal error. Please try again."
        }).status(500)
      );
  },

  favoritePlant: (req, res) => {
    db.Plant
      .findOne({id: req.body.plant_id})
      .then(dbModel => db.User
        .findOneAndUpdate({_id: req.params.id}, {$push: {plants: dbModel}}, {new: true})
          .then(() => res.status(200).json({
            message: "Favorited plant successfully!"
          }))
          .catch(err => res.json({
            message: "Internal error. Could not favorite plant."
          }).status(500)))
      .catch(err => res.json({
        message: "Internal error. Could not find the plant the user wanted to favorite."
      }).status(500));
  },

  removePlant: (req, res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id}, {$pull: {plants: req.params.plant_id}})
      .then(() =>res.status(200).send("Plant has been removed from favorites"))
      .catch(err => res.status(500).json({
          error: "Internal error. Could not remove plant from favorites."
        })
      );
  }
}