const db = require("../models");
const {
    rentTemporary: RentTemporary,
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const rentTemporary = new RentTemporary(req.body);

    rentTemporary.save((err, data) => {
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
            message: "RentTemporary created successfully!"
        });
    });
};

exports.get = async (req, res) => {
    let rentTemporary = await RentTemporary.find({branch:{$in:req.branches}}).populate("adminConfirmed").populate("financeConfirmed").populate("rent").populate("branch").sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All RentTemporarys retrieved",
        data: rentTemporary
    });
}


exports.getPendingRaised = async (req, res) => {
    let rentTemporary = await RentTemporary.find({branch:{$in:req.branches},adminStatus:"Pending"}).populate("adminConfirmed").populate("financeConfirmed").populate("rent").populate("branch").sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All RentTemporarys retrieved",
        data: rentTemporary
    });
}

exports.single = async (req, res) => {
    let rentTemporary = await RentTemporary.findById(req.params.id).populate("adminConfirmed").populate("financeConfirmed").populate("rent").populate("branch");
    res.status(200).send({
        status: "success",
        message: "Single RentTemporary retrieved",
        data: rentTemporary
    });
}

exports.update = async (req, res) => {
    RentTemporary.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "RentTemporary successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    RentTemporary.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "RentTemporary successfully Deleted",
        });
    });
}
