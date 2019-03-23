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
    // Takes in the parameters with the token.\
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
              if(!dbModel) {
                axios.get(PLANTURL + "/" + plant.id, {
                  params:  { token: PLANTAPIKEY }
                })
                  .then(plantData => {
                    let data = plantData.data;
                    // Gets plant's image.
                    if(data.images.length > 0) plant.image = data.images[0].url;

                    let species = data.main_species;

                    // Get plant's height.
                    if(species.specifications.mature_height.ft) plant.height_mature_ft = species.specifications.mature_height.ft;

                    // Get plant's shade tolerance.
                    if(species.growth.shade_tolerance) plant.shade_tolerance = species.growth.shade_tolerance;

                    // Get plant's moisture use.
                    if(species.growth.moisture_use) plant.moisture_use = species.growth.moisture_use;

                    // Get plant's growth habit.
                    if(species.specifications.growth_habit) plant.growth_habit = species.specifications.growth_habit;

                    // Get plant's flower conspicuous condition.
                    if(species.flower.conspicuous) plant.flower_conspicuous = true;

                    // Get plant's propogation by seed condition.
                    if(species.propagation.seed) plant.propogated_by_seed = true;

                    // Get plant's palatability to humans.
                    if(species.products.palatable_human) plant.palatable_human = true;

                    // Get plant's lumber product condition.
                    if(species.products.lumber) plant.lumber_product = true;

                    // Get plant's nursery stock product condition.
                    if(species.products.nursery_stock) plant.nursery_stock_product = true;

                    // Adds plant to the database.
                    db.create(plant)
                      .then(dbModelNew => plants.push(dbModelNew))
                      .catch(err => res.status(422).json(err));
                  })
                  .catch(err => console.log(err));
                } else {
                  plants.push(dbModel);
                }

              if((index + 1) === response.data.length) res.status(200).json(plants);
            })
            .catch(err => res.status(422).json(err));
        });
      })
      .catch(err => {
        // Checks the local database for any plants that match.
        delete req.body.token;
        db.find(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      });
  });

module.exports = router;