const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String, //URL
    required: true,
  },
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
