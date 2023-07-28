const db = require("../models");
const {
    zone: Zone,branch:Branch
} = db;
var _ = require('lodash');

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    // const zone = new Zone(req.body);

    // zone.save((err, data) => {
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
    //         message: "Zone created successfully!"
    //     });
    // });
};

exports.get = async (req, res) => {
    let zone = await Branch.find({_id:{$in:req.branches}});
    var groups = _.groupBy(zone, "zone");
    var array = [];
    _.forOwn(groups, function(value, key){
        array.push(key);
    });
    res.status(200).send({
        status: "success",
        message: "All Zones retrieved",
        data: array
    });
}

exports.single = async (req, res) => {
    // let zone = await Zone.findById(req.params.id);
    // res.status(200).send({
    //     status: "success",
    //     message: "Single Zone retrieved",
    //     data: zone
    // });
}

exports.update = async (req, res) => {
    // Zone.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
    //         message: "Zone successfully Updated",
    //     });
    // });
}

exports.delete = async (req, res) => {
    // Zone.findByIdAndDelete(req.params.id, (err, data) => {
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
    //         message: "Zone successfully Deleted",
    //     });
    // });
}
