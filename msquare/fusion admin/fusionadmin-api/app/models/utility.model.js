const mongoose = require("mongoose");

const Utility = mongoose.model(
  "Utility",
  new mongoose.Schema({
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    utility:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UtilityMaster',
        required:true
    },
    branchCode: {
      type: String,
    },
    branchName: {
      type: String,
      required: true
    },
    date: {
        type: Date,
    },
    premisesType: {
        type: String,
        required: true
    },
    propertyType:{
        type:String,
        required:true
    },
    
    cluster: {
        type:String
    },
    zone: {
        type: String
    },
   
    utilities: [
        {
            name: {
                type: String,
                required:true
            },
            billType:{
                type: String
            },
            meterId: {
                type: String
            },
            initialReading: {
                type: Number,
            },
            allowedConsumption:{
                type:Number,
                required:true
            },
            maximumConsumption:{
                type:Number,
                required:true
            },
            utilityStartDate: {
                type: Date,
                required:true
            },
            utilityCycle: {
                type: String,
                required:true
            },
            tdsAmount: {
                type: Number,
            },
            tdsCertificate: {
                type: String,
            },
        }
    ],
   
    address:{
        type: String,
    },
    state:{
        type: String
    },
    division:{
        type: String
    },
    city:{
        type: String,
    },
    pincode:{
        type: String,
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },
   
  }, {
    timestamps: true
  })
);

module.exports = Utility;