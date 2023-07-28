const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    isUtility: {
      type: Boolean
    },
    isRent: {
      type: Boolean
    },
    maxBillAmt: {
      type: Number
    },
    canRaiseEscalated:{
      type:Boolean
    },
    maxRentAmt: {
      type: Number
    }
  }, {
    timestamps: true
  })
);

module.exports = Role;