const db = require("../models");
const {
    rentbill: Rentbill,rent:Rent, branch:Branch, notificationTrans:NotificationTrans, user:User
} = db;

var nodemailer = require('nodemailer');
const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = async (req, res) => {
    for (let i in req.body.verifyStatus) {
        if (req.body.verifyStatus[i].user == undefined || req.body.verifyStatus[i].user == null || req.body.verifyStatus[i].user == '') {
            delete req.body.verifyStatus[i].user;
        }
    }
    for (let i in req.body.fverifyStatus) {
        if (req.body.fverifyStatus[i].user == undefined || req.body.fverifyStatus[i].user == null || req.body.fverifyStatus[i].user == '') {
            delete req.body.fverifyStatus[i].user;
        }
    }
    let rentCount = await Rentbill.find({});
    if(rentCount.length > 0){
        req.body.voucherNo = "R" + (rentCount.length + 1);
    }else{
        req.body.voucherNo = "R" + (1);
    }
    const rentbill = new Rentbill(req.body);

    rentbill.save(async (err, data) => {
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
            roleProfile: "admin",
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
                title: "Rent Bill (" + req.body.voucherNo + ") Raised",
                message: 'Check rent bill (' + req.body.voucherNo + ') raised on date(' + new Date(data.createdAt).toDateString() + ') For Branch ' + branch.code + ' - ' + branch.name,
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
                subject: "Rent Bill (#" + req.body.voucherNo + ") Raised",
                html: 'Hello, <br><br> Rent bill raised on date ('+ new Date(data.createdAt).toDateString() + ') for branch'+ branch.code + ' - ' + branch.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
            message: "Rentbill created successfully!"
        });
    });
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
            { city: { $regex: search, $options: 'i' } },
            { state: { $regex: search, $options: 'i' } },

        ];
    }

    where.branch = {
        $in: req.branches
    }
    
    let rentbill = await Rentbill.find(where).sort(sort).populate("branch").populate("verifyStatus.user").populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate({ path: "financeApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate("rent").skip(skip).limit(limit).exec();
    let totalRecords = await Rentbill.find({}).countDocuments();
    let records = await Rentbill.find(where).sort(sort).countDocuments();
    const totalPages = records/limit;
    const hasMore = records > (skip + limit);

    res.status(200).send({
        status: "success",
        message: "All Rent Bill retrieved",
        data: rentbill,
        page:page,
        perPage:limit,
        totalRecords:totalRecords,
        hasMore:hasMore,
        totalPages: Math.ceil(totalPages)
    });
}

function getDaysInCurrentMonth(month) {
    const date = new Date();
  
    return new Date(
      date.getFullYear(),
      month,
      0
    ).getDate();
}

exports.statusRent = async (req, res)=>{
    
    let data = [];
    let cCurrentMonth = 0;
    let cPreviousMonth = 0;
    let cPreviousMonth1 = 0;
    let cPreviousMonth2 = 0;
    let dCurrentMonth = 0;
    let dPreviousMonth = 0;
    let dPreviousMonth1 = 0;
    let dPreviousMonth2 = 0;

    // let index = new Date().getMonth()+1;
    // let month = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    
    let currentDate1 = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth())).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate1 = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth())).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(date.getMonth()))).slice(-2));

    let currentDate2 = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() - 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate2 = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() - 1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(date.getMonth() - 1))).slice(-2));

    let currentDate3 = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() - 2)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate3 = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() - 2)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(date.getMonth() - 2))).slice(-2));
    let cRent = await Rent.find({propertyType:"Commercial"});
    for(let j in cRent){
        let rentBill = await Rentbill.find({rent:cRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate,$lte: nextDate}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill){
            cCurrentMonth+=rentBill[i].totalTransferRent;
        }

        let rentBill2 = await Rentbill.find({rent:cRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate1,$lte: nextDate1}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill2){
            cPreviousMonth+=rentBill2[i].totalTransferRent;
        }

        let rentBill3 = await Rentbill.find({rent:cRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate2,$lte: nextDate2}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill3){
            cPreviousMonth1+=rentBill3[i].totalTransferRent;
        }

        let rentBill4 = await Rentbill.find({rent:cRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate3,$lte: nextDate3}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill4){
            cPreviousMonth2+=rentBill4[i].totalTransferRent;
        }
    }

    let dRent = await Rent.find({propertyType:"Domestic"});
    for(let j in dRent){
        let rentBill = await Rentbill.find({rent:dRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate,$lte: nextDate}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill){
            dCurrentMonth+=rentBill[i].totalTransferRent;
        }

        let rentBill2 = await Rentbill.find({rent:dRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate1,$lte: nextDate1}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill2){
            dPreviousMonth+=rentBill2[i].totalTransferRent;
        }

        let rentBill3 = await Rentbill.find({rent:dRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate2,$lte: nextDate2}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill3){
            dPreviousMonth1+=rentBill3[i].totalTransferRent;
        }

        let rentBill4 = await Rentbill.find({rent:dRent[j]._id,branch:{$in:req.branches},createdAt: {$gte: currentDate3,$lte: nextDate3}})
        .populate("branch").populate("verifyStatus.user")
        .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({ path: "financeApproved",
            model: "User",
            populate: {
                path: "permissions.utilitySlab",
                model: "ApprovalLevels"
            }}).populate({path:"rent",model:"Rent"});
        for(let i in rentBill4){
            dPreviousMonth2+=rentBill4[i].totalTransferRent;
        }
    }
    
    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        cCurrentMonth: cCurrentMonth,
        cPreviousMonth: cPreviousMonth,
        cPreviousMonth1: cPreviousMonth1,
        cPreviousMonth2: cPreviousMonth2,
        dCurrentMonth: dCurrentMonth,
        dPreviousMonth: dPreviousMonth,
        dPreviousMonth1: dPreviousMonth1,
        dPreviousMonth2: dPreviousMonth2,
    });
    

}


exports.getByApprovedFinance = async (req, res) => {
    let rentbill = await Rentbill.find({branch:{$in:req.branches},financeStatus:"Approved"}).populate("verifyStatus.user")
    .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate({ path: "financeApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate({path:"rent",model:"Rent",populate:{path:"branch",model:"Branch"}}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Rentbills retrieved",
        data: rentbill
    });
}

exports.getForCurentMonth = async (req, res) => {
    let rentbill = await Rentbill.find({branch:{$in:req.branches},$expr: { $eq: [{ $year: "$createdAt" }, (new Date().getFullYear())] },$expr: { $eq: [{ $month: "$createdAt" }, ((new Date().getMonth())+ 1)]}}).populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent").populate("branch").sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Rentbills retrieved",
        data: rentbill
    });
}

exports.single = async (req, res) => {
    let rentbill = await Rentbill.findById(req.params.id).populate("verifyStatus.user")
    .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate({ path: "financeApproved",
        model: "User",
        populate: {
            path: "permissions.utilitySlab",
            model: "ApprovalLevels"
        }}).populate("rent").populate("branch");
    res.status(200).send({
        status: "success",
        message: "Single Rentbill retrieved",
        data: rentbill
    });
}

exports.update = async (req, res) => {
    for (let i in req.body.verifyStatus) {
        if (req.body.verifyStatus[i].user == undefined || req.body.verifyStatus[i].user == null || req.body.verifyStatus[i].user == '') {
            delete req.body.verifyStatus[i].user;
        }
    }
    for (let i in req.body.fverifyStatus) {
        if (req.body.fverifyStatus[i].user == undefined || req.body.fverifyStatus[i].user == null || req.body.fverifyStatus[i].user == '') {
            delete req.body.fverifyStatus[i].user;
        }
    }
    Rentbill.findByIdAndUpdate(req.params.id,{$set:req.body}, async (err, data) => {
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
            if(req.body.verifyStatus[req.body.index].role == 'L1-Admin'){
                let adminUser = await User.find({"designation.id":"L2-Admin","permissions.branch":{ $in:data.branch}});
                for(let i in adminUser){
                    notTrnasAr.push({
                        userId: adminUser[i]._id,
                        userType: "admin",
                        typeId:data._id,
                        title: "Rent Bill (" + data.voucherNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                        message: "Check rent bill (" + data.voucherNo + ") verified by " + user.name + ' for Branch ' + branch.code + ' - ' + branch.name,
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
                        to: adminUser[i].email,
                        subject: "Rent Bill (#" + data.voucherNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                        html: 'Hello, <br><br> Rent bill (' + data.voucherNo + ") verified by " + user.name + ' for Branch ' + branch.code + ' - ' + branch.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
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
            let financeUser = await User.find({"designation.id":"L2-Finance","permissions.branch":{ $in:data.branch}});
            for(let i in financeUser){
                notTrnasAr.push({
                    userId: financeUser[i]._id,
                    userType: "admin",
                    typeId:data._id,
                    title: "Rent Bill (" + data.voucherNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                    message: "Check rent bill (" + data.voucherNo + ") verified by " + user.name + ' for Branch ' + branch.code + ' - ' + branch.name,
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
                    to: financeUser[i].email,
                    subject: "Rent Bill (#" + data.voucherNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                    html: 'Hello, <br><br> Rent bill (' + data.voucherNo + ") verified by " + user.name + ' for Branch ' + branch.code + ' - ' + branch.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
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
            let financeUser = await User.find({"designation.id":"L1-Finance","permissions.branch":{ $in:data.branch}});
            for(let i in financeUser){
                notTrnasAr.push({
                    userId: financeUser[i]._id,
                    userType: "admin",
                    typeId:data._id,
                    title: "Rent Bill (" + data.voucherNo + ") Pending for Approval",
                    message: "Check rent bill (" + data.voucherNo + ") approved by " + user.name + ' for Branch ' + branch.code + ' - ' + branch.name,
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
                    to: financeUser[i].email,
                    subject: "Rent Bill (#" + data.voucherNo + ") Pending for Approval",
                    html: 'Hello, <br><br> Rent bill (' + data.voucherNo + ") approved by " + user.name + ' for Branch ' + branch.code + ' - ' + branch.name +'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
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


        res.status(200).send({
            status: "success",
            message: "Rentbill successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Rentbill.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Rentbill successfully Deleted",
        });
    });
}
