const mongoose = require("mongoose");

const Utilitybill = mongoose.model(
  "Utilitybill",
  new mongoose.Schema({
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    branchCode:{
        type:String
    },
    branchName:{
        type:String
    },
    cluster:{
        type:String
    },
    state:{
        type:String
    },
    zone:{
        type:String
    },
    division:{
        type:String
    },
    date: {
        type: Date,
        required: true,
    },
    meter: {
        name: {
            type: String,
            required:true
        },
        billType:{
            type:String
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
    },
    utility:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Utility'
    },
    utilityMaster:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UtilityMaster'
    },
    old:{
        type:Boolean,
        default:false
    },
    billNo: {
        type: String
    },
    voucherNo: {
        type: String,
        required: true,
    },
    vendorName: {
        type: String
    },
    billType: {
        type: String,
    },
    invoiceDate: {
        type: Date,
        required: true,
    },
    fromBillDate: {
        type: Date,
        required: true,
    },
    toBillDate: {
        type: Date,
        required: true,
    },
    noOfDays: {
        type: Number,
        required: true,
    },
    consumption: {
        type: Number
    },
    initReading:{
        type:Number
    },
    finalReading:{
        type:Number
    },
    chargesPerUnit:{
        type:Number
    },
    totalBill:{
        type:Number
    },
    perTotalBill:{
        type:Number
    },
    billAmount: {
        type: Number,
        required: true,
    },
    lateFee: {
        type: Number,
        required: true,
    },
    arrear:{
        type:Number
    },
    grossAmount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    fundsToBeTransferred: {
        type: String,
    },
    branchAccount: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
        required: true,
    },
    billDocument: [{
        type: String,
        required: true,
    }],
    verifyStatus:[{
        slab:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'ApprovalLevels'
        },
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
        slab:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'ApprovalLevels'
        },
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
    rejectedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    adminApproved:{
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
    courier:{
        type:Boolean
    },
    isOpen:{
        type:Boolean,
        default:false
    },
    isFOpen:{
        type:Boolean,
        default:false
    },
    rework:{
        type:Boolean,
        default:false
    },
    transactionReceipt:{
        type:String
    },
    transactionDate:{
        type:Date
    },
    transactionAmt:{
        type:Number
    },
    billStatus:{
        type:String,
        enum:["Draft","Submitted"],
        default:"Draft"
    }
  }, {
    timestamps: true
  })
);

module.exports = Utilitybill;