const db = require("../models");
const { notificationTrans: NotificationTrans,user:User} = db;



exports.updateNotification = (req,res)=>{
    for(let i in req.body.data){
        NotificationTrans.findByIdAndUpdate(req.body.data[i]._id,{$set:{ status: "1"}},(err, data)=>{
        });
        if(i == (req.body.data.length -1)){
            res.status(200).send({
                status:"success",
                message : "Notification Updated successfully!"
            });
        }
    }
}

exports.notificationByUserId = (req, res) => {
    NotificationTrans.find({userId: req.params.id},(err,data)=>{
        if(err){
            res.status(500).send({ status:"error", message: err });
            return
        }

        
        res.status(200).send({
            status:"success",
            message:"Notification",
            data:data
        });
        
    }).sort({createdAt:-1});
};

  exports.getAllNotificationByUser = (req,res)=>{
    NotificationTrans.find({userId:req.params.id},(err,data)=>{
        if(err){
            res.status(500).send({ status:"error", message: err });
        } else {
            res.status(200).send({
                status:"success",
                message : "All Notification retrieved",
                data: data
            });
        }
    }).limit(50).sort({"createdAt":-1});
  }


exports.clearNotificationByUserId = (req, res) => {

    NotificationTrans.updateMany({ "userId" :  req.params.id},{$set:{status:1}},(err,data)=>{
        if(err){
            res.status(500).send({ status:"error", message: err });
            return
        }

        
        res.status(200).send({
            status:"success",
            message:"Notification Cleard",
        });
        
    });
};

exports.clearNotification = (req, res) => {

    NotificationTrans.updateOne({ "_id" :  req.params.id},{$set:{status:1}},(err,data)=>{
        if(err){
            res.status(500).send({ status:"error", message: err });
            return
        }

        
        res.status(200).send({
            status:"success",
            message:"Notification Cleard",
        });
        
    });
};


