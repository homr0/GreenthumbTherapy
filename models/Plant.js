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
  },

  height_mature_ft: {
    type: String
  },

  shade_tolerance: {
    type: String
  },

  moisture_use: {
    type: String
  }
});

module.exports = mongoose.model("Plant", PlantSchema);