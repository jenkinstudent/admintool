const mongoose = require("mongoose");

const Rentbill = mongoose.model(
  "Rentbill",
  new mongoose.Schema({
    voucherNo: {
        type: String,
        required: true,
    },
    rent:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rent'
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    pendingArrear:{
        type:Number
    },
    waiver:{
        type:Number
    },
    deduction:{
        type:Number
    },
    securityDepositAdjust:{
        type:Number
    },
    firstRentTrasnfer:{
        type:Number
    },
    terms:{
        type:Number
    },
    effectiveDate:{
        type:Date
    },
    expiryDate:{
        type:Date
    },
    increment:{
        type:Number
    },
    totalTransferRent:{
        type:Number
    },
    remarks:{
        type:String
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
        },
        remark:{
            type:String
        },
        document:{
            type:String
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
        },
        remark:{
            type:String
        },
        document:{
            type:String
        }
    }],
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
    adminStatusDocument:{
        type:String
    },
    adminRejectRemark:{
        type:String
    },
    adminRejectDocument:{
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
    financeStatusDocument:{
        type:String
    },
    financeRejectRemark:{
        type:String
    },
    financeRejectDocument:{
        type:String
    },
    financeApproved:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isTds:{
        type:Boolean,
        default:false
    },
    tds:{
        type:Number
    },
    totalRentAfterDeduction:{
        type:Number
    },
    rework:{
        type:Boolean,
        default:false
    },
  }, {
    timestamps: true
  })
);

module.exports = Rentbill;