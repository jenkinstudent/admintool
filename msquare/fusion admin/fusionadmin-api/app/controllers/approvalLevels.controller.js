const db = require("../models");
const {
    approvalLevels: ApprovalLevels,utility:Utility
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const approvalLevels = new ApprovalLevels(req.body);

    approvalLevels.save((err, data) => {
        if (err) {
            const error = mongooseErrorHandler(err);
            res.status(error.status || 500);
            res.json({
                error: {
                    status: "error",
                    message: error.message
                }
            });

            return;
        }

        res.status(200).send({
            status: 'success',
            message: "ApprovalLevels created successfully!",
            data:data
        });
    });
};

exports.get = async (req, res) => {
    let approvalLevels = await ApprovalLevels.find({}).sort({min:1});
    res.status(200).send({
        status: "success",
        message: "All ApprovalLevelss retrieved",
        data: approvalLevels
    });
}

exports.single = async (req, res) => {
    let approvalLevels = await ApprovalLevels.findById(req.params.id);
    res.status(200).send({
        status: "success",
        message: "Single ApprovalLevels retrieved",
        data: approvalLevels
    });
}

exports.update = async (req, res) => {
    ApprovalLevels.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
        if (err) {
            res.status(500).send({
                error: {
                    status: "error",
                    message: err
                }
            });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "ApprovalLevels successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    ApprovalLevels.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                error: {
                    status: "error",
                    message: err
                }
            });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "ApprovalLevels successfully Deleted",
        });
    });
}

exports.calculateApprovalLevels = async (req, res) => {

    let billAmount = req.params.billAmount;
    let isExceted = req.params.isExceted;
    let lessApproval = [];
    let ar = [];
    let utility = await Utility.findById(req.params.utility);
    if(utility.premisesType == 'MFI Branch'){
        lessApproval = await ApprovalLevels.find({max:{$gte:billAmount},min:{$lte:billAmount}});
        if(lessApproval.length > 0){
            if(isExceted == "true"){
                ar.push({slab:lessApproval[0]._id,role:"business",status:"Pending",user:"",statusUpdatedOn:""});
            }
        }
    }
    ar.push({slab:"",role:"L1-Admin",status:"Pending",user:"",statusUpdatedOn:""})
    res.status(200).send({
        status: "success",
        message: "ApprovalLevels ",
        data: ar
    });
    
}

exports.calculateFinanceApprovalLevels = async (req, res) => {
    let ar = [];
    ar.push({slab:"",role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""})
    res.status(200).send({
        status: "success",
        message: "ApprovalLevels ",
        data: ar
    });



    
}
