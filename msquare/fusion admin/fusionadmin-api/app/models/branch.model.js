const mongoose = require("mongoose");

const Branch = mongoose.model(
  "Branch",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    code: {
        type: String,
        required: true,
        unique:true
    },
    propertyType:{
        type:String,
        enum:['Domestic', 'Commercial']
    },
    premisesType:{
      type:String,
    },
    address:{
        type:String,
    },
    pincode:{
      type:String
    },
    city:{
      type:String
    },
    state:{
      type: String
    },
    zone:{
        type: String
    },
    division:{
        type: String
    },
    cluster:{
        type: String
    },
    isUtility:{
      type:Boolean
    },
    isRent:{
      type:Boolean
    },
    status:{
      type:String,
      default:"Active",
      enum:["Active","Inactive"]
    }
  }, {
    timestamps: true
  })
);

module.exports = Branch;