const db = require("../models");
const {
    branch: Branch,
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const branch = new Branch(req.body);

    branch.save((err, data) => {
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
            message: "Branch created successfully!",
            data:data
        });
    });
};


exports.createBulkBranch = (req,res)=>{
    Branch.insertMany(req.body.data,(err,data)=>{
        if(err){
            res.status(500).send({ status:"error", message: err });
        } else {
            res.status(200).send({
                status:"success",
                message : "Branch updated successfully",
                data: data
            });
        }
    });
}

exports.get = async (req, res) => {

    const page = parseInt(req.query.page) ||  1;
    const limit = 200;
    const skip = (page - 1) * limit;
    let where = {};
    let search = "";
    let sort = {};
    let populate = "";
    if(req.query.where != undefined && req.query.where != "" && req.query.where != {} ){
        where = JSON.parse(req.query.where);
    }

    if(req.query.sort != undefined && req.query.sort != "" && req.query.sort != {} ){
        sort = JSON.parse(req.query.sort);
    }

    if(req.query.populate != undefined && req.query.populate != "" && req.query.populate != {} ){
        populate = JSON.parse(req.query.populate);
    }

    if(req.query.search != undefined && req.query.search != "" && req.query.search != {} ){
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

    where._id={$in:req.branches}

    let branch = await Branch.find(where).sort(sort).populate(populate).skip(skip).limit(limit).exec();
    let totalRecords = await Branch.find({}).countDocuments();
    let records = await Branch.find(where).sort(sort).countDocuments();
    const totalPages = records/limit;
    const hasMore = records > (skip + limit);
    
    res.status(200).send({
        status: "success",
        message: "All Branches retrieved",
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages),
        data: branch
    });
}

exports.getByCluster = async (req, res) => {
    let branch = await Branch.find({cluster:req.params.cluster}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Branchs retrieved",
        data: branch
    });
}

exports.getByDivision = async (req, res) => {
    let branch = await Branch.find({division:req.params.division}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Branchs retrieved",
        data: branch
    });
}

exports.getByState = async (req, res) => {
    let branch = await Branch.find({state:req.params.state}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Branchs retrieved",
        data: branch
    });
}

exports.getByZone = async (req, res) => {
    let branch = await Branch.find({zone:req.params.zone}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Branchs retrieved",
        data: branch
    });
}

exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page) ||  1;
    const limit = 10000;
    const skip = (page - 1) * limit;
    let where = {};
    let search = "";
    let sort = {};
    let populate = "";
    if(req.query.where != undefined && req.query.where != "" && req.query.where != {} ){
        where = JSON.parse(req.query.where);
    }

    if(req.query.sort != undefined && req.query.sort != "" && req.query.sort != {} ){
        sort = JSON.parse(req.query.sort);
    }

    if(req.query.populate != undefined && req.query.populate != "" && req.query.populate != {} ){
        populate = JSON.parse(req.query.populate);
    }

    if(req.query.search != undefined && req.query.search != "" && req.query.search != {} ){
        search = req.query.search;
        where.$or = [
            { name: { $regex: search, $options: 'i' } },
            { cluster: { $regex: search, $options: 'i' } },
            { division: { $regex: search, $options: 'i' } },
            { zone: { $regex: search, $options: 'i' } },
            { city: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },

        ];
    }

    let branch = await Branch.find(where).sort(sort).populate(populate).skip(skip).limit(limit).exec();
    let totalRecords = await Branch.find({}).countDocuments();

    const totalPages = totalRecords/limit;
    const hasMore = totalRecords > skip + limit;
    res.status(200).send({
        status: "success",
        message: "All Branches retrieved",
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages),
        data: branch
    });
}

exports.single = async (req, res) => {
    let branch = await Branch.findById(req.params.id);
    res.status(200).send({
        status: "success",
        message: "Single Branch retrieved",
        data: branch
    });
}

exports.update = async (req, res) => {
    Branch.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "Branch successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Branch.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Branch successfully Deleted",
        });
    });
}
