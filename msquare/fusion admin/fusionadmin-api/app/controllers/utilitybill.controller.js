const db = require("../models");
const {
    utilitybill: Utilitybill,
    user: User,
    utility: Utility,
    branch: Branch,
    notificationTrans: NotificationTrans
} = db;

var nodemailer = require('nodemailer');
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');
const UtilityMaster = require("../models/utilityMaster.model");

exports.create = async (req, res) => {
    let check = await Utilitybill.find({
        billNo: req.body.billNo
    });
    if (check.length > 0) {
        res.status(500).send({
            error: {
                status: "error",
                message: "Duplicate Bill No. Found"
            }
        });
        return;
    } else {
        let date = new Date(req.body.invoiceDate);
        let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
        let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(date.getFullYear(),(date.getMonth() + 1)))).slice(-2));
        let utilityBill = await Utilitybill.find({
            invoiceDate: {
                $gte: currentDate,
                $lte: nextDate
            },
            utility: req.body.utility,
            "meter.meterId": req.body.meter?.meterId
        });
        if (utilityBill.length > 0) {
            res.status(500).send({
                error: {
                    status: "error",
                    message: "Bill already raised for current month"
                }
            });
            return;
        } 
        if(req.body.billType == 'Sub Meter'){
            let lastUtilityBill = await Utilitybill.find({
                invoiceDate: {
                    $lte: currentDate
                },
                utility: req.body.utility,
                "meter.meterId": req.body.meter?.meterId
            }).sort({invoiceDate:-1});
            if(lastUtilityBill[0].finalReading < req.body.initReading){
                res.status(500).send({
                    error: {
                        status: "error",
                        message: "The initial reading of month can not be less then final reading of last month bill"
                    }
                });
                return;
            }
        }
        let utilityCount = await Utilitybill.find({
            utilityMaster: req.body.utilityMaster
        });
        if(utilityCount.length > 0){
            req.body.voucherNo = req.body.utilityMaster?.name.charAt(0) + (utilityCount.length + 1);
        }else{
            req.body.voucherNo = req.body.utilityMaster?.name.charAt(0) + (1);
        }
        for (let i in req.body.verifyStatus) {
            if (req.body.verifyStatus[i].user == undefined || req.body.verifyStatus[i].user == null || req.body.verifyStatus[i].user == '') {
                delete req.body.verifyStatus[i].user;
            }
            if (req.body.verifyStatus[i].slab == undefined || req.body.verifyStatus[i].slab == null || req.body.verifyStatus[i].slab == '') {
                delete req.body.verifyStatus[i].slab;
            }
        }
        for (let i in req.body.fverifyStatus) {
            if (req.body.fverifyStatus[i].user == undefined || req.body.fverifyStatus[i].user == null || req.body.fverifyStatus[i].user == '') {
                delete req.body.fverifyStatus[i].user;
            }
            if (req.body.fverifyStatus[i].slab == undefined || req.body.fverifyStatus[i].slab == null || req.body.fverifyStatus[i].slab == '') {
                delete req.body.fverifyStatus[i].slab;
            }
        }
        let utBill = await Utilitybill.find({branch:{$in: req.branches},utility: req.body.utility,"meter.meterId": req.body.meter?.meterId}).sort({invoiceDate:-1});
        if(utBill.length > 0){
            if(new Date(utBill[0].invoiceDate) > new Date(req.body.invoiceDate)){
                req.body.old = true;
            }else{
                req.body.old = false;
            }
        }else{
            req.body.old = false;
        }
        const utilitybill = new Utilitybill(req.body);

        utilitybill.save(async (err, data) => {
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
            let user = await User.find({
                $or: [{
                    roleProfile: "admin"
                }, {
                    roleProfile: "business"
                }],
                "permissions.branch": {
                    $in: req.body.branch
                }
            });
            let branch = await Branch.findById(req.body.branch);
            let notTrnasAr = [];
            for (let i in user) {
                notTrnasAr.push({
                    userId: user[i]._id,
                    userType: "admin",
                    typeId:data._id,
                    title: "Utility Bill (" + req.body.voucherNo + ") Raised",
                    message: 'Check utility bill (' + req.body.voucherNo + ') raised for ' + req.body.utilityMaster?.name + ' By Branch ' + branch.code + ' - ' + branch.name,
                    createdAt: new Date(),
                    status: 0
                });
                let transporter = nodemailer.createTransport({
                    host: 'smtppro.zoho.in',
                    port: 465,
                    secure: true,
                    auth: {
                      user: 'adminportal@fusionmicrofinance.in',
                      pass: 'Fusion@2023$#'
                    //   pass: 'qj6NjiQ0YHXm'
                    }
                  });
                  
                  let mailOptions = {
                    from: 'adminportal@fusionmicrofinance.in',
                    to: user[i].email,
                    subject: "Utility Bill (#" + req.body.voucherNo + ") Raised",
                    html: 'Hello, <br><br> Utility bill raised for ' + req.body.utilityMaster?.name + ' By Branch ' + branch.code + ' - ' + branch.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                        console.log(info)
                      
                    }
                  });
                if (i == (user.length - 1)) {
                    NotificationTrans.insertMany(notTrnasAr);
                }
            }

            res.status(200).send({
                status: 'success',
                message: "Utilitybill created successfully!"
            });
        });

    }

};

exports.get = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 200;
    const skip = (page - 1) * limit;
    let where = {};
    let search = "";
    let sort = {createdAt:-1};
    let populate = "";
    
    if (req.query.where !== undefined && req.query.where !== "" && req.query.where !== {}) {
        
        where = JSON.parse(req.query.where);
        
    }

    if (req.query.sort != undefined && req.query.sort != "" && req.query.sort != {}) {
        sort = JSON.parse(req.query.sort);
    }


    if (req.query.search != undefined && req.query.search != "" && req.query.search != {}) {
        search = req.query.search;
        where.$or = [
            { branchName: { $regex: search, $options: 'i' } },
            { branchCode: { $regex: search } },
            { cluster: { $regex: search, $options: 'i' } },
            { division: { $regex: search, $options: 'i' } },
            { zone: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },

        ];
    }

    where.branch = {
        $in: req.branches
    }
    
    let utilitybill = await Utilitybill.find(where).sort(sort).populate("branch").populate("verifyStatus.slab").populate("verifyStatus.user")
    .populate("fverifyStatus.slab").populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate({ path: "financeApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate({
        path: "utility",
        model: "Utility",
        populate: {
            path: "utility",
            model: "UtilityMaster"
        }
    }).skip(skip).limit(limit).exec();
    let totalRecords = await Utilitybill.find({}).countDocuments();
    let records = await Utilitybill.find(where).sort(sort).countDocuments();
    const totalPages = records/limit;
    const hasMore = records > (skip + limit);

    res.status(200).send({
        status: "success",
        message: "All Utility Bill retrieved",
        data: utilitybill,
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages)
    });
}

function getDaysInCurrentMonth(year,month) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        month,
        0
    ).getDate();
}

exports.countByBranch = async (req, res) => {
    let utilitybill = await Utilitybill.find({
            branch: {
                $in: req.branches
            }
        }).sort({
            name: 1
        }).populate("branch").populate("verifyStatus.slab").populate("verifyStatus.user")
        .populate("fverifyStatus.slab").populate("fverifyStatus.user").populate("rejectedBy").populate({
            path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }
        }).populate({
            path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }
        }).populate({
            path: "utility",
            model: "Utility",
            populate: {
                path: "utility",
                model: "UtilityMaster"
            }
        });
    let approvedAdmin = 0;
    let approvedFinance = 0;
    let pendingTransactions = 0;
    for (let i in utilitybill) {
        if (utilitybill[i].adminStatus == 'Approved') {
            approvedAdmin++;
        }
        if (utilitybill[i].financeStatus == 'Approved') {
            approvedFinance++;
        }
        if (utilitybill[i].financeStatus == 'Pending' && utilitybill[i].adminStatus == 'Pending') {
            pendingTransactions++;
        }
    }
    res.status(200).send({
        status: "success",
        message: "All Utility Bill retrieved",
        total: utilitybill.length,
        approvedAdmin: approvedAdmin,
        approvedFinance: approvedFinance,
        pendingTransactions: pendingTransactions
    });
}

exports.single = async (req, res) => {
    let utilitybill = await Utilitybill.findById(req.params.id).populate("branch").populate("verifyStatus.slab").populate("verifyStatus.user")
        .populate("fverifyStatus.slab").populate("fverifyStatus.user").populate("rejectedBy").populate({
            path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }
        }).populate({
            path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }
        }).populate({
            path: "utility",
            model: "Utility",
            populate: {
                path: "utility",
                model: "UtilityMaster"
            }
        });
    res.status(200).send({
        status: "success",
        message: "Single Utility bill retrieved",
        data: utilitybill
    });
}

exports.update = async (req, res) => {
    if(req.body.invoiceDate == undefined){
        let date = new Date(req.body.invoiceDate);
        let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
        if(req.body.billType == 'Sub Meter'){
            let lastUtilityBill = await Utilitybill.find({
                invoiceDate: {
                    $lte: currentDate
                },
                utility: req.body.utility,
                "meter.meterId": req.body.meter?.meterId
            }).sort({invoiceDate:-1});
            if(lastUtilityBill[0].finalReading < req.body.initReading){
                res.status(500).send({
                    error: {
                        status: "error",
                        message: "The initial reading of month can not be less then final reading of last month bill"
                    }
                });
                return;
            }
        }
    }else{
        let utilityBill = await Utilitybill.findById(req.params.id);
        let date = new Date(utilityBill.invoiceDate);
        let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
        if(utilityBill.billType == 'Sub Meter'){
            let lastUtilityBill = await Utilitybill.find({
                invoiceDate: {
                    $lte: currentDate
                },
                utility: utilityBill.utility,
                "meter.meterId": utilityBill.meter?.meterId
            }).sort({invoiceDate:-1});
            if(lastUtilityBill[0].finalReading < utilityBill.initReading){
                res.status(500).send({
                    error: {
                        status: "error",
                        message: "The initial reading of month can not be less then final reading of last month bill"
                    }
                });
                return;
            }
        }
    }
    for (let i in req.body.verifyStatus) {
        if (req.body.verifyStatus[i].user == undefined || req.body.verifyStatus[i].user == null || req.body.verifyStatus[i].user == '') {
            delete req.body.verifyStatus[i].user;
        }
        if (req.body.verifyStatus[i].slab == undefined || req.body.verifyStatus[i].slab == null || req.body.verifyStatus[i].slab == '') {
            delete req.body.verifyStatus[i].slab;
        }
    }
    for (let i in req.body.fverifyStatus) {
        if (req.body.fverifyStatus[i].user == undefined || req.body.fverifyStatus[i].user == null || req.body.fverifyStatus[i].user == '') {
            delete req.body.fverifyStatus[i].user;
        }
        if (req.body.fverifyStatus[i].slab == undefined || req.body.fverifyStatus[i].slab == null || req.body.fverifyStatus[i].slab == '') {
            delete req.body.fverifyStatus[i].slab;
        }
    }
    Utilitybill.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, async (err, data) => {
        if (err) {
            res.status(500).send({
                error: {
                    status: "error",
                    message: err
                }
            });
            return;
        }

        if (req.body.updateAdminVerifyStatus) {
            let notTrnasAr = [];
            let user = await User.findById(req.body.verifyStatus[req.body.index].user);
            let branch = await Branch.findById(data.branch);
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Utility Bill (" + data.voucherNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check utility bill (" + data.voucherNo + ") verified by " + user.name + " for " + data.meter?.name,
                createdAt: new Date(),
                status: 0
            });
            let transporter = nodemailer.createTransport({
                host: 'smtppro.zoho.in',
                port: 465,
                secure: true,
                auth: {
                  user: 'adminportal@fusionmicrofinance.in',
                  pass: 'Fusion@2023$#'
                //   pass: 'qj6NjiQ0YHXm'
                }
              });
              
              let mailOptions = {
                from: 'adminportal@fusionmicrofinance.in',
                to: branchUser[0].email,
                subject: "Utility Bill (" + data.voucherNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br> Utility bill verified by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info)
                  
                }
              });
            NotificationTrans.insertMany(notTrnasAr);
            if(req.body.verifyStatus[req.body.index].role == 'L1-Admin'){
                notTrnasAr = [];
                let adminUser = await User.find({"designation.id":"L2-Admin","permissions.branch":{ $in:data.branch}});
                for(let i in adminUser){
                    notTrnasAr.push({
                        userId: adminUser[i]._id,
                        userType: "admin",
                        typeId:data._id,
                        title: "Utility Bill (" + data.voucherNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                        message: "Check utility bill (" + data.voucherNo + ") verified by " + user.name + " for " + data.meter?.name,
                        createdAt: new Date(),
                        status: 0
                    });
                    let transporter1 = nodemailer.createTransport({
                        host: 'smtppro.zoho.in',
                        port: 465,
                        secure: true,
                        auth: {
                          user: 'adminportal@fusionmicrofinance.in',
                          pass: 'Fusion@2023$#'
                        //   pass: 'qj6NjiQ0YHXm'
                        }
                      });
                      
                      let mailOptions1 = {
                        from: 'adminportal@fusionmicrofinance.in',
                        to: adminUser[i].email,
                        subject: "Utility Bill (" + data.voucherNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                        html: 'Hello, <br><br> Utility bill verified by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                      };
                      
                      transporter1.sendMail(mailOptions1, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                            console.log(info)
                          
                        }
                      });
                    if(i == (adminUser.length -  1)){
                        NotificationTrans.insertMany(notTrnasAr);
                    }
                }
            }
        }

        if (req.body.updateFinanceVerifyStatus) {
            let notTrnasAr = [];
            let user = await User.findById(req.body.fverifyStatus[req.body.index].user);
            let branch = await Branch.findById(data.branch);
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Utility Bill (" + data.voucherNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check utility bill (" + data.voucherNo + ") verified by " + user.name + " for " + data.meter?.name,
                createdAt: new Date(),
                status: 0
            });
            let transporter = nodemailer.createTransport({
                host: 'smtppro.zoho.in',
                port: 465,
                secure: true,
                auth: {
                  user: 'adminportal@fusionmicrofinance.in',
                  pass: 'Fusion@2023$#'
                //   pass: 'qj6NjiQ0YHXm'
                }
              });
              
              let mailOptions = {
                from: 'adminportal@fusionmicrofinance.in',
                to: branchUser[0].email,
                subject: "Utility Bill (" + data.voucherNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br> Utility bill verified by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info)
                  
                }
              });
            NotificationTrans.insertMany(notTrnasAr);
            notTrnasAr = [];
            let financeUser = await User.find({"designation.id":"L2-Finance","permissions.branch":{ $in:data.branch}});
            for(let i in financeUser){
                notTrnasAr.push({
                    userId: financeUser[i]._id,
                    userType: "admin",
                    typeId:data._id,
                    title: "Utility Bill (" + data.voucherNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                    message: "Check utility bill (" + data.voucherNo + ") verified by " + user.name + " for " + data.meter?.name,
                    createdAt: new Date(),
                    status: 0
                });
                let transporter1 = nodemailer.createTransport({
                    host: 'smtppro.zoho.in',
                    port: 465,
                    secure: true,
                    auth: {
                      user: 'adminportal@fusionmicrofinance.in',
                      pass: 'Fusion@2023$#'
                    //   pass: 'qj6NjiQ0YHXm'
                    }
                  });
                  
                  let mailOptions1 = {
                    from: 'adminportal@fusionmicrofinance.in',
                    to: financeUser[i].email,
                    subject: "Utility Bill (" + data.voucherNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                    html: 'Hello, <br><br> Utility bill verified by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                  };
                  
                  transporter1.sendMail(mailOptions1, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                        console.log(info)
                      
                    }
                  });
                if(i == (financeUser.length -  1)){
                    NotificationTrans.insertMany(notTrnasAr);
                }
            }
        }

        if (req.body.adminStatus == 'Approved') {
            let notTrnasAr = [];
            let user = await User.findById(req.body.adminApproved);
            let branch = await Branch.findById(data.branch);
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Utility Bill (" + data.voucherNo + ") Approved By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check utility bill (" + data.voucherNo + ") approved by " + user.name + " for " + data.meter?.name,
                createdAt: new Date(),
                status: 0
            });
            let transporter = nodemailer.createTransport({
                host: 'smtppro.zoho.in',
                port: 465,
                secure: true,
                auth: {
                  user: 'adminportal@fusionmicrofinance.in',
                  pass: 'Fusion@2023$#'
                //   pass: 'qj6NjiQ0YHXm'
                }
              });
              
              let mailOptions = {
                from: 'adminportal@fusionmicrofinance.in',
                to: branchUser[0].email,
                subject: "Utility Bill (" + data.voucherNo + ") Approved By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br> Utility bill approved by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info)
                  
                }
              });
            NotificationTrans.insertMany(notTrnasAr);
            notTrnasAr = [];
            let financeUser = await User.find({"designation.id":"L1-Finance","permissions.branch":{ $in:data.branch}});
            for(let i in financeUser){
                notTrnasAr.push({
                    userId: financeUser[i]._id,
                    userType: "admin",
                    typeId:data._id,
                    title: "Utility Bill (" + data.voucherNo + ") Pending for Approval",
                    message: "Check utility bill (" + data.voucherNo + ") approved by " + user.name + " for " + data.meter?.name,
                    createdAt: new Date(),
                    status: 0
                });
                let transporter1 = nodemailer.createTransport({
                    host: 'smtppro.zoho.in',
                    port: 465,
                    secure: true,
                    auth: {
                      user: 'adminportal@fusionmicrofinance.in',
                      pass: 'Fusion@2023$#'
                    //   pass: 'qj6NjiQ0YHXm'
                    }
                  });
                  
                  let mailOptions1 = {
                    from: 'adminportal@fusionmicrofinance.in',
                    to: financeUser[i].email,
                    subject: "Utility Bill (" + data.voucherNo + ") Pending for Approval",
                    html: 'Hello, <br><br> Utility bill verified by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                  };
                  
                  transporter1.sendMail(mailOptions1, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                        console.log(info)
                      
                    }
                  });
                if(i == (financeUser.length -  1)){
                    NotificationTrans.insertMany(notTrnasAr);
                }
            }
        } else if (req.body.adminStatus == 'Rejected') {
            let notTrnasAr = [];
            let user = await User.findById(req.body.rejectedBy);
            let branch = await Branch.findById(data.branch);
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Utility Bill (" + data.voucherNo + ") Rejected By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check utility bill (" + data.voucherNo + ") rejected by " + user.name + " for " + data.meter?.name + ". Check remark and update the bill.",
                createdAt: new Date(),
                status: 0
            });
            let transporter = nodemailer.createTransport({
                host: 'smtppro.zoho.in',
                port: 465,
                secure: true,
                auth: {
                  user: 'adminportal@fusionmicrofinance.in',
                  pass: 'Fusion@2023$#'
                //   pass: 'qj6NjiQ0YHXm'
                }
              });
              
              let mailOptions = {
                from: 'adminportal@fusionmicrofinance.in',
                to: branchUser[0].email,
                subject: "Utility Bill (" + data.voucherNo + ") Rejected By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br> Utility bill rejected by ' + user.name + " for " + data.meter?.name +'. Check remark and update the bill.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info)
                  
                }
              });
            NotificationTrans.insertMany(notTrnasAr);
        }

        if (req.body.financeStatus == 'Approved') {
            let notTrnasAr = [];
            let user = await User.findById(req.body.financeApproved);
            let branch = await Branch.findById(data.branch);
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Utility Bill (" + data.voucherNo + ") Approved By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check utility bill (" + data.voucherNo + ") approved by " + user.name + " for " + data.meter?.name,
                createdAt: new Date(),
                status: 0
            });
            let transporter = nodemailer.createTransport({
                host: 'smtppro.zoho.in',
                port: 465,
                secure: true,
                auth: {
                  user: 'adminportal@fusionmicrofinance.in',
                  pass: 'Fusion@2023$#'
                //   pass: 'qj6NjiQ0YHXm'
                }
              });
              
              let mailOptions = {
                from: 'adminportal@fusionmicrofinance.in',
                to: branchUser[0].email,
                subject: "Utility Bill (" + data.voucherNo + ") Approved By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br> Utility bill approved by ' + user.name + " for " + data.meter?.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info)
                  
                }
              });
            NotificationTrans.insertMany(notTrnasAr);
        } else if (req.body.financeStatus == 'Rejected') {
            let notTrnasAr = [];
            let user = await User.findById(req.body.rejectedBy);
            let branch = await Branch.findById(data.branch);
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Utility Bill (" + data.voucherNo + ") Rejected By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check utility bill (" + data.voucherNo + ") rejected by " + user.name + " for " + data.meter?.name + ". Check remark and update the bill.",
                createdAt: new Date(),
                status: 0
            });
            let transporter = nodemailer.createTransport({
                host: 'smtppro.zoho.in',
                port: 465,
                secure: true,
                auth: {
                  user: 'adminportal@fusionmicrofinance.in',
                  pass: 'Fusion@2023$#'
                //   pass: 'qj6NjiQ0YHXm'
                }
              });
              
              let mailOptions = {
                from: 'adminportal@fusionmicrofinance.in',
                to: branchUser[0].email,
                subject: "Utility Bill (" + data.voucherNo + ") Rejected By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br> Utility bill rejected by ' + user.name + " for " + data.meter?.name +'. Check remark and update the bill..<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    console.log(info)
                  
                }
              });
            NotificationTrans.insertMany(notTrnasAr);
        }

        res.status(200).send({
            status: "success",
            message: "Utility bill successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Utilitybill.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Utilitybill successfully Deleted",
        });
    });
}