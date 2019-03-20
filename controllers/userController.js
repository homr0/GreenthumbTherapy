const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  create: (req, res) => {
    db.User
      .create(req.body)
      .then(() => res.status(200).json({
        status: 200,
        message: "Welcome to Greenthumb Therapy!"
      }))
      // .catch(err => res.status(500).send("Error registering new user please try again."));
      .catch(err => res.json({
        status: 500,
        message: "This email is already tied to another account."
      }).status(500));
  },

  login: (req, res) => {
    const { email, password } = req.body;

    db.User
      .findOne({email: email})
      .then(user => {
        (!user) ? res.json({
          status: 401,
          message: "This email does not belong to a recognized user."
        }).status(401) : user.isCorrectPassword(password)
          .then(same => {
            if(!same) res.json({
              status: 401,
              message: "Incorrect password."
            }).status(401);
            else {
              // Issues token
              const payload = {
                id: user._id
              };

              const token = jwt.sign(payload, "secret", {
                expiresIn: "1h"
              });

              res.cookie("token", token, {httpOnly: true}).status(200).json({
                status: 200,
                message: "You have signed into Greenthumb Therapy"
              });
            }
          });
      })
      .catch(err => res.json({
          error: "Internal error please try again"
        }).status(500));
  },

  getPlants: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plant")
      .then(dbUser => res.status(200).send(dbUser))
      .catch(err => res.status(500).json({
          error: "Internal error please try again."
        })
      );
  },

  favoritePlant: (req, res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id}, {$push: {plants: req.body.plant_id}}, {new: true})
      .then(() => res.status(200).send("Favorited plant successfully!"))
      .catch(err => res.status(500).json({
          error: "Internal error. Could not favorite plant."
        })
      );
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