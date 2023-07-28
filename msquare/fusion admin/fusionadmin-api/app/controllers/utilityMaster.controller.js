const db = require("../models");
const {
    utilityMaster: UtilityMaster,
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const utilityMaster = new UtilityMaster(req.body);

    utilityMaster.save((err, data) => {
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
            message: "UtilityMaster created successfully!",
            data:data
        });
    });
};

exports.get = async (req, res) => {
    const page = parseInt(req.query.page) ||  1;
    const limit = 200;
    const skip = (page - 1) * limit;
    let where = {};
    let search = "";
    let sort = {};
    let populate = "";
    if(req.query.where != undefined && req.query.where != ""){
        where = JSON.parse(req.query.where);
    }

    if(req.query.sort != undefined && req.query.sort != ""){
        sort = JSON.parse(req.query.sort);
    }

    if(req.query.populate != undefined && req.query.populate != ""){
        populate = JSON.parse(req.query.populate);
    }

    if(req.query.search != undefined && req.query.search != ""){
        search = req.query.search;
        where.$or = [
            { name: { $regex: search, $options: 'i' } },
            { code: { $regex: search } },
            { cluster: { $regex: search, $options: 'i' } },
            { division: { $regex: search, $options: 'i' } },
            { zone: { $regex: search, $options: 'i' } },
            { city: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },

        ];
    }

    let utilityMaster = await UtilityMaster.find(where).sort(sort).populate(populate).skip(skip).limit(limit).exec();
    let totalRecords = await UtilityMaster.find({}).countDocuments();
    let records = UtilityMaster.find(where).sort(sort).populate(populate).skip(skip).limit(limit).countDocuments();
    const totalPages = records/limit;
    const hasMore = totalRecords > skip + limit;

    res.status(200).send({
        status: "success",
        message: "All UtilityMasters retrieved",
        data: utilityMaster,
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages),
    });
}

exports.single = async (req, res) => {
    let utilityMaster = await UtilityMaster.findById(req.params.id);
    res.status(200).send({
        status: "success",
        message: "Single UtilityMaster retrieved",
        data: utilityMaster
    });
}

exports.update = async (req, res) => {
    UtilityMaster.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "UtilityMaster successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    UtilityMaster.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "UtilityMaster successfully Deleted",
        });
    });
}
