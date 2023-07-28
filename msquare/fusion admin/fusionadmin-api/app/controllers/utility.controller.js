const db = require("../models");
const {
    utility: Utility,branch: Branch
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
    const utility = new Utility(req.body);

    utility.save((err, data) => {
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
            message: "Utility created successfully!",
            data:data
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
    
    

    
    let utility = await Utility.find(where).sort(sort).populate("branch").populate("utility").skip(skip).limit(limit).exec();
    let totalRecords = await Utility.find({}).countDocuments();
    let records = await Utility.find(where).sort(sort).countDocuments();
    const totalPages = records/limit;
    const hasMore = records > (skip + limit);
    res.status(200).send({
        status: "success",
        message: "All Utilities retrieved",
        data: utility,
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages)
    });
}

exports.getByBranchAUtility = async (req, res) => {
    let utility = await Utility.find({branch:req.params.branch,utility:req.params.utility}).sort({name:1}).populate("branch").populate("utility");
    res.status(200).send({
        status: "success",
        message: "All Utilities retrieved",
        data: utility
    });
}

exports.getCount = async (req, res) => {
    // let cBranch = await Branch.find({propertyType:"Commercial"}).sort({name:1});
    // let dBranch = await Branch.find({propertyType:"Domestic"}).sort({name:1});
    // var date = new Date();
    // let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2));
    // let tommorrow = new Date(date.setDate(currentDate.getDate() - 7));
    // let nextDate = new Date(tommorrow.getFullYear() + "-" + ("0" + (tommorrow.getMonth() + 1)).slice(-2) + "-" + ("0" + (tommorrow.getDate())).slice(-2));
    // let cRecent = await Utility.find({ createdAt: {$gte: nextDate,$lte: currentDate},propertyType:"Commercial"})
    // let dRecent = await Utility.find({ createdAt: {$gte: nextDate,$lte: currentDate},propertyType:"Domestic"})
    // let cAssigned = await Utility.find({propertyType:"Commercial"})
    // let dAssigned = await Utility.find({propertyType:"Domestic"})
    // let commercial={
    //     total:cBranch.length,
    //     recent:cRecent.length,
    //     assigned:cAssigned.length,
    //     pendingAssigned:(cBranch.length - cAssigned.length)
    // }
    // let domestic={
    //     total:dBranch.length,
    //     recent:dRecent.length,
    //     assigned:dAssigned.length,
    //     pendingAssigned:(dBranch.length - dAssigned.length)
    // }
    let branch = await Branch.find({}).sort({name:1});
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2));
    let tommorrow = new Date(date.setDate(currentDate.getDate() - 7));
    let nextDate = new Date(tommorrow.getFullYear() + "-" + ("0" + (tommorrow.getMonth() + 1)).slice(-2) + "-" + ("0" + (tommorrow.getDate())).slice(-2));
    let Recent = await Utility.find({ createdAt: {$gte: nextDate,$lte: currentDate}})
    let Assigned = await Utility.find({})
    let commercial={
        total:branch.length,
        recent:Recent.length,
        assigned:Assigned.length,
        pendingAssigned:(branch.length - Assigned.length)
    }
    res.status(200).send({
        status: "success",
        message: "All Utilities retrieved",
        commercial: commercial,
        // domestic: domestic
    });
}

exports.getByBranch = async (req, res) => {
    let utility = await Utility.find({branch:req.params.branch}).sort({name:1}).populate("branch").populate("utility");
    res.status(200).send({
        status: "success",
        message: "All Utilities retrieved",
        data: utility
    });
}

exports.getExpectedVoucher = async (req, res) => {
    let utility = await Utility.find({branch:req.params.branch}).sort({name:1}).populate("branch").populate("utility");
    let meters = [];
    utility.map(res=>{
        res.utilities.map(ut=>{
            meters.push(ut);
        })
    })
    res.status(200).send({
        status: "success",
        message: "All Utilities retrieved",
        data: meters
    });
}

exports.single = async (req, res) => {
    let utility = await Utility.findById(req.params.id).populate("branch").populate("utility");
    res.status(200).send({
        status: "success",
        message: "Single Utility retrieved",
        data: utility
    });
}

exports.update = async (req, res) => {
    Utility.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
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
            message: "Utility successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Utility.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Utility successfully Deleted",
        });
    });
}
