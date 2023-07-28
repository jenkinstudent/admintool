const mongoose = require("mongoose");

const UtilityMaster = mongoose.model(
  "UtilityMaster",
  new mongoose.Schema({
    name: {
      type: String,
    },
    isElectricity: {
        type: Boolean,
    },
    billTypes:{
      type:Array
    }
  }, {
    timestamps: true
  })
);

module.exports = UtilityMaster;