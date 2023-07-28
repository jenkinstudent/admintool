const mongoose = require("mongoose");

const Activity = mongoose.model(
  "Activity",
  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rent'
    },
    utility:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Utility'
    },
    utilityBill:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Utilitybill'
    },
    rentBill:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Rentbill'
    },
    currentData:{
        type: Object
    },
    updatedData:{
        type: Object
    }
  }, {
    timestamps: true
  })
);

module.exports = Activity;