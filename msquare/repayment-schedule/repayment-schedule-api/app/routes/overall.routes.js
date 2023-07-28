const userCtrl = require("../controllers/user.controller");
const mtCtrl = require("../controllers/mt.controller");
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
  app.patch("/api/users/:id", userCtrl.patchUser);
  app.get("/api/users/:id", userCtrl.getUser);
  app.delete("/api/users/:id", userCtrl.deleteUser);
  
  // MT Controller
  app.post("/api/mt/create", mtCtrl.create); // Create MT
  app.get("/api/mt-all", mtCtrl.get); // Get All MT
  app.get("/api/mt/:id", mtCtrl.single); // Get Single MT
  app.put("/api/mt/:id", mtCtrl.update); // Update Single MT
  app.delete("/api/mt/:id", mtCtrl.delete); // Delete Single MT

  app.post("/api/downloadFile", mtCtrl.downloadFile); // Delete Single MT
  app.get("/api/download/:file", mtCtrl.download); // Delete Single MT
  app.get("/api/download-input", mtCtrl.downloadInput); // Delete Single MT

};

