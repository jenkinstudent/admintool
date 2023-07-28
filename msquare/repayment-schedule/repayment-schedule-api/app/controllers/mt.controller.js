const db = require("../models");
const {
    mt: MT,
} = db;
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { json2csvAsync } = require('json-2-csv');
// const s3Zip = require('s3-zip')
// const XmlStream = require('xml-stream')
var S3Zipper = require ('aws-s3-zipper');
const child_process = require('child_process');
var forAsync = require('for-async');  // Common JS, or

//Dev Credentials
// AWS.config.update({
//     accessKeyId: "AKIA4VQK4CSQVS6W7VUU",
//     secretAccessKey: "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"
// });

// FM Credentials
AWS.config.update({
    accessKeyId: "AKIAWXZ7SBLBHQN65RP4",
    secretAccessKey: "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"
});

var s3 = new AWS.S3();
var filePath = "./upload/rs_input.csv";


var config ={
    accessKeyId: "AKIAWXZ7SBLBHQN65RP4",
    secretAccessKey: "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",
    region: "ap-south-1",
    bucket: 'fusion-mt-profile-report'
};
var zipper = new S3Zipper(config);


const mongooseErrorHandler = require('mongoose-validation-error-message-handler');

const fields = ['bankName',
'loanName',
'trancheName',
'shortCode',
'shortCodeLenderWise',
'actualNo',
'moratoriumStatusPhase1',
'moratoriumStatusPhase2',
'amountSanctioned',
'sanctionDate',
'disbursementDate',
'amountDisbursed',
'processingFee',
'fdr',
'margin',
'noOfMonthsMoratorium',
'roi',
'tenure',
'repaymentSchedule',
'emiStartDate',
'otherExp',
'intOnFdr',
'fundRaisedDuringFY',
'baseRate',
'roiGross',
'roiNet',
'anyChangeInInterestDuringYear',
'dateOfChangeOfInterest',
'newRate',
'currentRoi',
'roiType',
'pg',
'rating',
'availedAmount',
'termsOfTextRepayment1_P',
'termsOfTextRepayment2_P',
'termsOfTextRepayment1_I',
'termsOfTextRepayment2_I',
'typeOfLender1',
'typeOfLender2',
'natureOfInstrument1',
'natureOfInstrument2',
'natureOfInstrument3',
'typeOfLender3',
'typeOfFacility',
'paymentFrequency',
'originalMaturityOfLoan',
'interestRate',
'sanctionLetter',
'maturityDate',
'thDate',
'compounding',
'changeEffectiveDate',
'legalFee',
'documentationCharges',
'stampDuty',
'trusteeFee',
'arrangerFee',
'nsdl',
'linkinktimeRta',
'ratingFee',
'listing',
'debentureStamping',
'otherFee',
'stempDown',
'step',
'applicableTaxes',
'flag']


exports.create = (req, res) => {
    const mt = new MT(req.body);

    mt.save(async (err, data) => {
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

        let mt = await MT.find({}).sort({createdAt:-1}).select("-_id -__v -createdAt -updatedAt").lean();
        console.log(mt);
        // TODO Set condition
        for(let i in mt){
            mt[i].sanctionDate = ("0"+new Date(mt[i].sanctionDate).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].sanctionDate).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].sanctionDate).getFullYear();
            mt[i].disbursementDate = ("0"+new Date(mt[i].disbursementDate).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].disbursementDate).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].disbursementDate).getFullYear();
            mt[i].emiStartDate = ("0"+new Date(mt[i].emiStartDate).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].emiStartDate).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].emiStartDate).getFullYear();
            mt[i].dateOfChangeOfInterest = ("0"+new Date(mt[i].dateOfChangeOfInterest).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].dateOfChangeOfInterest).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].dateOfChangeOfInterest).getFullYear();
            mt[i].maturityDate = ("0"+new Date(mt[i].maturityDate).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].maturityDate).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].maturityDate).getFullYear();
            mt[i].thDate = ("0"+new Date(mt[i].thDate).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].thDate).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].thDate).getFullYear();
            mt[i].changeEffectiveDate = ("0"+new Date(mt[i].changeEffectiveDate).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].changeEffectiveDate).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].changeEffectiveDate).getFullYear();
            mt[i].sanctionLetter = ("0"+new Date(mt[i].sanctionLetter).getDate()).slice(-2) +"-"+("0"+(new Date(mt[i].sanctionLetter).getMonth() + 1)).slice(-2)+"-"+new Date(mt[i].sanctionLetter).getFullYear();
            console.log(mt[i]);
        }
        const csv = await json2csvAsync(mt);

        
        await fs.writeFile('./upload/rs_input.csv', csv,'utf8', function(err) {
            if (err) throw err;
            console.log('rs_input file saved');
        });
        
        var params = {
            Bucket: 'fusion-daily-data-dumps',
            Body : fs.createReadStream(filePath),
            Key : "RS_report_input/"+path.basename(filePath)
        };
        
        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                console.log("Error", err);
            }
        
            //success
            if (data) {
                console.log("Uploaded in:", data.Location);
            }
        });


        res.status(200).send({
            status: 'success',
            message: "MT created successfully!"
        });
    });
};

exports.get = async (req, res) => {
    let mt = await MT.find({}).sort({createdAt:-1});
    res.status(200).send({
        status: "success",
        message: "All MT retrieved",
        data: mt
    });
}

exports.single = async (req, res) => {
    let mt = await MT.findById(req.params.id);
    res.status(200).send({
        status: "success",
        message: "Single MT retrieved",
        data: mt
    });
}

exports.update = async (req, res) => {
    console.log(req.body)
    MT.findByIdAndUpdate(req.params.id,{$set:req.body}, (err, data) => {
        if (err) {
            res.status(500).send({
                error: {
                    status: "error",
                    message: err
                }
            });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "MT successfully Updated",
        });
    });
}

exports.delete = async (req, res) => {
    MT.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                error: {
                    status: "error",
                    message: err
                }
            });
            return;
        }

        res.status(200).send({
            status: "success",
            message: "MT successfully Deleted",
        });
    });
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function  wholePromise(paramDate,fullParentFolderPath){
    return new Promise(function(wholeResolve, wholeReject) {
        console.log("Whole");

        
            
            let date = new Date(paramDate).getFullYear()+"-"+("0"+((new Date(paramDate).getMonth())+1)).slice(-2)+"-"+("0"+new Date(paramDate).getDate()).slice(-2);
            
            let aws_I_File = "MT_PROFILE_I_REPORT/"+date;
            let aws_P_File = "MT_PROFILE_P_REPORT/"+date;
            let aws_PI_File = "MT_PROFILE_PI_REPORT/"+date;
            
    
            let promise1 = new Promise(function(aws_I_Resolve, aws_I_Reject) {
                var file = fs.createWriteStream(fullParentFolderPath+'/'+aws_I_File+'.csv');
                
                new AWS.S3().getObject({ Bucket: "fusion-mt-profile-report", Key: aws_I_File+"/MT_PROFILE_I_REPORT.csv" }).createReadStream().on("error",(error)=>{
                    fs.unlink(fullParentFolderPath+'/'+aws_I_File+'.csv',(err)=>{
                        if(err){
                            console.log(err);
                        }
                    })
                    aws_I_Resolve();
                }).on("end",()=>{aws_I_Resolve();}).pipe(file);


            });
            promise1.then(()=>{
                let promise2 =  new Promise(function(aws_P_Resolve, aws_P_Reject) {
                    var file = fs.createWriteStream(fullParentFolderPath+'/'+aws_P_File+'.csv');
                    
                    new AWS.S3().getObject({ Bucket: "fusion-mt-profile-report", Key: aws_P_File+"/MT_PROFILE_P_REPORT.csv" }).createReadStream().on("error",(error)=>{
                        fs.unlink(fullParentFolderPath+'/'+aws_P_File+'.csv',(err)=>{
                            if(err){
                                console.log(err);
                            }
                        })
                        aws_P_Resolve();
                    }).on("end",()=>{aws_P_Resolve();}).pipe(file);
                });

                promise2.then(()=>{
                    let promise3 = new Promise(function(aws_PI_Resolve, aws_PI_Reject) {
                        var file = fs.createWriteStream(fullParentFolderPath+'/'+aws_PI_File+'.csv');
                        
                        new AWS.S3().getObject({ Bucket: "fusion-mt-profile-report", Key: aws_PI_File+"/MT_PROFILE_PI_REPORT.csv" }).createReadStream().on("error",(error)=>{
                            fs.unlink(fullParentFolderPath+'/'+aws_PI_File+'.csv',(err)=>{
                                if(err){
                                    console.log(err);
                                }
                            })
                            aws_PI_Resolve();
                        }).on("end",()=>{aws_PI_Resolve();}).pipe(file);
                    });

                    promise3.then(()=>{
                        wholeResolve();
                    })
                });



            });
 
        });
}
exports.downloadFile = async (req, res) => {
    
    let dirName = './upload'
    let parentFolder = ""+Date.now();
    let fullParentFolderPath = dirName+'/'+parentFolder;
    
    await fs.promises.mkdir(path.join(dirName+'', parentFolder), (err) => {
        if (err) {
            return console.error(err);
        }
        

    });

    await fs.promises.mkdir(path.join(fullParentFolderPath, 'MT_PROFILE_I_REPORT'), (err) => {
        if (err) {
            return console.error(err);
        }
        
    });

    await fs.promises.mkdir(path.join(fullParentFolderPath, 'MT_PROFILE_P_REPORT'), (err) => {
        if (err) {
            return console.error(err);
        }
        
    });

    await fs.promises.mkdir(path.join(fullParentFolderPath, 'MT_PROFILE_PI_REPORT'), (err) => {
        if (err) {
            return console.error(err);
        }
        
    });

    const date1 = new Date(req.body.date1);
    const date2 = new Date(req.body.date2);

    let dateArray = getDates(date1,date2);
   
    console.log("Start");
    
    forAsync(dateArray, async function(item, i){
        await wholePromise(dateArray[i],fullParentFolderPath);
        if(i == (dateArray.length - 1)){
            console.log("End");
            child_process.execSync('zip -r '+parentFolder+' *', {cwd: fullParentFolderPath});
            setTimeout(()=>{
                res.status(200).send({status:"success",data:parentFolder});
            },1000)
        }
    });
 
}

exports.download = (req, res, next) => {
    try{
        res.setHeader('Content-Disposition', 'attachment;filename="'+path.join(__dirname, '../../upload/'+req.params.file+'/'+req.params.file+'.zip'));
        res.status(200).sendFile(path.join(__dirname, '../../upload/'+req.params.file+'/'+req.params.file+'.zip'));
    }catch(error){
        res.status(500).send({ status:"error", message: "File is Missing" });
    }
}

exports.downloadInput = (req, res, next) => {
    try{
        res.setHeader('Content-Disposition', 'attachment;filename="'+path.join(__dirname, '../../upload/rs_input.csv'));
        res.status(200).sendFile(path.join(__dirname, '../../upload/rs_input.csv'));
    }catch(error){
        res.status(500).send({ status:"error", message: "File is Missing" });
    }
}
