const Agenda = require("agenda");
const db = require("./app/models");

const {
    rent: Rent,
    rentbill: Rentbill,
    rentTemporary:RentTemporary,
    utility:Utility,
    utilitybill:Utilitybill,
    utilityTemporary:UtilityTemporary
} = db;


const agenda = new Agenda().mongo(db.mongoose.connection);

agenda.define("checkRentRaised", async (job) => {
    console.log("Rent Job Started");
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let tommorrow = getDaysInMonth(date.getFullYear(),(date.getMonth() + 1));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (tommorrow)).slice(-2));
    let rent = await Rent.find({});
    for(let i in rent){
        let rentbill = await Rentbill.find({rent:rent[i]._id,createdAt: {$gte: currentDate,$lte: nextDate}}).populate("rent").populate("adminApproved").populate("rejectedBy").populate("financeApproved");
        if(rentbill.length == 0){
            let rentTemporary = await RentTemporary.find({rent:rent[i]._id,createdAt: {$gte: currentDate,$lte: nextDate}}).populate("rent").populate("adminConfirmed").populate("financeConfirmed");
            if(rentTemporary.length == 0){
                const data = new RentTemporary({
                    "rent" : rent[i]._id,
                    "branch":rent[i].branch
                });
                data.save();
            }
        }
        if(i == (rent.length -1)){
            console.log("Rent Job Complted");
        }
    }
});

agenda.define("checkUtlityRaised", async (job) => {
    console.log("Utility Job Started");
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (date.getDate()+1)).slice(-2));
    
    
    let utility = await Utility.find({});
    for(let i in utility){
        for(let j in utility[i].utilities){
            const date1 = new Date();
            var pastdate = new Date();
            pastdate.setDate(date1.getDate() - utility[i].utilities[j].utilityCycle);
            let nextDate = new Date(pastdate.getFullYear() + "-" + ("0" + (pastdate.getMonth() + 1)).slice(-2) + "-" + ("0" + (pastdate.getDate())).slice(-2));
            let utilitybill = await Utilitybill.find({utility:utility[i]._id,"meter.meterId":utility[i].utilities[j].meterId,invoiceDate: {$gte: nextDate,$lte: currentDate}}).populate("utility").populate("adminApproved").populate("rejectedBy").populate("financeApproved"); 
            
            if(utilitybill.length == 0){
                let utilityTemporary = await UtilityTemporary.find({utility:utility[i]._id,"meter.meterId":utility[i].utilities[j].meterId,createdAt: {$gte: nextDate,$lte: currentDate}}).populate("utility").populate("adminConfirmed");
                
                if(utilityTemporary.length == 0){
                    const data = new UtilityTemporary({
                        "utility" : utility[i]._id,
                        "branch":utility[i].branch,
                        "meter":utility[i].utilities[j],
                    });
                    data.save();
                }
            }
            
        }
        if(i == (utility.length -1)){
            console.log("Utility Job Complted");
        }
    }
});

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

agenda.start();

agenda.every('0 0 * * *', "checkUtlityRaised");
agenda.every('0 0 20 * *', "checkRentRaised", {}, 'Asia/Kolkata');
