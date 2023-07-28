const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.user = require("./user.model");
db.mt = require("./mt.model");


db.ROLES = ["admin", "employee"];

module.exports = db;