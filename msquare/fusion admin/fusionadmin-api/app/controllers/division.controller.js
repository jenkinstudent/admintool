const db = require("../models");
const {
    division: Division,branch:Branch
} = db;
var _ = require('lodash');
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    // const division = new Division(req.body);

    // division.save((err, data) => {
    //     if (err) {
    //         const error = mongooseErrorHandler(err);
    //         res.status(error.status || 500);
    //         res.json({
    //             error: {
    //                 status: "error",
    //                 message: error.message
    //             }
    //         });

    //         return;
    //     }

    //     res.status(200).send({
    //         status: 'success',
    //         message: "Division created successfully!"
    //     });
    // });
};

exports.get = async (req, res) => {
    let division = await Branch.find({_id:{$in:req.branches}});
    var groups = _.groupBy(division, "division");
    var array = [];
    _.forOwn(groups, function(value, key){
        array.push(key);
    });
    res.status(200).send({
        status: "success",
        message: "All Divisions retrieved",
        data: array
    });
}

exports.single = async (req, res) => {
    // let division = await Division.findById(req.params.id).populate("zone");
    // res.status(200).send({
    //     status: "success",
    //     message: "Single Division retrieved",
    //     data: division
    // });
}

exports.update = async (req, res) => {
    // Division.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
    //     if (err) {
    //         res.status(500).send({
    //             error: {
    //                 status: "error",
    //                 message: err
    //             }
    //         });
    //         return;
    //     }

    //     res.status(200).send({
    //         status: "success",
    //         message: "Division successfully Updated",
    //     });
    // });
}

exports.delete = async (req, res) => {
    // Division.findByIdAndDelete(req.params.id, (err, data) => {
    //     if (err) {
    //         res.status(500).send({
    //             error: {
    //                 status: "error",
    //                 message: err
    //             }
    //         });
    //         return;
    //     }

    //     res.status(200).send({
    //         status: "success",
    //         message: "Division successfully Deleted",
    //     });
    // });
}
