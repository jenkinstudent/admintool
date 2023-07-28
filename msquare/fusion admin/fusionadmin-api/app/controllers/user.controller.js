const config = require("../config/auth.config");
const appConfig = require("../config/app.config");
const db = require("../models");
const {
  user: User,
  branch: Branch
} = db;

const mongooseErrorHandler = require('mongoose-validation-error-message-handler');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');

// Signup
exports.signup = (req, res) => {

  req.body.password = bcrypt.hashSync(req.body.password,8);

  const user = new User(req.body);

  user.save((err, user) => {
    if (err) {
      const error = mongooseErrorHandler(err);
      res.status(error.status || 500);
      res.json({error:{status:"error" ,message: error.message }});
    }
    if (err) {
      res.status(500).send({
        error: {
          status: "error",
          message: err
        }
      });
      return;
    }

    if (req.body.role) {
      user.save(err => {
        if (err) {
          res.status(500).send({
            error: {
              status: "error",
              message: err
            }
          });
          return;
        }

        res.send({
          status: 'success',
          message: "User was registered successfully!"
        });
      });
    } else {
      user.role = "user";
      user.save(err => {
        if (err) {
          res.status(500).send({
            error: {
              status: "error",
              message: err
            }
          });
          return;
        }

        res.send({
          status: 'success',
          message: "User was registered successfully!"
        });
      });
    }
  });
};

exports.create =async (req, res) => {
  let userD  = await User.find({email:req.body.email});
  if(userD.length > 0){
      res.status(500).send({
        error: {
          status: "error",
          message: "Duplicate Email Found"
        }
      });
      return;
  }else{
    req.body.password = bcrypt.hashSync(req.body.password,8);
    const user = new User(req.body);
  
    user.save((err, data) => {
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
            message: "User created successfully!"
        });
    });
  }
  
};

// Login
exports.login = async (req, res) => {
  if (req.body.email == "" || req.body.email == undefined) {
    return res.status(500).send({
      accessToken: null,
      message: "Missing Data",
    });
  }

  if (req.body.password == "" || req.body.password == undefined) {
    return res.status(500).send({
      error:{
        accessToken: null,
        message: "Missing Data",
      }
    });
  }
  let user = await  User.findOne({
      email: req.body.email
    }).populate("permissions.branch").populate("permissions.utilitySlab").populate("permissions.rentSlab");

      if (!user) {
        return res.status(500).send({
          error: {
            status: "error",
            message: "User Not found."
          }
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(500).send({
          error:{
            accessToken: null,
            message: "Invalid Password!",
          }
        });
      }

      if(user.role == "branch"){
        let branch = await Branch.find({code:user.code});
        if(branch[0].status == "Inactive"){
          return res.status(500).send({
            error:{
              accessToken: null,
              message: "Admin Deactivated Branch Access",
            }
          });
        }
      }

      if(user.status == "Inactive"){
        return res.status(500).send({
          error:{
            accessToken: null,
            message: "Admin Disabled Account Access",
          }
        });
      }
      

      let token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: config.jwtExpiration,
      });


      User.findByIdAndUpdate(user._id, {
        $set: {
          lastLoginOn: new Date()
        }
      }, (err, data) => {
        if (err) {
        }

      });

      res.status(200).send({
        status: "success",
        message: "Login successfully",
        data: {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          mobile: user.mobile,
          accessToken: token,
          roleProfile: user.roleProfile,
          lastLoginOn: user.lastLoginOn,
          issuperadmin:user.issuperadmin,
          permission:user.permissions,
          designation:user.designation
        }
      });
};

// Get User
exports.getUser = async(req, res) => {
  let user = await User.findById(req.params.id).populate("permissions.branch").populate("permissions.utilitySlab").populate("permissions.rentSlab");
  res.status(200).send({
    status: "success",
    message: "Single User retrieved",
    data: user
  });
}

// Get Admin User
exports.getAdminUser = async(req, res) => {
  let user = await User.find({role:"admin"}).populate("permissions.branch").populate("permissions.utilitySlab").populate("permissions.rentSlab");
  res.status(200).send({
    status: "success",
    message: "All User retrieved",
    data: user
  });
}

// Get User
exports.getUserByBranchUser = async(req, res) => {
  let user = await User.find({"code":req.params.branch,"role":"branch"});
  res.status(200).send({
    status: "success",
    message: "All User retrieved",
    data: user
  });
  
}


// Get User By Branch Permission
exports.getUserByBranchPermission = async(req, res) => {
  let user = await User.find({$or:[{roleProfile:"admin"},{roleProfile:"business"}],"permissions.branch":{ $in:req.params.branch}});
  res.status(200).send({
    status: "success",
    message: "All User retrieved",
    data: user
  });
  
}

// Get User By Designation
exports.getUserByDesignation = async(req, res) => {
  let user = await User.find({"designation.id":req.params.id}).populate("permissions.branch").populate("permissions.utilitySlab").populate("permissions.rentSlab");
  res.status(200).send({
    status: "success",
    message: "All User retrieved",
    data: user
  });
  
}

// Delete User
exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        error: {
          status: "error",
          message: err
        }
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "User Successfully Deleted"
      });
    }
  });
}

// Patch User
exports.patchUser = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, data) => {
      if (err) {
        res.status(500).send({
          error: {
            status: "error",
            message: err
          }
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "User Successfully Updated"
        });
      }
    });
}

// Permissions Allocations
exports.patchUserPermissions = async (req, res) => {
  if(req.body.permissions.rentSlab == undefined || req.body.permissions.rentSlab == null || req.body.permissions.rentSlab == ''){
    delete req.body.permissions.rentSlab;
  }
  if(req.body.permissions.utilitySlab == undefined || req.body.permissions.utilitySlab == null || req.body.permissions.utilitySlab == ''){
    delete req.body.permissions.utilitySlab;
  }
  User.updateMany({"_id":{ $in:req.body.user}}, {$set:req.body}, (err, data) => {
    if (err) {
      res.status(500).send({
        error: {
          status: "error",
          message: err
        }
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "User Successfully Updated"
      });
    }
  });
}



exports.changePassword = (req, res) => {
  User.findById(req.params.id,(err,user)=>{
    let passwordIsValid = bcrypt.compareSync(
      req.body.oldPass,
      user.password
    );

    if (passwordIsValid) {
      let passwordIsValid1 = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (passwordIsValid1) {
        return res.status(500).send({
          error:{
            accessToken: null,
            message: "Seems like, you are trying to update previous password",
          }
        });
      }
      req.body.password = bcrypt.hashSync(req.body.password, 8);
      User.findByIdAndUpdate(user._id, {
        $set: {
          password: req.body.password
        }
      }, (err, data) => {
        if (err) {
        }

        res.status(200).send({
          status: "success",
          message: "Password changed successfully",
        });

      });
    }

  })
}

exports.forgotPassword = async (req, res) => {
  User.find({
    email: req.params.email
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

    if (data.length == 0) {
      res.status(500).send({
        error: {
          status: "error",
          message: "Email is not registerd"
        }
      });
      return;
    }

    let password = Math.floor(10000000 + Math.random() * 99999999);

    let savePassword = bcrypt.hashSync(String(password), 8);

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
      to: data[0].email,
      subject: `New Password for ${appConfig.appName}`,
      html: `\
      Hi <b>${data[0].name}</b>,\
      \
      <br>You recently requested to reset the password for your ${appConfig.appName} account. Here is your new password <br>\
      \
      <b>${password}</b><br>\
      \
      If you did not request a password reset, please contact admin.\
      \
      Thanks, the ${appConfig.appName} team`
    };

    transporter.sendMail(mailOptions, function (error, info) {

      if (error) {
        res.status(500).send({error:{
          status: "error",
          message: error
        }});
        return;
      }
      
      User.findByIdAndUpdate(data[0]._id, {
        $set: {
          password: savePassword
        }
      }, (err, data) => {
        if (err) {
        }
        res.status(200).send({
          status: "success",
          message: "New password is emailed to you",
        });
      });
      
    });

    
  });
}