const db = require("../models");
const {
    utilityTemporary: UtilityTemporary,
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const utilityTemporary = new UtilityTemporary(req.body);

    utilityTemporary.save((err, data) => {
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
            message: "UtilityTemporary created successfully!"
        });
    });
};

exports.get = async (req, res) => {
    let utilityTemporary = await UtilityTemporary.find({branch:{$in:req.branches}}).populate("adminConfirmed").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}}).populate("branch").sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All UtilityTemporarys retrieved",
        data: utilityTemporary
    });
}

exports.getByDate = async (req, res) => {
    let currentDate = new Date(req.params.date1);
    let nextDate = new Date(req.params.date2);
    let utilityTemporary = await UtilityTemporary.find({createdAt:{$gte:currentDate,$lte:nextDate},branch:{$in:req.branches}}).populate("adminConfirmed").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}}).populate("branch").sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All UtilityTemporarys retrieved",
        data: utilityTemporary
    });
}

exports.single = async (req, res) => {
    let utilityTemporary = await UtilityTemporary.findById(req.params.id).populate("adminConfirmed").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}}).populate("branch");
    res.status(200).send({
        status: "success",
        message: "Single UtilityTemporary retrieved",
        data: utilityTemporary
    });
}

exports.update = async (req, res) => {
    UtilityTemporary.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "UtilityTemporary successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    UtilityTemporary.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "UtilityTemporary successfully Deleted",
        });
    });
}
