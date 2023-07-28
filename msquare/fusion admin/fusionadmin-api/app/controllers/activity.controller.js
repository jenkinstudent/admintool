const db = require("../models");
const {
    activity: Activity,
} = db;
var _ = require('lodash');

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    if(req.body.rent == undefined || req.body.rent == null || req.body.rent == ''){
        delete req.body.rent;
    }
    if(req.body.utility == undefined || req.body.utility == null || req.body.utility == ''){
        delete req.body.utility;
    }
    const activity = new Activity(req.body);

    activity.save((err, data) => {
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
            message: "Activity created successfully!"
        });
    });
};

exports.getData = async (req, res) => {

    let query = {};
    if(req.body.rent != undefined){
        query.rent = req.body.rent;
    }
    if(req.body.utility != undefined){
        query.utility = req.body.utility;
    }
    if(req.body.user != undefined){
        query.user = req.body.user;
    }
    let activity = await Activity.find(query).populate("rent").populate("utility").populate("user");
    res.status(200).send({
        status: "success",
        message: "All Activitys retrieved",
        data: activity
    });
}

exports.get = async (req, res) => {
    let activity = await Activity.find({_id:{$in:req.branches}});
    var groups = _.groupBy(activity, "activity");
    var array = [];
    _.forOwn(groups, function(value, key){
        array.push(key);
    });
    res.status(200).send({
        status: "success",
        message: "All Activitys retrieved",
        data: array
    });
}

exports.single = async (req, res) => {
    let activity = await Activity.findById(req.params.id).populate("zone").populate("division");
    res.status(200).send({
        status: "success",
        message: "Single Activity retrieved",
        data: activity
    });
}

exports.update = async (req, res) => {
    if(req.body.rent == undefined || req.body.rent == null || req.body.rent == ''){
        delete req.body.rent;
    }
    if(req.body.utility == undefined || req.body.utility == null || req.body.utility == ''){
        delete req.body.utility;
    }
    Activity.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "Activity successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Activity.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Activity successfully Deleted",
        });
    });
}
