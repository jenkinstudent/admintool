const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Branch = require("../models/branch.model.js");

const {
  TokenExpiredError
} = jwt;


const User = db.user;
const Role = db.role;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Unauthorized! Access Token was expired!"
    });
  }

  return res.sendStatus(401).send({
    message: "Unauthorized!"
  });
}

verifyToken = (req, res, next) => {
  let token = (req.params.token == "" || req.params.token == undefined || req.params.token == null) ? req.headers["x-access-token"] : req.params.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, async(err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    let user = await User.findById(req.userId);
    if(user.issuperadmin){
      let branch =  await Branch.find({});
      req.branches= branch;
    }else{
      req.branches = user.permissions?.branch;
    }
    
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({error:{
        message: err
      }});
      return;
    }

    Role.find({
        _id: {
          $in: user.roles
        }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({error:{
            message: err
          }});
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin
};
module.exports = authJwt;