const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  create: (req, res) => {
    db.User
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
  } 
}