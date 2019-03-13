const db = require("../models");

module.exports = {
  // Gets all plants with a certain parameter.
  findAll: (req, res) => {
    db.Plant
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Gets a plant by its id.
  findById: (req, res) => {
    db.Plant
      .findOne({id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Saves a plant into the database.
  create: (req, res) => {
    db.Plant
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // Updates the plant's data.
  update: (req, res) => {
    db.Plant
      .findOneAndUpdate({id: req.params.id}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}