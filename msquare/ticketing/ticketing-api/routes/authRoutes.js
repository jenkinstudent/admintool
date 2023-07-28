
    // routes/authRoutes.js
const authController = require('../controllers/authController');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post('/auth/authenticate', authController.authenticate);

    app.post('/auth/register', authController.register);
}

    
    