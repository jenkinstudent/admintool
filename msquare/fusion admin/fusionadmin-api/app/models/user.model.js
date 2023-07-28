const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    mobile:{
      type:Number
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum:["admin","branch"]
    },
    roleProfile:{
      type:String,
      enum:["admin","finance","business","field admin"]
    },
    designation:{
      id:{
        type:String
      },
      name:{
        type:String
      },
      role:{
        type:String
      }
    },
    status: {
      type: String,
      default:"Active",
      enum:["Active","Inactive"]
    },
    issuperadmin:{
      type:Boolean
    },
    lastLoginOn: {
      type: Date
    },
    code:{
      type:String
    },
    branchId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Branch'
    },
    permissions:{
      isUtility: {
        type: Boolean
      },
      isRent: {
        type: Boolean
      },
      branch:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
      }],
      utilitySlab:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ApprovalLevels'
      },
      rentSlab:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ApprovalLevels'
      }
    }
  }, {
    timestamps: true
  })
);

module.exports = User;