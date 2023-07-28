const db = require("../models");
const {
    role: Role,
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const role = new Role(req.body);

    role.save((err, data) => {
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
            message: "Role created successfully!"
        });
    });
};

exports.get = async (req, res) => {
    let role = await Role.find({}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Roles retrieved",
        data: role
    });
}

exports.single = async (req, res) => {
    let role = await Role.findById(req.params.id);
    res.status(200).send({
        status: "success",
        message: "Single Role retrieved",
        data: role
    });
}

exports.update = async (req, res) => {
    Role.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "Role successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Role.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Role successfully Deleted",
        });
    });
}
