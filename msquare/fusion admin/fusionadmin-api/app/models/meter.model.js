const mongoose = require("mongoose");

const Meter = mongoose.model(
  "Meter",
  new mongoose.Schema({
    name: {
      type: String,
    },
    meterId: {
        type: String,
    },
    initialReading: {
        type: Number,
    },
    allowedConsumption:{
        type:Number
    },
    maximumConsumption:{
        type:Number
    },
    utility:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Utility'
    }
  }, {
    timestamps: true
  })
);

module.exports = Meter;