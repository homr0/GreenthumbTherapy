const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  common_name: {
    type: String
  },

  scientific_name: {
    type: String,
    required: true
  },

  image: {
    type: String
  }
});

module.exports = mongoose.model("Plant", PlantSchema);