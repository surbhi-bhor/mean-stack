const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var flightSchema = new Schema({
  flightCode: {
    type: String,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  
  fare: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Flight", flightSchema);