const db = require("../models");
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');
const Utilitybill = require("../models/utilitybill.model");
const Zone = require("../models/zone.model");
const Utility = require("../models/utility.model");
const Branch = require("../models/branch.model");
const Rent = require("../models/rent.model");
var _ = require('lodash');
const Rentbill = require("../models/rentbill.model");
const RentTemporary = require("../models/rentTemporary.model");
const UtilityTemporary = require("../models/utilityTemporary.model");

const {
    user: User
} = db;

exports.uploadFile = (req, res) => {
    const form = new formidable.IncomingForm({allowEmptyFiles:false,keepExtensions:true});
    form.parse(req, function(err, fields, files){
        if(fields.file !== ""){
            var oldPath = files.file.filepath;
            var newPath = path.join(__dirname, '../../uploads')
                    + '/'+files.file.newFilename
            var rawData = fs.readFileSync(oldPath)
        
            fs.writeFile(newPath, rawData, function(err){

                res.status(200).send({
                    status:"success",
                    message : "Successfully Uploaded",
                    data: {
                        url:files.file.newFilename
                    }
                });
            });
        } else {
            res.status(500).send({ status:"error", message: "File is Missing" });
        }
    });
};

exports.retrieveFile = (req, res, next) => {
    try{
        res.status(200).sendFile(path.join(__dirname, '../../uploads/'+req.params.file));
    }catch(error){
        res.status(500).send({ status:"error", message: error });
    }
}

exports.downloadFile = (req, res, next) => {
    try{
        res.setHeader('Content-Disposition', 'attachment;filename="'+path.join(__dirname, '../../uploads/'+req.params.file));
        res.status(200).sendFile(path.join(__dirname, '../../uploads/'+req.params.file));
    }catch(error){
        res.status(500).send({ status:"error", message: "File is Missing" });
    }
}


exports.getCurrentTransactionsOverview = async (req,res)=>{
    // var date = new Date();
    let janToAmt =0;
    let febToAmt =0;
    let marToAmt =0;
    let aprToAmt =0;
    let mayToAmt =0;
    let juneToAmt =0;
    let julyToAmt =0;
    let augToAmt =0;
    let septToAmt =0;
    let octToAmt =0;
    let novToAmt =0;
    let decToAmt =0;
    let janExcAmt =0;
    let febExcAmt =0;
    let marExcAmt =0;
    let aprExcAmt =0;
    let mayExcAmt =0;
    let juneExcAmt =0;
    let julyExcAmt =0;
    let augExcAmt =0;
    let septExcAmt =0;
    let octExcAmt =0;
    let novExcAmt =0;
    let decExcAmt =0;
    let currentDate = new Date(new Date().getFullYear() + "-01-01");
    let nextDate = new Date(new Date().getFullYear() + "-12-31");
    
    let to =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate:{$gte: currentDate,$lte: nextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let totalTransaction =0;
    let exceededTransaction = 0;
    let exc = [];
    let kpi;
    if(to.length == 0){
        kpi = {
            noOfTotalTransaction:0,
            noOfExceededTransaction:0,
            totalTransactionAmt:0,
            totalExceededAmt:0,
        }
    }
    for(let i in to){
        totalTransaction =  (totalTransaction*1)+(to[i].grossAmount*1);
        if(to[i].grossAmount > to[i].meter.maximumConsumption){
            exc.push(to[i]);
            exceededTransaction = (exceededTransaction*1)+((to[i].grossAmount - to[i].meter.maximumConsumption)*1);
        }
        if(i == (to.length - 1)){
            kpi = {
                noOfTotalTransaction:to.length,
                noOfExceededTransaction:exc.length,
                totalTransactionAmt:totalTransaction,
                totalExceededAmt:exceededTransaction
            }
        }
    }
    const date = new Date();
    let janCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let janNextDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(1))).slice(-2));
    let febCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (2)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let febNextDate = new Date(date.getFullYear() + "-" + ("0" + (2)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(2))).slice(-2));
    let marchCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (3)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let marchNextDate = new Date(date.getFullYear() + "-" + ("0" + (3)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(3))).slice(-2));
    let aprCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (4)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let aprNextDate = new Date(date.getFullYear() + "-" + ("0" + (4)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(4))).slice(-2));
    let mayCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (5)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let mayNextDate = new Date(date.getFullYear() + "-" + ("0" + (5)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(5))).slice(-2));
    let juneCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (6)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let juneNextDate = new Date(date.getFullYear() + "-" + ("0" + (6)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(6))).slice(-2));
    let julyCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (7)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let julyNextDate = new Date(date.getFullYear() + "-" + ("0" + (7)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(7))).slice(-2));
    let augCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (8)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let augNextDate = new Date(date.getFullYear() + "-" + ("0" + (8)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(8))).slice(-2));
    let septCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (9)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let septNextDate = new Date(date.getFullYear() + "-" + ("0" + (9)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(9))).slice(-2));
    let octCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (10)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let octNextDate = new Date(date.getFullYear() + "-" + ("0" + (10)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(10))).slice(-2));
    let novCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (11)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let novNextDate = new Date(date.getFullYear() + "-" + ("0" + (11)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(11))).slice(-2));
    let decCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let decNextDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(12))).slice(-2));
    let janTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: janCurrentDate,$lte: janNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let febTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: febCurrentDate,$lte: febNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let marTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: marchCurrentDate,$lte: marchNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let aprTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: aprCurrentDate,$lte: aprNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let mayTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: mayCurrentDate,$lte: mayNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let juneTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: juneCurrentDate,$lte: juneNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let julyTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: julyCurrentDate,$lte: julyNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let augTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: augCurrentDate,$lte: augNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let septTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: septCurrentDate,$lte: septNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let octTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: octCurrentDate,$lte: octNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let novTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: novCurrentDate,$lte: novNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let decTo =  await Utilitybill.find({branch:{$in:req.branches},invoiceDate: {$gte: decCurrentDate,$lte: decNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let janExc = [];
    let febExc = [];
    let marExc = [];
    let aprExc = [];
    let mayExc = [];
    let juneExc = [];
    let julyExc = [];
    let augExc = [];
    let septExc = [];
    let octExc = [];
    let novExc = [];
    let decExc = [];
    for(let i in janTo){
        janToAmt =  (janToAmt*1)+(janTo[i].grossAmount*1);
        if(janTo[i].grossAmount > janTo[i].meter.maximumConsumption){
            janExc.push(janTo[i]);
            janExcAmt = (janExcAmt*1)+((janTo[i].grossAmount - janTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in febTo){
        febToAmt =  (febToAmt*1)+(febTo[i].grossAmount*1);
        if(febTo[i].grossAmount > febTo[i].meter.maximumConsumption){
            febExc.push(febTo[i]);
            febExcAmt = (febExcAmt*1)+((febTo[i].grossAmount - febTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in marTo){
        marToAmt =  (marToAmt*1)+(marTo[i].grossAmount*1);
        if(marTo[i].grossAmount > marTo[i].meter.maximumConsumption){
            marExc.push(marTo[i]);
            marExcAmt = (marExcAmt*1)+((marTo[i].grossAmount - marTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in aprTo){
        aprToAmt =  (aprToAmt*1)+(aprTo[i].grossAmount*1);
        if(aprTo[i].grossAmount > aprTo[i].meter.maximumConsumption){
            aprExc.push(aprTo[i]);
            aprExcAmt = (aprExcAmt*1)+((aprTo[i].grossAmount - aprTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in mayTo){
        mayToAmt =  (mayToAmt*1)+(mayTo[i].grossAmount*1);
        if(mayTo[i].grossAmount > mayTo[i].meter.maximumConsumption){
            mayExc.push(mayTo[i]);
            mayExcAmt = (mayExcAmt*1)+((mayTo[i].grossAmount - mayTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in juneTo){
        juneToAmt =  (juneToAmt*1)+(juneTo[i].grossAmount*1);
        if(juneTo[i].grossAmount > juneTo[i].meter.maximumConsumption){
            juneExc.push(juneTo[i]);
            juneExcAmt = (juneExcAmt*1)+((juneTo[i].grossAmount - juneTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in julyTo){
        julyToAmt =  (julyToAmt*1)+(julyTo[i].grossAmount*1);
        if(julyTo[i].grossAmount > julyTo[i].meter.maximumConsumption){
            julyExc.push(julyTo[i]);
            julyExcAmt = (julyExcAmt*1)+((julyTo[i].grossAmount - julyTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in augTo){
        augToAmt =  (augToAmt*1)+(augTo[i].grossAmount*1);
        if(augTo[i].grossAmount > augTo[i].meter.maximumConsumption){
            augExc.push(augTo[i]);
            augExcAmt = (augExcAmt*1)+((augTo[i].grossAmount - augTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in septTo){
        septToAmt =  (septToAmt*1)+(septTo[i].grossAmount*1);
        if(septTo[i].grossAmount > septTo[i].meter.maximumConsumption){
            septExc.push(septTo[i]);
            septExcAmt = (septExcAmt*1)+((septTo[i].grossAmount - septTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in octTo){
        octToAmt =  (octToAmt*1)+(octTo[i].grossAmount*1);
        if(octTo[i].grossAmount > octTo[i].meter.maximumConsumption){
            octExc.push(octTo[i]);
            octExcAmt = (octExcAmt*1)+((octTo[i].grossAmount - octTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in novTo){
        novToAmt =  (novToAmt*1)+(novTo[i].grossAmount*1);
        if(novTo[i].grossAmount > novTo[i].meter.maximumConsumption){
            novExc.push(novTo[i]);
            novExcAmt = (novExcAmt*1)+((novTo[i].grossAmount - novTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in decTo){
        decToAmt =  (decToAmt*1)+(decTo[i].grossAmount*1);
        if(decTo[i].grossAmount > decTo[i].meter.maximumConsumption){
            decExc.push(decTo[i]);
            decExcAmt = (decExcAmt*1)+((decTo[i].grossAmount - decTo[i].meter.maximumConsumption)*1);
        }
    }

    let chartData = {
    series: [
        {
            name: 'Total Transactions',
            type: 'bar',
            data: [janTo.length, febTo.length, marTo.length, aprTo.length, mayTo.length, juneTo.length, julyTo.length, augTo.length, septTo.length, octTo.length, novTo.length, decTo.length]
        },
        {
            name: 'Escalated Transactions',
            type: 'bar',
            data: [janExc.length, febExc.length, marExc.length, aprExc.length, mayExc.length, juneExc.length, julyExc.length, augExc.length, septExc.length, octExc.length, novExc.length, decExc.length]
        }, 
        {
            name: 'Amount Approval',
            type: 'area',
            data: [janToAmt, febToAmt, marToAmt, aprToAmt, mayToAmt, juneToAmt, julyToAmt, augToAmt, septToAmt, octToAmt, novToAmt, decToAmt]
        },
        {
            name: 'Exceeded Amount',
            type: 'area',
            data: [janExcAmt, febExcAmt, marExcAmt, aprExcAmt, mayExcAmt, juneExcAmt, julyExcAmt, augExcAmt, septExcAmt, octExcAmt, novExcAmt, decExcAmt]
        }],
    chart: {
        height: 374,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        curve: 'smooth',
        dashArray: [0, 3, 0,3],
        width: [0,1, 0,1],
    },
    fill: {
        opacity: [1, 0.1, 1,0.1]
    },
    markers: {
        size: [0, 4, 0,4],
        strokeWidth: 2,
        hover: {
            size: 4,
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            }
        },
        yaxis: {
            lines: {
                show: false,
            }
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10
        },
    },
    legend: {
        show: true,
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            barHeight: '70%'
        }
    },
    colors: ["#405189","#0ab39c","#FEF8EE","#F3DED2"],
    tooltip: {
    shared: true,
    y: [{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0);
          }
          return y;
          
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return y.toFixed(0);
          }
          return y;
          
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return   "₹" + y.toFixed(2);
          }
          return y;
          
        }
      },{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return   "₹" + y.toFixed(2);
          }
          return y;
          
        }
      }]
    }};
    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        kpi: kpi,
        chart:chartData
    });
}


exports.getCurrentTransactionsOverviewByBranch = async (req,res)=>{
    // var date = new Date();
    let user = await User.findById(req.params.branch);
    let janToAmt =0;
    let febToAmt =0;
    let marToAmt =0;
    let aprToAmt =0;
    let mayToAmt =0;
    let juneToAmt =0;
    let julyToAmt =0;
    let augToAmt =0;
    let septToAmt =0;
    let octToAmt =0;
    let novToAmt =0;
    let decToAmt =0;
    let janExcAmt =0;
    let febExcAmt =0;
    let marExcAmt =0;
    let aprExcAmt =0;
    let mayExcAmt =0;
    let juneExcAmt =0;
    let julyExcAmt =0;
    let augExcAmt =0;
    let septExcAmt =0;
    let octExcAmt =0;
    let novExcAmt =0;
    let decExcAmt =0;
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (31)).slice(-2));
    let to =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: currentDate,$lte: nextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let totalTransaction =0;
    let exceededTransaction = 0;
    let exc = [];
    let kpi;
    if(to.length == 0){
        kpi = {
            noOfTotalTransaction:0,
            noOfExceededTransaction:0,
            totalTransactionAmt:0,
            totalExceededAmt:0,
        }
    }
    for(let i in to){
        totalTransaction =  (totalTransaction*1)+(to[i].grossAmount*1);
        if(to[i].grossAmount > to[i].meter.maximumConsumption){
            exc.push(to[i]);
            exceededTransaction = (exceededTransaction*1)+((to[i].grossAmount - to[i].meter.maximumConsumption)*1);
        }
        if(i == (to.length - 1)){
            kpi = {
                noOfTotalTransaction:to.length,
                noOfExceededTransaction:exc.length,
                totalTransactionAmt:totalTransaction,
                totalExceededAmt:exceededTransaction
            }
        }
    }
    let janCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let janNextDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(1))).slice(-2));
    let febCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (2)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let febNextDate = new Date(date.getFullYear() + "-" + ("0" + (2)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(2))).slice(-2));
    let marchCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (3)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let marchNextDate = new Date(date.getFullYear() + "-" + ("0" + (3)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(3))).slice(-2));
    let aprCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (4)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let aprNextDate = new Date(date.getFullYear() + "-" + ("0" + (4)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(4))).slice(-2));
    let mayCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (5)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let mayNextDate = new Date(date.getFullYear() + "-" + ("0" + (5)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(5))).slice(-2));
    let juneCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (6)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let juneNextDate = new Date(date.getFullYear() + "-" + ("0" + (6)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(6))).slice(-2));
    let julyCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (7)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let julyNextDate = new Date(date.getFullYear() + "-" + ("0" + (7)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(7))).slice(-2));
    let augCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (8)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let augNextDate = new Date(date.getFullYear() + "-" + ("0" + (8)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(8))).slice(-2));
    let septCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (9)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let septNextDate = new Date(date.getFullYear() + "-" + ("0" + (9)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(9))).slice(-2));
    let octCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (10)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let octNextDate = new Date(date.getFullYear() + "-" + ("0" + (10)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(10))).slice(-2));
    let novCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (11)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let novNextDate = new Date(date.getFullYear() + "-" + ("0" + (11)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(11))).slice(-2));
    let decCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let decNextDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(12))).slice(-2));
    let janTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: janCurrentDate,$lte: janNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let febTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: febCurrentDate,$lte: febNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let marTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: marchCurrentDate,$lte: marchNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let aprTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: aprCurrentDate,$lte: aprNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let mayTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: mayCurrentDate,$lte: mayNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let juneTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: juneCurrentDate,$lte: juneNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let julyTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: julyCurrentDate,$lte: julyNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let augTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: augCurrentDate,$lte: augNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let septTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: septCurrentDate,$lte: septNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let octTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: octCurrentDate,$lte: octNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let novTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: novCurrentDate,$lte: novNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let decTo =  await Utilitybill.find({branch:user?.permissions.branch,invoiceDate: {$gte: decCurrentDate,$lte: decNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    let janExc = [];
    let febExc = [];
    let marExc = [];
    let aprExc = [];
    let mayExc = [];
    let juneExc = [];
    let julyExc = [];
    let augExc = [];
    let septExc = [];
    let octExc = [];
    let novExc = [];
    let decExc = [];
    for(let i in janTo){
        janToAmt =  (janToAmt*1)+(janTo[i].grossAmount*1);
        if(janTo[i].grossAmount > janTo[i].meter.maximumConsumption){
            janExc.push(janTo[i]);
            janExcAmt = (janExcAmt*1)+((janTo[i].grossAmount - janTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in febTo){
        febToAmt =  (febToAmt*1)+(febTo[i].grossAmount*1);
        if(febTo[i].grossAmount > febTo[i].meter.maximumConsumption){
            febExc.push(febTo[i]);
            febExcAmt = (febExcAmt*1)+((febTo[i].grossAmount - febTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in marTo){
        marToAmt =  (marToAmt*1)+(marTo[i].grossAmount*1);
        if(marTo[i].grossAmount > marTo[i].meter.maximumConsumption){
            marExc.push(marTo[i]);
            marExcAmt = (marExcAmt*1)+((marTo[i].grossAmount - marTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in aprTo){
        aprToAmt =  (aprToAmt*1)+(aprTo[i].grossAmount*1);
        if(aprTo[i].grossAmount > aprTo[i].meter.maximumConsumption){
            aprExc.push(aprTo[i]);
            aprExcAmt = (aprExcAmt*1)+((aprTo[i].grossAmount - aprTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in mayTo){
        mayToAmt =  (mayToAmt*1)+(mayTo[i].grossAmount*1);
        if(mayTo[i].grossAmount > mayTo[i].meter.maximumConsumption){
            mayExc.push(mayTo[i]);
            mayExcAmt = (mayExcAmt*1)+((mayTo[i].grossAmount - mayTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in juneTo){
        juneToAmt =  (juneToAmt*1)+(juneTo[i].grossAmount*1);
        if(juneTo[i].grossAmount > juneTo[i].meter.maximumConsumption){
            juneExc.push(juneTo[i]);
            juneExcAmt = (juneExcAmt*1)+((juneTo[i].grossAmount - juneTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in julyTo){
        julyToAmt =  (julyToAmt*1)+(julyTo[i].grossAmount*1);
        if(julyTo[i].grossAmount > julyTo[i].meter.maximumConsumption){
            julyExc.push(julyTo[i]);
            julyExcAmt = (julyExcAmt*1)+((julyTo[i].grossAmount - julyTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in augTo){
        augToAmt =  (augToAmt*1)+(augTo[i].grossAmount*1);
        if(augTo[i].grossAmount > augTo[i].meter.maximumConsumption){
            augExc.push(augTo[i]);
            augExcAmt = (augExcAmt*1)+((augTo[i].grossAmount - augTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in septTo){
        septToAmt =  (septToAmt*1)+(septTo[i].grossAmount*1);
        if(septTo[i].grossAmount > septTo[i].meter.maximumConsumption){
            septExc.push(septTo[i]);
            septExcAmt = (septExcAmt*1)+((septTo[i].grossAmount - septTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in octTo){
        octToAmt =  (octToAmt*1)+(octTo[i].grossAmount*1);
        if(octTo[i].grossAmount > octTo[i].meter.maximumConsumption){
            octExc.push(octTo[i]);
            octExcAmt = (octExcAmt*1)+((octTo[i].grossAmount - octTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in novTo){
        novToAmt =  (novToAmt*1)+(novTo[i].grossAmount*1);
        if(novTo[i].grossAmount > novTo[i].meter.maximumConsumption){
            novExc.push(novTo[i]);
            novExcAmt = (novExcAmt*1)+((novTo[i].grossAmount - novTo[i].meter.maximumConsumption)*1);
        }
    }
    for(let i in decTo){
        decToAmt =  (decToAmt*1)+(decTo[i].grossAmount*1);
        if(decTo[i].grossAmount > decTo[i].meter.maximumConsumption){
            decExc.push(decTo[i]);
            decExcAmt = (decExcAmt*1)+((decTo[i].grossAmount - decTo[i].meter.maximumConsumption)*1);
        }
    }

    let chartData = {
    series: [
        {
            name: 'Total Transactions',
            type: 'bar',
            data: [janTo.length, febTo.length, marTo.length, aprTo.length, mayTo.length, juneTo.length, julyTo.length, augTo.length, septTo.length, octTo.length, novTo.length, decTo.length]
        },
        {
            name: 'Escalated Transactions',
            type: 'bar',
            data: [janExc.length, febExc.length, marExc.length, aprExc.length, mayExc.length, juneExc.length, julyExc.length, augExc.length, septExc.length, octExc.length, novExc.length, decExc.length]
        }, 
        {
            name: 'Amount Approval',
            type: 'area',
            data: [janToAmt, febToAmt, marToAmt, aprToAmt, mayToAmt, juneToAmt, julyToAmt, augToAmt, septToAmt, octToAmt, novToAmt, decToAmt]
        },
        {
            name: 'Exceeded Amount',
            type: 'area',
            data: [janExcAmt, febExcAmt, marExcAmt, aprExcAmt, mayExcAmt, juneExcAmt, julyExcAmt, augExcAmt, septExcAmt, octExcAmt, novExcAmt, decExcAmt]
        }],
    chart: {
        height: 374,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        curve: 'smooth',
        dashArray: [0, 3, 0,3],
        width: [0,1, 0,1],
    },
    fill: {
        opacity: [1, 0.1, 1,0.1]
    },
    markers: {
        size: [0, 4, 0,4],
        strokeWidth: 2,
        hover: {
            size: 4,
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            }
        },
        yaxis: {
            lines: {
                show: false,
            }
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10
        },
    },
    legend: {
        show: true,
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            barHeight: '70%'
        }
    },
    colors: ["#405189","#0ab39c","#FEF8EE","#F3DED2"],
    tooltip: {
    shared: true,
    y: [{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0);
          }
          return y;
          
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return y.toFixed(0);
          }
          return y;
          
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return   "₹" + y.toFixed(2);
          }
          return y;
          
        }
      },{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return   "₹" + y.toFixed(2);
          }
          return y;
          
        }
      }]
    }};
    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        kpi: kpi,
        chart:chartData
    });
}

exports.getCurrentTransactionsOverviewForRent = async (req,res)=>{
    // var date = new Date();
    let janToAmt =0;
    let febToAmt =0;
    let marToAmt =0;
    let aprToAmt =0;
    let mayToAmt =0;
    let juneToAmt =0;
    let julyToAmt =0;
    let augToAmt =0;
    let septToAmt =0;
    let octToAmt =0;
    let novToAmt =0;
    let decToAmt =0;
    let janExcAmt =0;
    let febExcAmt =0;
    let marExcAmt =0;
    let aprExcAmt =0;
    let mayExcAmt =0;
    let juneExcAmt =0;
    let julyExcAmt =0;
    let augExcAmt =0;
    let septExcAmt =0;
    let octExcAmt =0;
    let novExcAmt =0;
    let decExcAmt =0;
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (31)).slice(-2));
    let to =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: currentDate,$lte: nextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let pending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: currentDate,$lte: nextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let totalTransaction =0;
    let exceededTransaction = 0;
    let exc = [];
    let kpi = {
        totalRaised:0,
        escalatedTransactions:0,
        lastExceeded:0,
        pendingTransactions:0,
    };
    kpi.totalRaised = to.length;
    kpi.pendingTransactions = pending.length;

    // for(let i in to){
    //     totalTransaction =  (totalTransaction*1)+(to[i].grossAmount*1);
    //     if(to[i].grossAmount > to[i].meter.maximumConsumption){
    //         exc.push(to[i]);
    //         exceededTransaction = (exceededTransaction*1)+((to[i].grossAmount - to[i].meter.maximumConsumption)*1);
    //     }
    //     if(i == (to.length - 1)){
    //         kpi = {
    //             noOfTotalTransaction:to.length,
    //             noOfExceededTransaction:exc.length,
    //             totalTransactionAmt:totalTransaction,
    //             totalExceededAmt:exceededTransaction
    //         }
    //     }
    // }

    let janCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let janNextDate = new Date(date.getFullYear() + "-" + ("0" + (1)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(1))).slice(-2));
    let febCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (2)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let febNextDate = new Date(date.getFullYear() + "-" + ("0" + (2)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(2))).slice(-2));
    let marchCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (3)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let marchNextDate = new Date(date.getFullYear() + "-" + ("0" + (3)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(3))).slice(-2));
    let aprCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (4)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let aprNextDate = new Date(date.getFullYear() + "-" + ("0" + (4)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(4))).slice(-2));
    let mayCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (5)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let mayNextDate = new Date(date.getFullYear() + "-" + ("0" + (5)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(5))).slice(-2));
    let juneCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (6)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let juneNextDate = new Date(date.getFullYear() + "-" + ("0" + (6)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(6))).slice(-2));
    let julyCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (7)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let julyNextDate = new Date(date.getFullYear() + "-" + ("0" + (7)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(7))).slice(-2));
    let augCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (8)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let augNextDate = new Date(date.getFullYear() + "-" + ("0" + (8)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(8))).slice(-2));
    let septCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (9)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let septNextDate = new Date(date.getFullYear() + "-" + ("0" + (9)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(9))).slice(-2));
    let octCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (10)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let octNextDate = new Date(date.getFullYear() + "-" + ("0" + (10)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(10))).slice(-2));
    let novCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (11)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let novNextDate = new Date(date.getFullYear() + "-" + ("0" + (11)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(11))).slice(-2));
    let decCurrentDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let decNextDate = new Date(date.getFullYear() + "-" + ("0" + (12)).slice(-2) + "-" + ("0" + (getDaysInCurrentMonth(12))).slice(-2));

    let janTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: janCurrentDate,$lte: janNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let febTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: febCurrentDate,$lte: febNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let marTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: marchCurrentDate,$lte: marchNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let aprTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: aprCurrentDate,$lte: aprNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let mayTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: mayCurrentDate,$lte: mayNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let juneTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: juneCurrentDate,$lte: juneNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let julyTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: julyCurrentDate,$lte: julyNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let augTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: augCurrentDate,$lte: augNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let septTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: septCurrentDate,$lte: septNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let octTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: octCurrentDate,$lte: octNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let novTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: novCurrentDate,$lte: novNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let decTo =  await Rentbill.find({branch:{$in:req.branches},createdAt: {$gte: decCurrentDate,$lte: decNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");

    let janPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: janCurrentDate,$lte: janNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let febPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: febCurrentDate,$lte: febNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let marPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: marchCurrentDate,$lte: marchNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let aprPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: aprCurrentDate,$lte: aprNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let mayPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: mayCurrentDate,$lte: mayNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let junePending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: juneCurrentDate,$lte: juneNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let julyPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: julyCurrentDate,$lte: julyNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let augPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: augCurrentDate,$lte: augNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let septPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: septCurrentDate,$lte: septNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let octPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: octCurrentDate,$lte: octNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let novPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: novCurrentDate,$lte: novNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");
    let decPending =  await Rentbill.find({branch:{$in:req.branches},adminStatus:"Pending",createdAt: {$gte: decCurrentDate,$lte: decNextDate}}).populate("branch")
    .populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate("rent");

    let janExc = [];
    let febExc = [];
    let marExc = [];
    let aprExc = [];
    let mayExc = [];
    let juneExc = [];
    let julyExc = [];
    let augExc = [];
    let septExc = [];
    let octExc = [];
    let novExc = [];
    let decExc = [];
    // for(let i in janTo){
    //     janToAmt =  (janToAmt*1)+(janTo[i].grossAmount*1);
    //     if(janTo[i].grossAmount > janTo[i].meter.maximumConsumption){
    //         janExc.push(janTo[i]);
    //         janExcAmt = (janExcAmt*1)+((janTo[i].grossAmount - janTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in febTo){
    //     febToAmt =  (febToAmt*1)+(febTo[i].grossAmount*1);
    //     if(febTo[i].grossAmount > febTo[i].meter.maximumConsumption){
    //         febExc.push(febTo[i]);
    //         febExcAmt = (febExcAmt*1)+((febTo[i].grossAmount - febTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in marTo){
    //     marToAmt =  (marToAmt*1)+(marTo[i].grossAmount*1);
    //     if(marTo[i].grossAmount > marTo[i].meter.maximumConsumption){
    //         marExc.push(marTo[i]);
    //         marExcAmt = (marExcAmt*1)+((marTo[i].grossAmount - marTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in aprTo){
    //     aprToAmt =  (aprToAmt*1)+(aprTo[i].grossAmount*1);
    //     if(aprTo[i].grossAmount > aprTo[i].meter.maximumConsumption){
    //         aprExc.push(aprTo[i]);
    //         aprExcAmt = (aprExcAmt*1)+((aprTo[i].grossAmount - aprTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in mayTo){
    //     mayToAmt =  (mayToAmt*1)+(mayTo[i].grossAmount*1);
    //     if(mayTo[i].grossAmount > mayTo[i].meter.maximumConsumption){
    //         mayExc.push(mayTo[i]);
    //         mayExcAmt = (mayExcAmt*1)+((mayTo[i].grossAmount - mayTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in juneTo){
    //     juneToAmt =  (juneToAmt*1)+(juneTo[i].grossAmount*1);
    //     if(juneTo[i].grossAmount > juneTo[i].meter.maximumConsumption){
    //         juneExc.push(juneTo[i]);
    //         juneExcAmt = (juneExcAmt*1)+((juneTo[i].grossAmount - juneTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in julyTo){
    //     julyToAmt =  (julyToAmt*1)+(julyTo[i].grossAmount*1);
    //     if(julyTo[i].grossAmount > julyTo[i].meter.maximumConsumption){
    //         julyExc.push(julyTo[i]);
    //         julyExcAmt = (julyExcAmt*1)+((julyTo[i].grossAmount - julyTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in augTo){
    //     augToAmt =  (augToAmt*1)+(augTo[i].grossAmount*1);
    //     if(augTo[i].grossAmount > augTo[i].meter.maximumConsumption){
    //         augExc.push(augTo[i]);
    //         augExcAmt = (augExcAmt*1)+((augTo[i].grossAmount - augTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in septTo){
    //     septToAmt =  (septToAmt*1)+(septTo[i].grossAmount*1);
    //     if(septTo[i].grossAmount > septTo[i].meter.maximumConsumption){
    //         septExc.push(septTo[i]);
    //         septExcAmt = (septExcAmt*1)+((septTo[i].grossAmount - septTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in octTo){
    //     octToAmt =  (octToAmt*1)+(octTo[i].grossAmount*1);
    //     if(octTo[i].grossAmount > octTo[i].meter.maximumConsumption){
    //         octExc.push(octTo[i]);
    //         octExcAmt = (octExcAmt*1)+((octTo[i].grossAmount - octTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in novTo){
    //     novToAmt =  (novToAmt*1)+(novTo[i].grossAmount*1);
    //     if(novTo[i].grossAmount > novTo[i].meter.maximumConsumption){
    //         novExc.push(novTo[i]);
    //         novExcAmt = (novExcAmt*1)+((novTo[i].grossAmount - novTo[i].meter.maximumConsumption)*1);
    //     }
    // }
    // for(let i in decTo){
    //     decToAmt =  (decToAmt*1)+(decTo[i].grossAmount*1);
    //     if(decTo[i].grossAmount > decTo[i].meter.maximumConsumption){
    //         decExc.push(decTo[i]);
    //         decExcAmt = (decExcAmt*1)+((decTo[i].grossAmount - decTo[i].meter.maximumConsumption)*1);
    //     }
    // }

    let chartData = {
    series: [
        {
            name: 'Total Raised',
            type: 'bar',
            data: [janTo.length, febTo.length, marTo.length, aprTo.length, mayTo.length, juneTo.length, julyTo.length, augTo.length, septTo.length, octTo.length, novTo.length, decTo.length]
        },
        {
            name: 'Escalated Transactions',
            type: 'bar',
            data: [janExc.length, febExc.length, marExc.length, aprExc.length, mayExc.length, juneExc.length, julyExc.length, augExc.length, septExc.length, octExc.length, novExc.length, decExc.length]
        }, 
        {
            name: 'Last Exceeded',
            type: 'area',
            data: [janToAmt, febToAmt, marToAmt, aprToAmt, mayToAmt, juneToAmt, julyToAmt, augToAmt, septToAmt, octToAmt, novToAmt, decToAmt]
        },
        {
            name: 'Pending Transactions',
            type: 'area',
            data: [janPending, febPending, marPending, aprPending, mayPending, junePending, julyPending, augPending, septPending, octPending, novPending, decPending]
        }],
    chart: {
        height: 374,
        type: 'line',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        curve: 'smooth',
        dashArray: [0, 3, 0,3],
        width: [0,1, 0,1],
    },
    fill: {
        opacity: [1, 0.1, 1,0.1]
    },
    markers: {
        size: [0, 4, 0,4],
        strokeWidth: 2,
        hover: {
            size: 4,
        }
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
    grid: {
        show: true,
        xaxis: {
            lines: {
                show: true,
            }
        },
        yaxis: {
            lines: {
                show: false,
            }
        },
        padding: {
            top: 0,
            right: -2,
            bottom: 15,
            left: 10
        },
    },
    legend: {
        show: true,
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: -5,
        markers: {
            width: 9,
            height: 9,
            radius: 6,
        },
        itemMargin: {
            horizontal: 10,
            vertical: 0
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            barHeight: '70%'
        }
    },
    colors: ["#405189","#0ab39c","#FEF8EE","#F3DED2"],
    tooltip: {
    shared: true,
    y: [{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return  y.toFixed(0);
          }
          return y;
          
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return y.toFixed(0);
          }
          return y;
          
        }
      }, {
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return   "₹" + y.toFixed(2);
          }
          return y;
          
        }
      },{
        formatter: function (y) {
          if(typeof y !== "undefined") {
            return   "₹" + y.toFixed(2);
          }
          return y;
          
        }
      }]
    }};
    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        kpi: kpi,
        chart:chartData
    });
}


function getDaysInCurrentMonth(month) {
    const date = new Date();
  
    return new Date(
      date.getFullYear(),
      month,
      0
    ).getDate();
}

exports.exceededConsuptionUnits = async (req, res)=>{
    let cNorthUility = await Utility.find({zone:"North Zone",propertyType : "Commercial"});
    let commercialNorthZone = 0;
    for(let j in cNorthUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:cNorthUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                commercialNorthZone++;
            }
        }
    }
    let dNorthUility = await Utility.find({zone:"North Zone",propertyType : "Domestic"});
    let domesticNorthZone = 0;
    for(let j in dNorthUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:dNorthUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                domesticNorthZone++;
            }
        }
    }


    let cSouthUility = await Utility.find({zone:"South Zone",propertyType : "Commercial"});
    let commercialSouthZone = 0;
    for(let j in cSouthUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:cSouthUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                commercialSouthZone++;
            }
        }
    }
    let dSouthUility = await Utility.find({zone:"South Zone",propertyType : "Domestic"});
    let domesticSouthZone = 0;
    for(let j in dSouthUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:dSouthUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                domesticSouthZone++;
            }
        }
    }

    let cEastUility = await Utility.find({zone:"East Zone",propertyType : "Commercial"});
    let commercialEastZone = 0;
    for(let j in cEastUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:cEastUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                commercialEastZone++;
            }
        }
    }
    let dEastUility = await Utility.find({zone:"East Zone",propertyType : "Domestic"});
    let domesticEastZone = 0;
    for(let j in dEastUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:dEastUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                domesticEastZone++;
            }
        }
    }
    
    let cWestUility = await Utility.find({zone:"Central Zone",propertyType : "Commercial"});
    let commercialWestZone = 0;
    for(let j in cWestUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:cWestUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                commercialWestZone++;
            }
        }
    }
    let dWestUility = await Utility.find({zone:"Central Zone",propertyType : "Domestic"});
    let domesticWestZone = 0;
    for(let j in dWestUility){
        let utilityBill = await Utilitybill.find({branch:{$in:req.branches},utility:dWestUility[j]._id}).populate("utility").populate("branch");
        for(let k in utilityBill){
            if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                domesticWestZone++;
            }
        }
    }

    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        commercialEastZone: commercialEastZone,
        commercialNorthZone:commercialNorthZone,
        commercialSouthZone:commercialSouthZone,
        commercialWestZone:commercialWestZone,
        domesticEastZone: domesticEastZone,
        domesticNorthZone:domesticNorthZone,
        domesticSouthZone:domesticSouthZone,
        domesticWestZone:domesticWestZone,

    });

}

exports.getExceeded = async (req, res) => {
    let utility = await Utility.find({branch:{$in:req.branches}});
    let meters = 0;
    for(let i in utility){
        meters +=  utility[i].utilities.length;
    }
    let utilityBill = await Utilitybill.find({branch:{$in:req.branches}}).populate("utility").populate("branch");
    let exceeded = 0;
    for(let i in utilityBill){
        if(utilityBill[i].grossAmount > utilityBill[i].meter?.maximumConsumption){
            exceeded++;
        }
    }
    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        exceeded:exceeded,
        all:utilityBill.length,
        data: {
            series: [meters, exceeded],
            labels: ["All", "Exceeded"],
            chart: {
                type: "donut",
                height: 230,
            },
            plotOptions: {
                pie: {
                    offsetX: 0,
                    offsetY: 0,
                    donut: {
                        size: "90%",
                        labels: {
                            show: false,
                        }
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            stroke: {
                lineCap: "round",
                width: 0
            },
            colors: ['#0ab39c','#f06548']
          }
    });
}


exports.exceededConsuptionUnitsByBranch = async (req, res)=>{
    
    let data = [];
    let index = new Date().getMonth()+1;
    let month = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
    let utilityBill = await Utilitybill.find({branch:{$in:req.branches},$expr: { $eq: [{ $year: "$createdAt" }, (new Date().getFullYear())] },$expr: { $eq: [{ $month: "$createdAt" }, index]}})
    .populate("branch").populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    if(utilityBill.length == 0){
        data.push({month:month[(index)],total:0});
    }
    let count1 = 0;
    for(let i in utilityBill){
        if(utilityBill[i].grossAmount > utilityBill[i].meter.maximumConsumption){
            count1++;
        }
        if(i == (utilityBill.length -1)){
            data.push({month:month[index],total:count1});
        } 
    }
   
    let utilityBill2 = await Utilitybill.find({branch:{$in:req.branches},$expr: { $eq: [{ $year: "$createdAt" }, (new Date().getFullYear())] },$expr: { $eq: [{ $month: "$createdAt" }, (index-1)]}})
    .populate("branch").populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    if(utilityBill2.length == 0){
        data.push({month:month[(index-1)],total:0});
    }
    let count2 = 0;
    for(let i in utilityBill2){
        if(utilityBill2[i].grossAmount > utilityBill2[i].meter.maximumConsumption){
            count2++;
        }
        if(i == (utilityBill2.length -1)){
            data.push({month:month[(index-1)],total:count2});
        } 
    }

    let utilityBill3 = await Utilitybill.find({branch:{$in:req.branches},$expr: { $eq: [{ $year: "$createdAt" }, (new Date().getFullYear())] },$expr: { $eq: [{ $month: "$createdAt" }, (index-2)]}})
    .populate("branch").populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    if(utilityBill3.length == 0){
        data.push({month:month[(index-2)],total:0});
    }
    let count3 = 0;
    for(let i in utilityBill3){
        if(utilityBill3[i].grossAmount > utilityBill3[i].meter.maximumConsumption){
            count3++;
        }
        if(i == (utilityBill3.length -1)){
            data.push({month:month[(index-2)],total:count3});
        } 
    }

    let utilityBill4 = await Utilitybill.find({branch:{$in:req.branches},$expr: { $eq: [{ $year: "$createdAt" }, (new Date().getFullYear())] },$expr: { $eq: [{ $month: "$createdAt" }, (index-3)]}})
    .populate("branch").populate("adminApproved").populate("rejectedBy").populate("financeApproved").populate({path:"utility",model:"Utility",populate:{path:"utility",model:"UtilityMaster"}});
    if(utilityBill4.length == 0){
        data.push({month:month[(index-3)],total:0});
    }
    let count4 = 0;
    for(let i in utilityBill4){
        
        if(utilityBill4[i].grossAmount > utilityBill4[i].meter.maximumConsumption){
            count4++;
        }
        if(i == (utilityBill4.length -1)){
            data.push({month:month[(index-3)],total:count4});
        } 
    }
   
    res.status(200).send({
        status: "success",
        message: "All Transactions  retrieved",
        data: data
    });
    

}


exports.zonesDataForAdmin = async (req, res)=>{
    let data=[];
    let zones = await Branch.find({branch:{$in:req.branches}});
    var groups = _.groupBy(zones, "zone");
    var array = [];
    _.forOwn(groups, function(value, key){
        array.push(key);
    });
    
    for(let i in array){
        let utilityBill=[];
        let pendingC = 0;
        let completedC = 0;
        let exceededAmt = 0;
        let transactionC = 0;
        let branch = await Utility.find({branch:{$in:req.branches},zone:array[i]});
        for(let j in branch){
            utilityBill = await Utilitybill.find({utility:branch[j]._id});
            transactionC += utilityBill.length;
            for(k in utilityBill){
                if(utilityBill[k].adminStatus == 'Pending' && utilityBill[k].financeStatus == 'Pending'){
                    pendingC++;
                }
                if(utilityBill[k].adminStatus == 'Approved' && utilityBill[k].financeStatus == 'Approved'){
                    completedC++;
                }
                
                if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                    exceededAmt = exceededAmt + (utilityBill[k].grossAmount - utilityBill[k].meter?.maximumConsumption);
                }
            }
            
        }
        data.push({zone:array[i],transaction:transactionC,pending:pendingC,completed:completedC,exceeded:exceededAmt});
        if(i == (array.length - 1)){
            res.status(200).send({
                status: "success",
                message: "All Zones  retrieved",
                data: data
            });
        }
    }

}

exports.clustersDataForAdmin = async (req, res)=>{
    let data=[];
    let clusters = await Branch.find({branch:{$in:req.branches}});
    var groups = _.groupBy(clusters, "cluster");
    var array = [];
    _.forOwn(groups, function(value, key){
        array.push(key);
    });
    
    for(let i in array){
        let utilityBill=[];
        let pendingC = 0;
        let completedC = 0;
        let exceededAmt = 0;
        let transactionC = 0;
        let branch = await Utility.find({branch:{$in:req.branches},cluster:array[i]});
        for(let j in branch){
            utilityBill = await Utilitybill.find({utility:branch[j]._id});
            transactionC += utilityBill.length;
            for(k in utilityBill){
                if(utilityBill[k].adminStatus == 'Pending' && utilityBill[k].financeStatus == 'Pending'){
                    pendingC++;
                }
                if(utilityBill[k].adminStatus == 'Approved' && utilityBill[k].financeStatus == 'Approved'){
                    completedC++;
                }
                
                if(utilityBill[k].grossAmount > utilityBill[k].meter?.maximumConsumption){
                    exceededAmt = exceededAmt + (utilityBill[k].grossAmount - utilityBill[k].meter?.maximumConsumption);
                }
            }
            
        }
        data.push({cluster:array[i],transaction:transactionC,pending:pendingC,completed:completedC,exceeded:exceededAmt});
        if(i == (array.length - 1)){
            res.status(200).send({
                status: "success",
                message: "All Zones  retrieved",
                data: data
            });
        }
    }

}

exports.useValidation = async (req, res)=>{
    
    let users = await User.find({role:"branch"});
    for(let i = 0; i<users.length;i++){
        let branch = await Branch.find({code:users[i].code});
        await User.findByIdAndUpdate(users[i]._id,{$set:{"permissions.branch":[branch[0]._id],"branchId":branch[0]._id}})
    }
    res.send(users);

}

exports.userValidation = async (req, res)=>{
    let utility = await Utility.find({});
    for(let i = 0; i<utility.length;i++){
        let branch = await Branch.find({code:utility[i].branchCode});
        await Utility.findByIdAndUpdate(utility[i]._id,{$set:{"branch":branch[0]._id}});
    }
    res.send(utility);
}


function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}


