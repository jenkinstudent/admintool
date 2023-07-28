// const db = require("../models");
// const {
//     meter: Meter,
// } = db;

// const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

// exports.create = (req, res) => {
//     const meter = new Meter(req.body);

//     meter.save((err, data) => {
//         if (err) {
//             const error = mongooseErrorHandler(err);
//             res.status(error.status || 500);
//             res.json({
//                 error: {
//                     status: "error",
//                     message: error.message
//                 }
//             });

//             return;
//         }

//         res.status(200).send({
//             status: 'success',
//             message: "Meter created successfully!"
//         });
//     });
// };

// exports.get = async (req, res) => {
//     let meter = await Meter.find({}).populate("utility").sort({name:1});
//     res.status(200).send({
//         status: "success",
//         message: "All Meters retrieved",
//         data: meter
//     });
// }

// exports.getByBranch = async (req, res) => {
//     let meter = await Meter.find({utility:req.params.branch}).populate("utility").sort({name:1});
//     res.status(200).send({
//         status: "success",
//         message: "All Meters retrieved",
//         data: meter
//     });
// }

// exports.single = async (req, res) => {
//     let meter = await Meter.findById(req.params.id).populate("utility");
//     res.status(200).send({
//         status: "success",
//         message: "Single Meter retrieved",
//         data: meter
//     });
// }

// exports.update = async (req, res) => {
//     Meter.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
//         if (err) {
//             res.status(500).send({
//                 error: {
//                     status: "error",
//                     message: err
//                 }
//             });
//             return;
//         }

//         res.status(200).send({
//             status: "success",
//             message: "Meter successfully Updated",
//         });
//     });
// }

// exports.delete = async (req, res) => {
//     Meter.findByIdAndDelete(req.params.id, (err, data) => {
//         if (err) {
//             res.status(500).send({
//                 error: {
//                     status: "error",
//                     message: err
//                 }
//             });
//             return;
//         }

//         res.status(200).send({
//             status: "success",
//             message: "Meter successfully Deleted",
//         });
//     });
// }
