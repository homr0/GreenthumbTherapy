const router = require("express").Router();
const axios = require("axios");

const Plant = require("../plantController");
const db = require("../../models/Plant");

const PLANTURL = "https://trefle.io/api/plants";
const PLANTAPIKEY = "WGEzWlEvMDFpOGlCQ3haODB1MC81UT09";

// Handles getting from the database as well as creating new entries.
router.route("/")
  .get(Plant.findAll)
  .post(Plant.create);

// Pulls plant data from the Trefle API.
router.route("/search")
  .post((req, res) => {
    // Takes in the parameters with the token.
    req.body.token = PLANTAPIKEY;
    axios.get(PLANTURL, { params: req.body })
      .then(response => {
        let plants = [];

        // Gets the individual plant id and checks if it's already in the database.
        response.data.map((plant, index) => {
          // Find if the plant is in the database.
          db.findOne({id: plant.id})
            .then(dbModel => {
              // Checks if the plant is in the database.
              (!dbModel) ? axios.get(PLANTURL + "/" + plant.id, {
                  params:  { token: PLANTAPIKEY }
                })
                  .then(plantData => {
                    // Gets plant image
                    if(plantData.data.images.length > 0) plant.image = plantData.data.images[0].url;

                    // Adds plant to the database.
                    db.create(plant)
                      .then(dbModelNew => plants.push(dbModelNew))
                      .catch(err => res.status(422).json(err));
                  })
                  .catch(err => res.status(422).json(err))
                  : plants.push(plant);

              if((index + 1) === response.data.length) res.status(200).json(plants);
            })
            .catch(err => res.status(422).json(err));
        });
      })
      .catch(err => {
        // Checks the local database for any plants that match.
        db.find(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      });
  });

module.exports = router;