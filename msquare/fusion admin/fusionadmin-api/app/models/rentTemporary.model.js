const mongoose = require("mongoose");

const RentTemporary = mongoose.model(
  "RentTemporary",
  new mongoose.Schema({
    rent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rent'
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
    },
    financeStatus: {
        type: String,
        enum:["Pending","Confirmed"],
        default:"Pending"
    },
    financeConfirmed:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
  }, {
    timestamps: true
  })
);

module.exports = RentTemporary;