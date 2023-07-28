import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  pageTitle = "MT Profile";

  baseURL=environment.baseURL;
  label = 'MT Profile';
  loader = false;
  action = "";
  edit=false;

  id="";
  bankName:any="";
  loanName:any="";
  trancheName:any="";
  shortCode:any="";
  shortCodeLenderWise:any="";
  actualNo:any="";
  moratoriumStatusPhase1:any="";
  moratoriumStatusPhase2:any="";
  amountSanctioned:any=0;
  sanctionDate:any="";
  disbursementDate:any="";
  amountDisbursed:any=0;
  processingFee:any=0;
  fdr:any=0;
  margin:any=0;
  noOfMonthsMoratorium:any=0;
  roi:any=0;
  tenure:any=0;
  repaymentSchedule:any="";
  emiStartDate:any="";
  otherExp:any=0;
  intOnFdr:any=0;
  fundRaisedDuringFY:any=0;
  baseRate:any="";
  roiGross:any=0;
  roiNet:any=0;
  anyChangeInInterestDuringYear:any="";
  dateOfChangeOfInterest:any="";
  newRate:any=0;
  currentRoi:any=0;
  roiType:any="";
  pg:any="";
  rating:any="";
  availedAmount:any=0;
  termsOfTextRepayment1_P:any="";
  termsOfTextRepayment2_P:any="";
  termsOfTextRepayment1_I:any="";
  termsOfTextRepayment2_I:any="";
  typeOfLender1:any="";
  typeOfLender2:any="";
  natureOfInstrument1:any="";
  natureOfInstrument2:any="";
  natureOfInstrument3:any="";
  typeOfLender3:any="";
  typeOfFacility:any="";
  paymentFrequency:any="";
  originalMaturityOfLoan:any="";
  interestRate:any=0;
  sanctionLetter:any="";
  maturityDate:any="";
  thDate:any="";
  compounding:any="";
  changeEffectiveDate:any="";
  legalFee:any=0;
  documentationCharges:any=0;
  stampDuty:any=0;
  trusteeFee:any=0;
  arrangerFee:any=0;
  nsdl:any=0;
  linkinktimeRta:any=0;
  ratingFee:any=0;
  listing:any=0;
  debentureStamping:any=0;
  otherFee:any=0;
  stempDown:any="";
  step:any="";
  applicableTaxes:any=0;
  flag:any="";

  constructor(public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router) {}

  ngOnInit(): void {

    this.breadCrumbItems = [
      // { label: 'Utility' },
      // { label: 'Create Utility', active: true }
    ];
    
    this.titleS.setTitle("MT Profile - "+this.appC.title);
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.action = 'create';
        this.label= "Create MT Profile";
        this.breadCrumbItems = [
          { label: 'MT Profiles' },
          { label: 'Create MT Profile', active: true }
        ];
    
          this.titleS.setTitle("Create MT Profile - "+this.appC.title);
      }else{
        this.action = 'view';
        this.label= "View MT Profile";
        this.edit=true;
        this.breadCrumbItems = [
          { label: 'MT Profiles' },
          { label: 'Edit MT Profile', active: true }
        ];
          this.titleS.setTitle("Edit MT Profile - "+this.appC.title);
          this.route.queryParams.subscribe((editParam:any)=>{
            this.apiS.getSingleMT(editParam.id).subscribe(res=>{
              this.bankName=res.data.bankName;
              this.loanName=res.data.loanName;
              this.trancheName=res.data.trancheName;
              this.shortCode=res.data.shortCode;
              this.shortCodeLenderWise=res.data.shortCodeLenderWise;
              this.actualNo=res.data.actualNo;
              this.moratoriumStatusPhase1=res.data.moratoriumStatusPhase1;
              this.moratoriumStatusPhase2=res.data.moratoriumStatusPhase2;
              this.amountSanctioned=res.data.amountSanctioned;
              this.sanctionDate=res.data.sanctionDate;
              this.disbursementDate=res.data.disbursementDate;
              this.amountDisbursed=res.data.amountDisbursed;
              this.processingFee=res.data.processingFee;
              this.fdr=res.data.fdr;
              this.margin=res.data.margin;
              this.noOfMonthsMoratorium=res.data.noOfMonthsMoratorium;
              this.roi=res.data.roi;
              this.tenure=res.data.tenure;
              this.repaymentSchedule=res.data.repaymentSchedule;
              this.emiStartDate=res.data.emiStartDate;
              this.otherExp=res.data.otherExp;
              this.intOnFdr=res.data.intOnFdr;
              this.fundRaisedDuringFY=res.data.fundRaisedDuringFY;
              this.baseRate=res.data.baseRate;
              this.roiGross=res.data.roiGross;
              this.roiNet=res.data.roiNet;
              this.anyChangeInInterestDuringYear=res.data.anyChangeInInterestDuringYear;
              this.dateOfChangeOfInterest=res.data.dateOfChangeOfInterest;
              this.newRate=res.data.newRate;
              this.currentRoi=res.data.currentRoi;
              this.roiType=res.data.roiType;
              this.pg=res.data.pg;
              this.rating=res.data.rating;
              this.availedAmount=res.data.availedAmount;
              this.termsOfTextRepayment1_P=res.data.termsOfTextRepayment1_P;
              this.termsOfTextRepayment2_P=res.data.termsOfTextRepayment2_P;
              this.termsOfTextRepayment1_I=res.data.termsOfTextRepayment1_I;
              this.termsOfTextRepayment2_I=res.data.termsOfTextRepayment2_I;
              this.typeOfLender1=res.data.typeOfLender1;
              this.typeOfLender2=res.data.typeOfLender2;
              this.natureOfInstrument1=res.data.natureOfInstrument1;
              this.natureOfInstrument2=res.data.natureOfInstrument2;
              this.natureOfInstrument3=res.data.natureOfInstrument3;
              this.typeOfLender3=res.data.typeOfLender3;
              this.typeOfFacility=res.data.typeOfFacility;
              this.paymentFrequency=res.data.paymentFrequency;
              this.originalMaturityOfLoan=res.data.originalMaturityOfLoan;
              this.interestRate=res.data.interestRate;
              this.sanctionLetter=res.data.sanctionLetter;
              this.maturityDate=res.data.maturityDate;
              this.thDate=res.data.thDate;
              this.compounding=res.data.compounding;
              this.changeEffectiveDate=res.data.changeEffectiveDate;
              this.legalFee=res.data.legalFee;
              this.documentationCharges=res.data.documentationCharges;
              this.stampDuty=res.data.stampDuty;
              this.trusteeFee=res.data.trusteeFee;
              this.arrangerFee=res.data.arrangerFee;
              this.nsdl=res.data.nsdl;
              this.linkinktimeRta=res.data.linkinktimeRta;
              this.ratingFee=res.data.ratingFee;
              this.listing=res.data.listing;
              this.debentureStamping=res.data.debentureStamping;
              this.otherFee=res.data.otherFee;
              this.stempDown=res.data.stempDown;
              this.step=res.data.step;
              this.applicableTaxes=res.data.applicableTaxes;
              this.flag=res.data.flag;
            })
          });
      }
    }); 
  }



  save(){
    this.loader=true;
      const data = JSON.stringify({
        "bankName":this.bankName,
        "loanName":this.loanName,
        "trancheName":this.trancheName,
        "shortCode":this.shortCode,
        "shortCodeLenderWise":this.shortCodeLenderWise,
        "actualNo":this.actualNo,
        "moratoriumStatusPhase1":this.moratoriumStatusPhase1,
        "moratoriumStatusPhase2":this.moratoriumStatusPhase2,
        "amountSanctioned":this.amountSanctioned,
        "sanctionDate":this.sanctionDate,
        "disbursementDate":this.disbursementDate,
        "amountDisbursed":this.amountDisbursed,
        "processingFee":this.processingFee,
        "fdr":this.fdr,
        "margin":this.margin,
        "noOfMonthsMoratorium":this.noOfMonthsMoratorium,
        "roi":this.roi,
        "tenure":this.tenure,
        "repaymentSchedule":this.repaymentSchedule,
        "emiStartDate":this.emiStartDate,
        "otherExp":this.otherExp,
        "intOnFdr":this.intOnFdr,
        "fundRaisedDuringFY":this.fundRaisedDuringFY,
        "baseRate":this.baseRate,
        "roiGross":this.roiGross,
        "roiNet":this.roiNet,
        "anyChangeInInterestDuringYear":this.anyChangeInInterestDuringYear,
        "dateOfChangeOfInterest":this.dateOfChangeOfInterest,
        "newRate":this.newRate,
        "currentRoi":this.currentRoi,
        "roiType":this.roiType,
        "pg":this.pg,
        "rating":this.rating,
        "availedAmount":this.availedAmount,
        "termsOfTextRepayment1_P":this.termsOfTextRepayment1_P,
        "termsOfTextRepayment2_P":this.termsOfTextRepayment2_P,
        "termsOfTextRepayment1_I":this.termsOfTextRepayment1_I,
        "termsOfTextRepayment2_I":this.termsOfTextRepayment2_I,
        "typeOfLender1":this.typeOfLender1,
        "typeOfLender2":this.typeOfLender2,
        "natureOfInstrument1":this.natureOfInstrument1,
        "natureOfInstrument2":this.natureOfInstrument2,
        "natureOfInstrument3":this.natureOfInstrument3,
        "typeOfLender3":this.typeOfLender3,
        "typeOfFacility":this.typeOfFacility,
        "paymentFrequency":this.paymentFrequency,
        "originalMaturityOfLoan":this.originalMaturityOfLoan,
        "interestRate":this.interestRate,
        "sanctionLetter":this.sanctionLetter,
        "maturityDate":this.maturityDate,
        "thDate":this.thDate,
        "compounding":this.compounding,
        "changeEffectiveDate":this.changeEffectiveDate,
        "legalFee":this.legalFee,
        "documentationCharges":this.documentationCharges,
        "stampDuty":this.stampDuty,
        "trusteeFee":this.trusteeFee,
        "arrangerFee":this.arrangerFee,
        "nsdl":this.nsdl,
        "linkinktimeRta":this.linkinktimeRta,
        "ratingFee":this.ratingFee,
        "listing":this.listing,
        "debentureStamping":this.debentureStamping,
        "otherFee":this.otherFee,
        "stempDown":this.stempDown,
        "step":this.step,
        "applicableTaxes":this.applicableTaxes,
        "flag":this.flag,
      });
      this.apiS.createMT(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("New Record Created Successfully");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/dashboard']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    
    // if(this.edit){
    //   const data = JSON.stringify({
    //     "premisesType":this.premisesType,
    //     "propertyType":this.propertyType,
    //     "date":this.date,
    //     "branchCode":this.branchCode,
    //     "branchName":this.branchName,
    //     "tdsAmount":this.tdsAmount,
    //     "tdsCertificate":this.tdsCertificate,
    //     "cluster":this.cluster,
    //     "utilities":this.items,
    //     "address":this.address,
    //     "state":this.state,
    //     "city":this.city,
    //     "pincode":this.pincode,
    //     "zone":this.zone,
    //     "branch":this.branch,
    //     "utilityCycle":this.utilityCycle,
    //     "utilityStartDate":this.utilityStartDate,
    //     "status":this.status
    //   });
    //   this.apiS.updateUtility(data,this.id).subscribe(result => {
    //     if (result.status === 'error') {
    //       this.toastr.error(result.message);
    //       this.loader = false;
    //     } else {
    //       for(let i=0;i<this.items.length;i++){
    //         const uData= JSON.stringify({
    //           "meterId":this.items[i].meterId,
    //           "name":this.items[i].name,
    //           "initialReading":this.items[i].initialReading,
    //           "allowedConsumption":this.items[i].allowedConsumption,
    //           "maximumConsumption":this.items[i].maximumConsumption,
    //         })
    //         this.apiS.updateMeter(uData,this.items[i]._id).subscribe();
    //         if(i == (this.items.length-1)){
    //           this.toastr.success("New Record Updated Successfully");
    //           this.loader = false;
    //         }
    //       }
    //       // this.toastr.success("New Record Updated Successfully");
    //       // this.loader = false;
    //     }
    //   },error=>{
    //     this.toastr.error(error.message);
    //     this.loader = false;
    //   });
    // }else{
    //   const data = JSON.stringify({
    //     "premisesType":this.premisesType,
    //     "propertyType":this.propertyType,
    //     "date":this.date,
    //     "branch":this.branch,
    //     "branchCode":this.branchCode,
    //     "branchName":this.branchName,
    //     "tdsAmount":this.tdsAmount,
    //     "tdsCertificate":this.tdsCertificate,
    //     "cluster":this.cluster,
    //     "utilities":this.items,
    //     "address":this.address,
    //     "state":this.state,
    //     "city":this.city,
    //     "pincode":this.pincode,
    //     "zone":this.zone,
    //     "utilityCycle":this.utilityCycle,
    //     "utilityStartDate":this.utilityStartDate,
    //     "status":this.status
    //   });
    //   this.apiS.createUtility(data).subscribe(result => {
    //     if (result.status === 'error') {
    //       this.toastr.error(result.message);
    //       this.loader = false;
    //     } else {
    //       const bData= JSON.stringify({
    //         "isUtility":true
    //       })
    //       this.apiS.updateBranch(bData,this.branch).subscribe(uResult => {
    //         if (uResult.status === 'error') {
    //           this.toastr.error(uResult.message);
    //           this.loader = false;
    //         } else {
    //           for(let i=0;i<this.items.length;i++){
    //             const uData= JSON.stringify({
    //               "meterId":this.items[i].meterId,
    //               "name":this.items[i].name,
    //               "initialReading":this.items[i].initialReading,
    //               "allowedConsumption":this.items[i].allowedConsumption,
    //               "maximumConsumption":this.items[i].maximumConsumption,
    //               "utility":result.data._id,
    //             })
    //             this.apiS.createMeter(uData).subscribe();
    //             if(i == (this.items.length-1)){
    //               this.toastr.success("New Record Created Successfully");
    //               this.loader = false;
    //               this.clearFilter();
    //               this.router.navigate(['/admin/masters/utility']);
    //             }
    //           }
    //         }
    //       },error=>{
    //         this.toastr.error(error.message);
    //         this.loader = false;
    //       });
    //     }
    //   },error=>{
    //     this.toastr.error(error.message);
    //     this.loader = false;
    //   });
    // }
   
  }

  clearFilter(){
    this.bankName = "";
    this.loanName = "";
    this.trancheName = "";
    this.shortCode = "";
    this.shortCodeLenderWise = "";
    this.actualNo = "";
    this.moratoriumStatusPhase1 = "";
    this.moratoriumStatusPhase2 = "";
    this.amountSanctioned = 0;
    this.sanctionDate = "";
    this.disbursementDate = "";
    this.amountDisbursed = 0;
    this.processingFee = 0;
    this.fdr = 0;
    this.margin = 0;
    this.noOfMonthsMoratorium = 0;
    this.roi = 0;
    this.tenure = 0;
    this.repaymentSchedule = "";
    this.emiStartDate = "";
    this.otherExp = 0;
    this.intOnFdr = 0;
    this.fundRaisedDuringFY = 0;
    this.baseRate = "";
    this.roiGross = 0;
    this.roiNet = 0;
    this.anyChangeInInterestDuringYear = "";
    this.dateOfChangeOfInterest = "";
    this.newRate = 0;
    this.currentRoi = 0;
    this.roiType = "";
    this.pg = "";
    this.rating = "";
    this.availedAmount = 0;
    this.termsOfTextRepayment1_P = "";
    this.termsOfTextRepayment2_P = "";
    this.termsOfTextRepayment1_I = "";
    this.termsOfTextRepayment2_I = "";
    this.typeOfLender1 = "";
    this.typeOfLender2 = "";
    this.natureOfInstrument1 = "";
    this.natureOfInstrument2 = "";
    this.natureOfInstrument3 = "";
    this.typeOfLender3 = "";
    this.typeOfFacility = "";
    this.paymentFrequency = "";
    this.originalMaturityOfLoan = "";
    this.interestRate = 0;
    this.sanctionLetter = "";
    this.maturityDate = "";
    this.thDate = "";
    this.compounding = "";
    this.changeEffectiveDate = "";
    this.legalFee = 0;
    this.documentationCharges = 0;
    this.stampDuty = 0;
    this.trusteeFee = 0;
    this.arrangerFee = 0;
    this.nsdl = 0;
    this.linkinktimeRta = 0;
    this.ratingFee = 0;
    this.listing = 0;
    this.debentureStamping = 0;
    this.otherFee = 0;
    this.stempDown = "";
    this.step = "";
    this.applicableTaxes = 0;
    this.flag = "";
  }
}
