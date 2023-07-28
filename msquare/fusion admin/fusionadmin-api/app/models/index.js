const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.user = require("./user.model");
db.rent = require("./rent.model");
db.utility = require("./utility.model");

// db.zone = require("./zone.model");
// db.state = require("./state.model");
// db.division = require("./division.model");
// db.cluster = require("./cluster.model");
db.branch = require("./branch.model");
db.notificationTrans = require("./notificationTrans.model");
db.courier = require("./courier.model");
db.utilitybill = require("./utilitybill.model");
db.rentTemporary = require("./rentTemporary.model");
db.utilityTemporary = require("./utilityTemporary.model");
db.rentbill = require("./rentbill.model");
db.role = require("./role.model");
db.utilityMaster = require("./utilityMaster.model");
db.activity = require("./activity.model");
db.approvalLevels = require("./approvalLevels.model");


db.ROLES = ["admin", "branch"];

module.exports = db;