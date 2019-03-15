const router = require("express").Router();
const axios = require("axios");

const Plant = require("../plantController");

const PLANTURL = "https://trefle.io/api/plants";
const PLANTAPIKEY = "WGEzWlEvMDFpOGlCQ3haODB1MC81UT09";

// Pulls plant data from the Trefle API.
router.route("/search")
  .post((req, res) => {
    // Takes in the parameters with the token.
    req.body.token = PLANTAPIKEY;
    axios.get(PLANTURL, { params: req.body })
      .then(response => {
        let plants = [];

        // Gets the individual plant id and checks if it's already in the database.
        response.data.map(plant => {
            plants.push(plant);

            console.log(PLANTURL + "/" + plant.id);
          // If the plant is in the database, then pull its information from the database.
          // Plant.findById(plant.id)
          //   .then(dbModel => plants.push(dbModel))
          //   .catch(err => {
          //     console.log(err);

          // //  The plant is not in the database and needs to be pulled from Trefle.
          //     axios.get(PLANTURL + "/" + plant.id, {
          //       params: { token: PLANTAPIKEY}
          //     })
          //       .then(plantData => {
          //         Plant.create(plantData.data)
          //           .then(() => plants.push(plantData.data))
          //           .catch((err) => console.log(err));
          //       })
          //       .catch(err => console.log(err));
          //   });
          // // plants.push(plant.id);
        });
        console.log(plants);
        res.send(plants);
      })
      .catch(err => console.log(err));
  });

module.exports = router;