const mongoose = require("mongoose");

const Courier = mongoose.model(
  "Courier",
  new mongoose.Schema({
    utility:[
        {
           documentName:{
            type:String
           },
           refNo:{
            type:String
           },
           quantity:{
            type:Number
           }
        }
    ],
    destination:{
        type: String,
        required: true
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    cluster: {
        type:String
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
    },
    vendorName:{
        type:String,
        required: true
    },
    vendorGstNo: {
        type: String
    },
    invoiceNo: {
        type: String,
        required: true
    },
    premiseType: {
        type: String,
    },
    propertyType: {
        type: String,
    },
    origination:{
        type:String
    },
    courierChanges:{
        type:Number,
        required: true
    },
    gstChanges:{
        type:Number,
        required: true
    },
    totalAmount:{
        type:Number,
        required: true
    },
    courierInvoice:{
        type:String,
        required: true
    },
    verifyStatus:[{
        role:{
            type:String
        },
        status:{
            type:String,
            enum:["Pending","Verified"]
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        statusUpdatedOn:{
            type:Date
        }
    }],
    fverifyStatus:[{
        role:{
            type:String
        },
        status:{
            type:String,
            enum:["Pending","Verified"]
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        statusUpdatedOn:{
            type:Date
        }
    }],
    status: {
        type: String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    },
    adminStatus:{
        type:String,
        default:"Pending",
        enum:["Pending","Approved","Rejected"]
    },
    adminStatusDate:{
        type:Date
    },
    adminStatusRemark:{
        type:String
    },
    adminRejectRemark:{
        type:String
    },
    adminApproved:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    rejectedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    financeStatus:{
        type:String,
        default:"Pending",
        enum:["Pending","Approved","Rejected"]
    },
    financeStatusDate:{
        type:Date
    },
    financeStatusRemark:{
        type:String
    },
    financeRejectRemark:{
        type:String
    },
    financeApproved:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
  }, {
    timestamps: true
  })
);

module.exports = Courier;