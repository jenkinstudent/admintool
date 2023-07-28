const db = require("../models");
const {
    state: State,branch:Branch
} = db;
var _ = require('lodash');

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    // const state = new State(req.body);

    // state.save((err, data) => {
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
    //         message: "State created successfully!"
    //     });
    // });
};

exports.get = async (req, res) => {
    let state = await Branch.find({_id:{$in:req.branches}});
    var groups = _.groupBy(state, "state");
    var array = [];
    _.forOwn(groups, function(value, key){
        array.push(key);
    });
    res.status(200).send({
        status: "success",
        message: "All States retrieved",
        data: array
    });
}

exports.single = async (req, res) => {
    // let state = await State.findById(req.params.id);
    // res.status(200).send({
    //     status: "success",
    //     message: "Single State retrieved",
    //     data: state
    // });
}

exports.update = async (req, res) => {
    // State.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
    //         message: "State successfully Updated",
    //     });
    // });
}

exports.delete = async (req, res) => {
    // State.findByIdAndDelete(req.params.id, (err, data) => {
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
    //         message: "State successfully Deleted",
    //     });
    // });
}
