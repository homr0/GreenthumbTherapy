const jwt = require("jsonwebtoken");
const secret = "mysecretsshhh";
const cookieOptions = {httpOnly: true};
const db = require("../models");

module.exports = {
  // Handles user account functions.
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
      (err) ? res.status(402).send("Unauthorized: Invalid token") : db.User.findOne({_id: decoded.id})
        .then(dbModel => res.status(200).json({
          id: decoded.id,
          first_name: dbModel.first_name,
          last_name: dbModel.last_name
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

  // Handles favorite plants
  getPlants: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plants")
      .then(dbUser => 
        res.status(200).json(dbUser.plants))
      .catch(err => res.json({
          message: "Internal error. Please try again."
        }).status(500)
      );
  },

  getPlantIds: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plants")
      .then(dbUser => {
        let plantIds = dbUser.plants.map(plant => plant.id);
        res.status(200).json(plantIds);
      })
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
    db.Plant
      .findOne({id: req.params.plant_id})
        .then(dbModel => db.User
          .findOneAndUpdate({_id: req.params.id}, {$pull: {plants: dbModel._id}})
          .then(() =>res.status(200).send("Plant has been removed from favorites"))
          .catch(err => res.json({
              message: "Internal error. Could not remove plant from favorites."
            }).status(500))
        )
        .catch(err => res.json({
          message: "Internal error. Could not find the plant the user wanted to remove from their favorites."
        }).status(500));
  },

  // Handles the user's preferences.
  setPreferences: (req, res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id}, req.body)
      .then(dbModel => res.status(200).json({
        message: "User's preferences have been updated."
      }))
      .catch(err => res.json({
        message: "Internal error. Had an issue with updating user's preferences."
      }).status(500));
  },

  getPreferences: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .then(dbModel => res.status(200).json({
        plant_location: dbModel.preferred_room,
        plant_light: dbModel.preferred_sunlight,
        plant_water: dbModel.preferred_water,
        plant_pets: dbModel.pets,
        plant_allergy: dbModel.allergy
      }))
      .catch(err => res.json({
        message: "Internal error. Could not retrieve preferences."
      }).status(500));
  },

  // Handles banned plants
  getBanned: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plants")
      .then(dbUser => 
        res.status(200).json(dbUser.banned))
      .catch(err => res.json({
          message: "Internal error. Please try again."
        }).status(500)
      );
  },

  getBannedIds: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plants")
      .then(dbUser => {
        let plantIds = dbUser.banned.map(plant => plant.id);
        res.status(200).json(plantIds);
      })
      .catch(err => res.json({
          message: "Internal error. Please try again."
        }).status(500)
      );
  },

  banPlant: (req, res) => {
    db.Plant
      .findOne({id: req.body.plant_id})
      .then(dbModel => db.User
        .findOneAndUpdate({_id: req.params.id}, {$push: {banned: dbModel}}, {new: true})
          .then(() => res.status(200).json({
            message: "Banned plant successfully!"
          }))
          .catch(err => res.json({
            message: "Internal error. Could not ban plant."
          }).status(500)))
      .catch(err => res.json({
        message: "Internal error. Could not find the plant the user wanted to ban."
      }).status(500));
  },

  unBanPlant: (req, res) => {
    db.Plant
      .findOne({id: req.params.plant_id})
        .then(dbModel => db.User
          .findOneAndUpdate({_id: req.params.id}, {$pull: {plants: dbModel._id}})
          .then(() =>res.status(200).send("Plant has been unbanned."))
          .catch(err => res.json({
              message: "Internal error. Could not unban plant."
            }).status(500))
        )
        .catch(err => res.json({
          message: "Internal error. Could not find the plant the user wanted to unban."
        }).status(500));
  }
}