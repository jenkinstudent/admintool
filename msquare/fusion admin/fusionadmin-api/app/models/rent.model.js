const mongoose = require("mongoose");

const Rent = mongoose.model(
  "Rent",
  new mongoose.Schema({
    date: {
      type: Date,
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    facility:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UtilityMaster'
    }],
    premisesType: {
      type: String,
      required: true
    },
    propertyType:{
        type:String
    },
    branchCode: {
      type: String,
    },
    branchName: {
      type: String,
      required: true
    },
    securityDeposit:{
        type:String
    },
    monthlyRent:{
        type:String
    },
    totalMonthlyRent:{
        type:Number
    },
    annualIncrementTerm:{
        type:String
    },
    noticePeriod:{
        type:String
    },
    agreementTerm:{
        typ:String
    },
    lockInPeriod:{
        type:String
    },
    areaSqft:{
        type:String
    },
    isFurnished:{
        type:String
    },
    room:{
        type:String
    },
    hall:{
        type:String
    },
    kitchen:{
        type:String
    },
    bathroom:{
        type:String
    },
    storeroom:{
        type:String
    },
    parkingSpace:{
        type:String
    },
    address:{
        type:String
    },
    state:{
            type: String
    },
    city:{
        type:String
    },
    pincode:{
        type:String
    },
    zone:{
        type: String
    },
    cluster:{
        type: String
    },
    division:{
        type: String
    },
    landlordName:{
        type:String
    },
    rentStartDate:{
        type:Date
    },
    rentCycle:{
        type:Number
    },
    mobileNo:{
        type:Number
    },
    panLandlord:{
        type:String
    },
    gstNo:{
        type:String
    },
    bankAccNo:{
        type:Number
    },
    ifscCode:{
        type:String
    },
    accName:{
        type:String
    },
    stampPaperValue:{
        type:Number
    },
    executedDate:{
        type:Date
    },
    effectiveDate:{
        type:Date
    },
    expiryDate:{
        type:Date
    },
    lessorSignature:{
        type:String
    },
    lessosSignature:{
        type:String
    },
    witnessSignature:{
        type:String
    },
    notaryDone:{
        type:String
    },
    electricityBill:{
        type:String
    },
    addressProof:{
        type:String
    },
    maintenanceAmount:{
        type:Number
    },
    notary:{
        type:String
    },
    agreementCopy:{
        type:String,
    },
    agreement:[{
        file:{
            type:String
        },
        fileNo:{
            type:String
        },
        year:{
            type:Number
        }
    }],
    panOwner:{
        type:String
    },
    aadharOwner:{
        type:String
    },
    bankAccDetailsOwner:{
        type:String
    },
    premiseImage:{
        type:String
    },
    authorityCopy:{
        type:String
    },
    executedDateOfRentAgreement:{
        type:Date
    },
    isTradeLicence:{
        type:String,
        default: 'No'
    },
    tradeLicenceFromDate:{
        type:Date
    },
    tradeLicenceToDate:{
        type:Date
    },
    tradeLicenceExpiryDate:{
        type:Date
    },
    noOfManpower:{
        type:Number
    },
    isAddressMatched:{
        type:String
    },
    sneCertificate:{
        type: String
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }
  }, {
    timestamps: true
  })
);

module.exports = Rent;