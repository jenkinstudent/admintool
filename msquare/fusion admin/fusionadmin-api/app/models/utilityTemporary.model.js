const mongoose = require("mongoose");

const UtilityTemporary = mongoose.model(
  "UtilityTemporary",
  new mongoose.Schema({
    utility:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Utility'
    },
    meter: {
      name: {
          type: String
      },
      meterId: {
          type: String
      },
      billType:{
        type:String
      },
      initialReading: {
          type: Number,
      },
      allowedConsumption:{
          type:Number
      },
      maximumConsumption:{
          type:Number,
          required:true
      },
      utilityStartDate: {
          type: Date
      },
      utilityCycle: {
          type: String
      },
      tdsAmount: {
          type: Number,
      },
      tdsCertificate: {
          type: String,
      },
  },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    adminStatus: {
      type: String,
      enum:["Pending","Confirmed"],
      default:"Pending"
    }, 
    adminConfirmed:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  }, {
    timestamps: true
  })
);

module.exports = UtilityTemporary;