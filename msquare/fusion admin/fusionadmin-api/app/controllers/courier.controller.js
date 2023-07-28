const db = require("../models");
const {
    courier: Courier,user:User,branch:Branch,notificationTrans:NotificationTrans
} = db;

var nodemailer = require('nodemailer');

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

exports.create = (req, res) => {
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
    const courier = new Courier(req.body);

    courier.save(async (err, data) => {
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
                title: "Courier (#" + req.body.invoiceNo + ") Raised",
                message: 'Check courier (#' + req.body.invoiceNo + ') raised for ' + req.body.vendorName + ' By Branch ' + branch.code + ' - ' + branch.name,
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
                subject: "Courier (#" + req.body.invoiceNo + ") Raised",
                html: 'Hello, <br><br> Courier raised by branch '+branch.code+' - '+branch.name+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
            message: "Courier created successfully!"
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
        { vendorName: { $regex: search, $options: 'i' } },
        { invoiceNo: { $regex: search, $options: 'i' } },
    ];
  }

  where.branch = {
      $in: req.branches
  }
  let courier = await Courier.find(where).sort(sort).populate("branch").populate("verifyStatus.user")
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
      }}).skip(skip).limit(limit).exec();
  let totalRecords = await Courier.find({}).countDocuments();
  let records = await Courier.find(where).sort(sort).countDocuments();
  const totalPages = records/limit;
  const hasMore = records > (skip + limit);

  res.status(200).send({
      status: "success",
      message: "All Courier retrieved",
      data: courier,
      page:page,
      perPage:limit,
      totalRecords:totalRecords,
      hasMore:hasMore,
      totalPages: Math.ceil(totalPages)
  });
}

// exports.get = async (req, res) => {
//     let courier = await Courier.find({branch:{$in:req.branches}}).populate("branch").populate("verifyStatus.user")
//     .populate("fverifyStatus.user").populate("rejectedBy").populate({ path: "adminApproved",
//         model: "User",
//         populate: {
//             path: "permissions.utilitySlab",
//             model: "ApprovalLevels"
//         }}).populate({ path: "financeApproved",
//         model: "User",
//         populate: {
//             path: "permissions.utilitySlab",
//             model: "ApprovalLevels"
//         }}).sort({name:1});
//     res.status(200).send({
//         status: "success",
//         message: "All Couriers retrieved",
//         data: courier
//     });
// }

exports.getByCurrent = async (req, res) => {
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    let courier = await Courier.find({branch:{$in:req.branches},date: {
        $gte: currentDate,
        $lte: nextDate
    }}).populate("branch").populate("verifyStatus.user")
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
        }}).sort({name:1});
    res.status(200).send({
        status: "success",
        message: "All Couriers retrieved",
        data: courier
    });
}

function getDaysInCurrentMonth(month) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
}


exports.getByBranch = async (req, res) => {
    
    let courier = await Courier.find({branch:{$in:req.branches}}).sort({name:1}).populate("branch").populate("verifyStatus.user")
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
        }});
    res.status(200).send({
        status: "success",
        message: "All Couriers retrieved",
        data: courier
    });
}

exports.single = async (req, res) => {
    let courier = await Courier.findById(req.params.id).populate("branch").populate("verifyStatus.user")
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
        }});
    res.status(200).send({
        status: "success",
        message: "Single Courier retrieved",
        data: courier
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
    Courier.findByIdAndUpdate(req.params.id,{$set:req.body}, async (err, data) => {
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
                title: "Courier (#" + data.invoiceNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check courier (#" + data.invoiceNo + ") verified by " + user.name + " for " + data.vendorName,
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
                subject: "Courier (#" + data.invoiceNo + ") Verified  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br>Check courier verified by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
                        title: "Courier (#" + data.invoiceNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                        message: "Check courier (#" + data.invoiceNo + ") verified by " + user.name + " for " + data.vendorName,
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
                        subject: "Courier (#" + data.invoiceNo + ") Verified  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                        html: 'Hello, <br><br>Check courier verified by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Courier (#" + data.invoiceNo + ") Verified By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check courier (#" + data.invoiceNo + ") verified by " + user.name + " for " + data.vendorName,
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
                subject: "Courier (#" + data.invoiceNo + ") Verified  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br>Check courier verified by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
                    title: "Courier (#" + data.invoiceNo + ") Verified By "+ user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                    message: "Check courier (#" + data.invoiceNo + ") verified by " + user.name + " for " + data.vendorName,
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
                    subject: "Courier (#" + data.invoiceNo + ") Verified  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                    html: 'Hello, <br><br>Check courier verified by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
            let branchUser = await User.find({
                code: branch.code
            });
            notTrnasAr.push({
                userId: branchUser[0]._id,
                userType: "branch",
                typeId:data._id,
                title: "Courier (#" + data.invoiceNo + ") Approved By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check courier (#" + data.invoiceNo + ") approved by " + user.name + " for " + data.vendorName,
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
                subject: "Courier (#" + data.invoiceNo + ") Approved  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br>Check courier approved by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
                    title: "Courier (#" + data.invoiceNo + ") Pending for Approval",
                    message: "Check courier (#" + data.invoiceNo + ") approved by " + user.name + " for " + data.vendorName,
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
                    subject: "Courier (#" + data.invoiceNo + ") Pending for Approval",
                    html: 'Hello, <br><br>Check courier approved by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
                title: "Courier (#" + data.invoiceNo + ") Rejected By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check courier (#" + data.invoiceNo + ") rejected by " + user.name + " for " + data.vendorName + ". Check remark and update the courier.",
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
                subject: "Courier (#" + data.invoiceNo + ") Rejected  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br>Check courier rejected by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
                title: "Courier (#" + data.invoiceNo + ") Approved By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check courier (#" + data.invoiceNo + ") approved by " + user.name + " for " + data.vendorName,
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
                subject: "Courier (#" + data.invoiceNo + ") Approved  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br>Check courier approved by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
                title: "Courier (#" + data.invoiceNo + ") Rejected By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                message: "Check courier (#" + data.invoiceNo + ") rejected by " + user.name + " for " + data.vendorName + ". Check remark and update the courier.",
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
                subject: "Courier (#" + data.invoiceNo + ") Rejected  By " + user.designation.name.charAt(0).toUpperCase() + user.designation.name.slice(1),
                html: 'Hello, <br><br>Check courier rejected by '+user.name +" for " + data.vendorName+'.<br><br><a href="https://trusting-jang.134-209-155-58.plesk.page/" target="_blank">Click here to open</a><br><br>Please do the needful action.<br><br> Regards,<br> Fusion Admin Team.<br>'
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
            message: "Courier successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    Courier.findByIdAndDelete(req.params.id, (err, data) => {
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
            message: "Courier successfully Deleted",
        });
    });
}
