const db = require("../models");
const {
    rent: Rent,
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');
const Branch = require("../models/branch.model");

exports.create = (req, res) => {
    if(req.body.rentStartDate == undefined || req.body.rentStartDate == null || req.body.rentStartDate == '' || req.body.rentStartDate == 'NaN-aN-aN'){
        delete req.body.rentStartDate;
    }
    if(req.body.executedDate == undefined || req.body.executedDate == null || req.body.executedDate == '' || req.body.executedDate == 'NaN-aN-aN'){
        delete req.body.executedDate;
    }
    if(req.body.effectiveDate == undefined || req.body.effectiveDate == null || req.body.effectiveDate == '' || req.body.effectiveDate == 'NaN-aN-aN'){
        delete req.body.effectiveDate;
    }
    if(req.body.expiryDate == undefined || req.body.expiryDate == null || req.body.expiryDate == '' || req.body.expiryDate == 'NaN-aN-aN'){
        delete req.body.expiryDate;
    }
    if(req.body.executedDateOfRentAgreement == undefined || req.body.executedDateOfRentAgreement == null || req.body.executedDateOfRentAgreement == '' || req.body.executedDateOfRentAgreement == 'NaN-aN-aN'){
        delete req.body.executedDateOfRentAgreement;
    }
    if(req.body.tradeLicenceFromDate == undefined || req.body.tradeLicenceFromDate == null || req.body.tradeLicenceFromDate == '' || req.body.tradeLicenceFromDate == 'NaN-aN-aN'){
        delete req.body.tradeLicenceFromDate;
    }
    if(req.body.tradeLicenceToDate == undefined || req.body.tradeLicenceToDate == null || req.body.tradeLicenceToDate == '' || req.body.tradeLicenceToDate == 'NaN-aN-aN'){
        delete req.body.tradeLicenceToDate;
    }
    if(req.body.tradeLicenceExpiryDate == undefined || req.body.tradeLicenceExpiryDate == null || req.body.tradeLicenceExpiryDate == '' || req.body.tradeLicenceExpiryDate == 'NaN-aN-aN'){
        delete req.body.tradeLicenceExpiryDate;
    }
    const rent = new Rent(req.body);

    rent.save((err, data) => {
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
            message: "Rent created successfully!"
        });
    });
};

exports.get = async (req, res) => {
    const page = parseInt(req.query.page) ||  1;
    const limit = 10;
    const skip = (page - 1) * limit;
    let where = {};
    let search = "";
    let sort = {};
    let populate = "";
    if(req.query.where != undefined && req.query.where != "" && req.query.where != {}){
        where = JSON.parse(req.query.where);
    }

    if(req.query.sort != undefined && req.query.sort != "" && req.query.sort != {}){
        sort = JSON.parse(req.query.sort);
    }

    if(req.query.populate != undefined && req.query.populate != "" && req.query.populate != {}){
        populate = JSON.parse(req.query.populate);
    }

    if(req.query.search != undefined && req.query.search != "" && req.query.search != {}){
        search = req.query.search;
        where.$or = [
            { branchName: { $regex: search, $options: 'i' } },
            { branchCode: { $regex: search } },
            { cluster: { $regex: search, $options: 'i' } },
            { division: { $regex: search, $options: 'i' } },
            { zone: { $regex: search, $options: 'i' } },
            { city: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },

        ];
    }

    let rent = await Rent.find(where).sort(sort).populate("branch").populate("facility").skip(skip).limit(limit).exec();
    let totalRecords = await Rent.find({}).countDocuments();
    let records = await Rent.find(where).sort(sort).countDocuments();
    const totalPages = records/limit;
    const hasMore = records > (skip + limit);
    res.status(200).send({
        status: "success",
        message: "All Rent retrieved",
        data: rent,
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages),
    });
}

exports.getCount = async (req, res) => {
    let cBranch = await Branch.find().sort({name:1});
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2));
    let tommorrow = new Date(date.setDate(currentDate.getDate() - 7));
    let nextDate = new Date(tommorrow.getFullYear() + "-" + ("0" + (tommorrow.getMonth() + 1)).slice(-2) + "-" + ("0" + (tommorrow.getDate())).slice(-2));
    let cRecent = await Rent.find({ createdAt: {$gte: nextDate,$lte: currentDate}})
    let cAssigned = await Rent.find()
    let commercial={
        total:cBranch.length,
        recent:cRecent.length,
        assigned:cAssigned.length,
        pendingAssigned:(cBranch.length - cAssigned.length)
    }
    res.status(200).send({
        status: "success",
        message: "All Rents retrieved",
        commercial: commercial
    });
}

exports.single = async (req, res) => {
    let rent = await Rent.findById(req.params.id).populate("branch").populate("facility");
    res.status(200).send({
        status: "success",
        message: "Single Rent retrieved",
        data: rent
    });
}

exports.update = async (req, res) => {
    if(req.body.rentStartDate == undefined || req.body.rentStartDate == null || req.body.rentStartDate == '' || req.body.rentStartDate == 'NaN-aN-aN'){
        delete req.body.rentStartDate;
    }
    if(req.body.executedDate == undefined || req.body.executedDate == null || req.body.executedDate == '' || req.body.executedDate == 'NaN-aN-aN'){
        delete req.body.executedDate;
    }
    if(req.body.effectiveDate == undefined || req.body.effectiveDate == null || req.body.effectiveDate == '' || req.body.effectiveDate == 'NaN-aN-aN'){
        delete req.body.effectiveDate;
    }
    if(req.body.expiryDate == undefined || req.body.expiryDate == null || req.body.expiryDate == '' || req.body.expiryDate == 'NaN-aN-aN'){
        delete req.body.expiryDate;
    }
    if(req.body.executedDateOfRentAgreement == undefined || req.body.executedDateOfRentAgreement == null || req.body.executedDateOfRentAgreement == '' || req.body.executedDateOfRentAgreement == 'NaN-aN-aN'){
        delete req.body.executedDateOfRentAgreement;
    }
    if(req.body.tradeLicenceFromDate == undefined || req.body.tradeLicenceFromDate == null || req.body.tradeLicenceFromDate == '' || req.body.tradeLicenceFromDate == 'NaN-aN-aN'){
        delete req.body.tradeLicenceFromDate;
    }
    if(req.body.tradeLicenceToDate == undefined || req.body.tradeLicenceToDate == null || req.body.tradeLicenceToDate == '' || req.body.tradeLicenceToDate == 'NaN-aN-aN'){
        delete req.body.tradeLicenceToDate;
    }
    if(req.body.tradeLicenceExpiryDate == undefined || req.body.tradeLicenceExpiryDate == null || req.body.tradeLicenceExpiryDate == '' || req.body.tradeLicenceExpiryDate == 'NaN-aN-aN'){
        delete req.body.tradeLicenceExpiryDate;
    }
    Rent.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "Rent successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Rent.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Rent successfully Deleted",
        });
    });
}


