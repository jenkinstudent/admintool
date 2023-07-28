const userCtrl = require("../controllers/user.controller");
const rentCtrl = require("../controllers/rent.controller");
const rentTemporaryCtrl = require("../controllers/rentTemporary.controller");
const utilityTemporaryCtrl = require("../controllers/utilityTemporary.controller");
const zoneCtrl = require("../controllers/zone.controller");
const stateCtrl = require("../controllers/state.controller");
const divisionCtrl = require("../controllers/division.controller");
const clusterCtrl = require("../controllers/cluster.controller");
const branchCtrl = require("../controllers/branch.controller");
const utilityMasterCtrl = require("../controllers/utilityMaster.controller");
const utilityCtrl = require("../controllers/utility.controller");
const utilitybillCtrl = require("../controllers/utilitybill.controller");
const meterCtrl = require("../controllers/meter.controller");
const notificationTransCtrl = require("../controllers/notification.controller");
const commanCtrl = require("../controllers/comman.controller");
const courierCtrl = require("../controllers/courier.controller");
const rentbillCtrl = require("../controllers/rentbill.controller");
const activityCtrl = require("../controllers/activity.controller");
const roleCtrl = require("../controllers/role.controller");
const approvalLevelsCtrl = require("../controllers/approvalLevels.controller");
const { verifySignUp } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // User Controller
  app.post("/api/users/login", userCtrl.login);
  app.post("/api/users/signup", [verifySignUp.checkDuplicateUsernameOrEmail], userCtrl.signup);
  app.put("/api/users/:id", userCtrl.patchUser);
  app.put("/api/users-permissions", userCtrl.patchUserPermissions);
  app.get("/api/users/:id", userCtrl.getUser);
  app.get("/api/users-admin", userCtrl.getAdminUser);
  app.post("/api/users/create", userCtrl.create);
  app.get("/api/users-branch/:branch", userCtrl.getUserByBranchUser);
  app.get("/api/users-permission/:branch", userCtrl.getUserByBranchPermission);
  app.get("/api/users-designation/:id", userCtrl.getUserByDesignation);
  app.delete("/api/users/:id", userCtrl.deleteUser);
  app.post("/api/users/changePassword/:id",  userCtrl.changePassword);
  app.get("/api/forgot-password/:email", userCtrl.forgotPassword);

  //notification
  app.put("/api/notification/update", [verifyToken],notificationTransCtrl.updateNotification);
  app.get("/api/user/notification/:id", [verifyToken],notificationTransCtrl.notificationByUserId);
  app.get("/api/user/notification/clear/:id", [verifyToken],notificationTransCtrl.clearNotificationByUserId);
  app.delete("/api/user/notification/:id", [verifyToken],notificationTransCtrl.clearNotification);
  app.get("/api/notification/user/:id", [verifyToken],notificationTransCtrl.getAllNotificationByUser);
  
  // Rent Controller
  app.post("/api/rent/create", [verifyToken],rentCtrl.create); // Create Rent
  app.get("/api/rent-all", [verifyToken],rentCtrl.get); // Get All Rent
  app.get("/api/rent-count", [verifyToken],rentCtrl.getCount); // Get All Rent Count
  app.get("/api/rent/:id", [verifyToken],rentCtrl.single); // Get Single Rent
  app.put("/api/rent/:id", [verifyToken],rentCtrl.update); // Update Single Rent
  app.delete("/api/rent/:id", [verifyToken],rentCtrl.delete); // Delete Single Rent

  // Activity Controller
  app.post("/api/activity/create", [verifyToken],activityCtrl.create); // Create Activity
  app.get("/api/activity-all", [verifyToken],activityCtrl.get); // Get All Activity
  app.post("/api/activities", [verifyToken],activityCtrl.getData); // Get All Activity
  app.get("/api/activity/:id", [verifyToken],activityCtrl.single); // Get Single Activity
  app.put("/api/activity/:id", [verifyToken],activityCtrl.update); // Update Single Activity
  app.delete("/api/activity/:id", [verifyToken],activityCtrl.delete); // Delete Single Activity

  // Rent Temporary Controller
  app.post("/api/rentTemporary/create", [verifyToken],rentTemporaryCtrl.create); // Create Rent Temporary
  app.get("/api/rentTemporary-all", [verifyToken],rentTemporaryCtrl.get); // Get All Rent Temporary
  app.get("/api/rentTemporary-pending", [verifyToken],rentTemporaryCtrl.getPendingRaised); // Get All Rent Temporary
  app.get("/api/rentTemporary/:id", [verifyToken],rentTemporaryCtrl.single); // Get Single Rent Temporary
  app.put("/api/rentTemporary/:id", [verifyToken],rentTemporaryCtrl.update); // Update Single Rent Temporary
  app.delete("/api/rentTemporary/:id", [verifyToken],rentTemporaryCtrl.delete); // Delete Single Rent Temporary

  // Utility Temporary Controller
  app.post("/api/utilityTemporary/create", [verifyToken],utilityTemporaryCtrl.create); // Create Utility Temporary
  app.get("/api/utilityTemporary-all", [verifyToken],utilityTemporaryCtrl.get); // Get All Utility Temporary
  app.get("/api/utilityTemporary-date/:date1/:date2", [verifyToken],utilityTemporaryCtrl.getByDate); // Get All Utility Temporary
  app.get("/api/utilityTemporary/:id", [verifyToken],utilityTemporaryCtrl.single); // Get Single Utility Temporary
  app.put("/api/utilityTemporary/:id", [verifyToken],utilityTemporaryCtrl.update); // Update Single Utility Temporary
  app.delete("/api/utilityTemporary/:id", [verifyToken],utilityTemporaryCtrl.delete); // Delete Single Utility Temporary

  // Rent Bill Controller
  app.post("/api/rentBill/create", [verifyToken],rentbillCtrl.create); // Create Rent Bill
  app.get("/api/rentBill-all", [verifyToken],rentbillCtrl.get); // Get All Rent Bill
  app.get("/api/rentBill-status", [verifyToken],rentbillCtrl.statusRent); // Get All Rent Bill
  app.get("/api/rentBill-approved-finance", [verifyToken],rentbillCtrl.getByApprovedFinance); // Get All Rent Bill
  app.get("/api/rentBill-current-month", [verifyToken],rentbillCtrl.getForCurentMonth); // Get All Rent Bill For Current Month
  app.get("/api/rentBill/:id", [verifyToken],rentbillCtrl.single); // Get Single Rent Bill
  app.put("/api/rentBill/:id", [verifyToken],rentbillCtrl.update); // Update Single Rent Bill
  app.delete("/api/rentBill/:id", [verifyToken],rentbillCtrl.delete); // Delete Single Rent Bill

  // Branch Controller
  app.post("/api/branch/create", [verifyToken],branchCtrl.create); // Create Branch
  app.post("/api/branch/create/bulk",[verifyToken],branchCtrl.createBulkBranch);
  app.get("/api/branch-all", [verifyToken],branchCtrl.get); // Get All Branch
  app.get("/api/branch-cluster/:cluster", [verifyToken],branchCtrl.getByCluster); // Get All Branch
  app.get("/api/branch-division/:division", [verifyToken],branchCtrl.getByDivision); // Get All Branch
  app.get("/api/branch-state/:state", [verifyToken],branchCtrl.getByState); // Get All Branch
  app.get("/api/branch-zone/:zone", [verifyToken],branchCtrl.getByZone); // Get All Branch
  app.get("/api/branch-superadmin", branchCtrl.getAll); // Get All Branch
  app.get("/api/branch/:id", [verifyToken],branchCtrl.single); // Get Single Branch
  app.put("/api/branch/:id", [verifyToken],branchCtrl.update); // Update Single Branch
  app.delete("/api/branch/:id", [verifyToken],branchCtrl.delete); // Delete Single Branch

  // ApprovalLevels Controller
  app.post("/api/approvalLevels/create", [verifyToken],approvalLevelsCtrl.create); // Create ApprovalLevels
  app.get("/api/approvalLevels-all", [verifyToken],approvalLevelsCtrl.get); // Get All ApprovalLevels
  app.get("/api/approvalLevels/:id", [verifyToken],approvalLevelsCtrl.single); // Get Single ApprovalLevels
  app.put("/api/approvalLevels/:id", [verifyToken],approvalLevelsCtrl.update); // Update Single ApprovalLevels
  app.delete("/api/approvalLevels/:id", [verifyToken],approvalLevelsCtrl.delete); // Delete Single ApprovalLevels
  app.get("/api/approvalLevels-calculate/:billAmount/:isExceted/:utility", approvalLevelsCtrl.calculateApprovalLevels); // Get Single ApprovalLevels
  app.get("/api/approvalLevels-finance-calculate/:billAmount/:isExceted", approvalLevelsCtrl.calculateFinanceApprovalLevels); // Get Single ApprovalLevels
  
  // Role Controller
  app.post("/api/role/create", [verifyToken],roleCtrl.create); // Create Role
  app.get("/api/role-all", [verifyToken],roleCtrl.get); // Get All Role
  app.get("/api/role/:id", [verifyToken],roleCtrl.single); // Get Single Role
  app.put("/api/role/:id", [verifyToken],roleCtrl.update); // Update Single Role
  app.delete("/api/role/:id", [verifyToken],roleCtrl.delete); // Delete Single Role

  // Utility Master Controller
  app.post("/api/utilityMaster/create", [verifyToken],utilityMasterCtrl.create); // Create Utility Master
  app.get("/api/utilityMaster-all", [verifyToken],utilityMasterCtrl.get); // Get All Utility Master
  app.get("/api/utilityMaster/:id", [verifyToken],utilityMasterCtrl.single); // Get Single Utility Master
  app.put("/api/utilityMaster/:id", [verifyToken],utilityMasterCtrl.update); // Update Single Utility Master
  app.delete("/api/utilityMaster/:id", [verifyToken],utilityMasterCtrl.delete); // Delete Single Utility Master

  // Courier Controller
  app.post("/api/courier/create", [verifyToken],courierCtrl.create); // Create Courier
  app.get("/api/courier-all", [verifyToken],courierCtrl.get); // Get All Courier
  app.get("/api/courier-current", [verifyToken],courierCtrl.getByCurrent); // Get All Courier
  app.get("/api/courier-branch/:branch", [verifyToken],courierCtrl.getByBranch); // Get All Courier
  app.get("/api/courier/:id", [verifyToken],courierCtrl.single); // Get Single Courier
  app.put("/api/courier/:id", [verifyToken],courierCtrl.update); // Update Single Courier
  app.delete("/api/courier/:id", [verifyToken],courierCtrl.delete); // Delete Single Courier

  // Cluster Controller
  app.post("/api/cluster/create", [verifyToken],clusterCtrl.create); // Create Cluster
  app.get("/api/cluster-all", [verifyToken],clusterCtrl.get); // Get All Cluster
  app.get("/api/cluster/:id", [verifyToken],clusterCtrl.single); // Get Single Cluster
  app.put("/api/cluster/:id", [verifyToken],clusterCtrl.update); // Update Single Cluster
  app.delete("/api/cluster/:id", [verifyToken],clusterCtrl.delete); // Delete Single Cluster

  // Zone Controller
  app.post("/api/zone/create", [verifyToken],zoneCtrl.create); // Create Zone
  app.get("/api/zone-all", [verifyToken],zoneCtrl.get); // Get All Zone
  app.get("/api/zone/:id", [verifyToken],zoneCtrl.single); // Get Single Zone
  app.put("/api/zone/:id", [verifyToken],zoneCtrl.update); // Update Single Zone
  app.delete("/api/zone/:id", [verifyToken],zoneCtrl.delete); // Delete Single Zone

  // State Controller
  app.post("/api/state/create", [verifyToken],stateCtrl.create); // Create State
  app.get("/api/state-all", [verifyToken],stateCtrl.get); // Get All State
  app.get("/api/state/:id", [verifyToken],stateCtrl.single); // Get Single State
  app.put("/api/state/:id", [verifyToken],stateCtrl.update); // Update Single State
  app.delete("/api/state/:id", [verifyToken],stateCtrl.delete); // Delete Single State

  // Division Controller
  app.post("/api/division/create", [verifyToken],divisionCtrl.create); // Create Division
  app.get("/api/division-all", [verifyToken],divisionCtrl.get); // Get All Division
  app.get("/api/division/:id", [verifyToken],divisionCtrl.single); // Get Single Division
  app.put("/api/division/:id", [verifyToken],divisionCtrl.update); // Update Single Division
  app.delete("/api/division/:id", [verifyToken],divisionCtrl.delete); // Delete Single Division

  // Comman Controller
  app.post("/api/upload",[verifyToken],commanCtrl.uploadFile);
  app.get("/api/retrieve/:file",commanCtrl.retrieveFile);
  app.get("/api/download/:file",commanCtrl.downloadFile);
  app.get("/api/get-current-transactions-overview",[verifyToken],commanCtrl.getCurrentTransactionsOverview);
  app.get("/api/get-current-transactions-overview-branch/:branch",[verifyToken],commanCtrl.getCurrentTransactionsOverviewByBranch);
  app.get("/api/get-current-transactions-overview-rent",[verifyToken],commanCtrl.getCurrentTransactionsOverviewForRent);
  app.get("/api/get-exceeded-consumption",[verifyToken],commanCtrl.exceededConsuptionUnits);
  app.get("/api/get-exceeded",[verifyToken],commanCtrl.getExceeded  );
  app.get("/api/get-exceeded-consumption-branch/:branch",[verifyToken],commanCtrl.exceededConsuptionUnitsByBranch);
  app.get("/api/get-zone-data",[verifyToken],commanCtrl.zonesDataForAdmin);
  app.get("/api/get-cluster-data",[verifyToken],commanCtrl.clustersDataForAdmin);

  app.get("/api/user-validation",commanCtrl.userValidation);
  

  // Utility Controller
  app.post("/api/utility/create", [verifyToken],utilityCtrl.create); // Create Utility
  app.get("/api/utility-all", [verifyToken],utilityCtrl.get); // Get All Utility
  app.get("/api/utility-count", [verifyToken],utilityCtrl.getCount); // Get All Utility Count
  app.get("/api/utility-branch/:branch", [verifyToken],utilityCtrl.getByBranch); // Get All Utility Bill By Branch
  app.get("/api/utility-expectedvoucher/:branch", [verifyToken],utilityCtrl.getExpectedVoucher); // Get All Utility Bill By Branch
  app.get("/api/utility-branch-utility/:branch/:utility", [verifyToken],utilityCtrl.getByBranchAUtility); // Get All Utility Bill By Branch
  app.get("/api/utility/:id", [verifyToken],utilityCtrl.single); // Get Single Utility
  app.put("/api/utility/:id", [verifyToken],utilityCtrl.update); // Update Single Utility
  app.delete("/api/utility/:id", [verifyToken],utilityCtrl.delete); // Delete Single Utility

  // Utility Bill Controller
  app.post("/api/utilitybill/create", [verifyToken],utilitybillCtrl.create); // Create Utility bill
  app.get("/api/utilitybill-all", [verifyToken],utilitybillCtrl.get); // Get All Utility Bill
  // app.get("/api/utilitybill-date/:date1/:date2", [verifyToken],utilitybillCtrl.getByDate); // Get All Utility Bill
  // app.get("/api/utilitybill-current", [verifyToken],utilitybillCtrl.getByCurrent); // Get All Utility Bill
  // app.get("/api/utilitybill-selected/:date1/:date2", [verifyToken],utilitybillCtrl.getBySelected); // Get All Utility Bill
  // app.get("/api/utilitybill-branch/:branch", [verifyToken],utilitybillCtrl.getByBranch); // Get All Utility Bill By Branch
  // app.get("/api/utilitybill-branch-count/:branch", [verifyToken],utilitybillCtrl.getByBranchCount); // Get All Utility Bill By Branch
  // app.get("/api/active-transactions-branch/:branch", [verifyToken],utilitybillCtrl.activeTransactionsByBranch); // Get All Utility Bill By Branch
  // app.get("/api/active-transactions-branch-current/:branch", [verifyToken],utilitybillCtrl.activeTransactionsByBranchAndCurrentMonth); // Get All Utility Bill By Branch
  // app.get("/api/active-transactions-branch-selected/:branch/:date1/:date2", [verifyToken],utilitybillCtrl.activeTransactionsByBranchAndSelectedDate); // Get All Utility Bill By Branch
  app.get("/api/utilitybill-count/:branch", [verifyToken],utilitybillCtrl.countByBranch); // Get All Utility Bill By Branch
  app.get("/api/utilitybill/:id", [verifyToken],utilitybillCtrl.single); // Get Single Utility Bill
  app.put("/api/utilitybill/:id", [verifyToken],utilitybillCtrl.update); // Update Single Utility Bill
  app.delete("/api/utilitybill/:id", [verifyToken],utilitybillCtrl.delete); // Delete Single Utility Bill


};

