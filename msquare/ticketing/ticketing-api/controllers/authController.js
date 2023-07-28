const authService = require('../services/authService');

function authController(req, res) {
    // Controller logic here
}

// Create
authController.register = async (req, res) => {
    try {
        const userData = req.body;
        const user = await authService.register(userData);
        if(user){
            res.status(200).send({status:true,message:"User Registered Successfully",data:user,error:""});
        }
    } catch (error) {
        res.status(500).send({status:false,message:"Internal Server Error",data:[],error:error});
    }
};

// Read
authController.authenticate = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await authService.authenticate(email,password);
        if(user){
            res.status(200).send({status:true,message:"User Logged in Successfully",data:user,error:""});
        } else{
            res.status(200).send({status:true,message:"Invalid Email or Password",data:[],error:""});
        }
    } catch (error) {
        res.status(500).send({status:false,message:"Internal Server Error",data:[],error:error});
    }
};


module.exports = authController;