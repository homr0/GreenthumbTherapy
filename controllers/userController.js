const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  create: (req, res) => {
    db.Register
      .create(req.body)
      // .then(dbModel => res.json(dbModel))
      // .catch(err => res.status(422).json(err));
      .then(() => res.status(200).send("Welcome to Greenthumb Therapy!"))
      .catch(err => {
        console.log(err);
        res.status(500).send("Error registering new user please try again.")
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    db.User
      .findOne(email)
      .then(user => {
        (!user) ? res.status.json({
          error: "Incorrect email or password!"
        }) : user.isCorrectPassword(password, (err, same) => {
          if(err) res.status(500)
            .json({
              error: "Internal error please try again"
            });
          else if(!same) res.status(401)
            .json({
              error: "Incorrect email or password"
            });
          else {
            // Issues token.
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h"
            });
            res.cookie("token", token, { httpOnly: true }).sendStatus(200);
          }
        })
      })
      .catch(err => res.status(500)
        .json({
          error: "Internal error please try again"
        })
      );
  },

  getPlants: (req, res) => {
    db.User
      .findOne({_id: req.params.id})
      .populate("plant")
      .then(dbUser => res.status(200).send(dbUser))
      .catch(err => res.status(500)
        .json({
          error: "Internal error please try again."
        })
      );
  },

  favoritePlant: (req, res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id}, {$push: {plants: req.body.plant_id}}, {new: true})
      .then(() => res.status(200).send("Favorited plant successfully!"))
      .catch(err => res.status(500)
        .json({
          error: "Internal error. Could not favorite plant."
        })
      );
  },

  removePlant: (req, res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id}, {$pull: {plants: req.params.plant_id}})
      .then(() =>res.status(200).send("Plant has been removed from favorites"))
      .catch(err => res.status(500)
        .json({
          error: "Internal error. Could not remove plant from favorites."
        })
      );
  }
}