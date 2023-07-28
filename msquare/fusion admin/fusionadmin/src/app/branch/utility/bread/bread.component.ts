import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  @ViewChild('billChild') billChild!: ElementRef;
  breadCrumbItems!: Array<{}>;

  baseURL=environment.baseURL;
  label = 'Create Utility Bill';
  loader = false;
  action = 1;
  edit=false;

  date:any=new Date().getFullYear()+"-"+("0"+((new Date().getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date().getDate()).slice(-2);
  branch:any="";
  branchCode:any="";
  utility:any="";
  utilityMaster:any="";
  meter:any="";
  billNo:any="";
  vendorName:any="";
  billType:any="";
  invoiceDate:any="";
  fromBillDate:any="";
  toBillDate:any="";
  noOfDays:any="";
  initReading:any="";
  finalReading:any="";
  consumption:any="";
  chargesPerUnit:any="";
  totalBill:any="";
  perTotalBill:any="";
  billAmount:any="";
  lateFee:any="";
  grossAmount:any="";
  dueDate:any="";
  fundsToBeTransferred:any="";
  branchAccount:any="";
  remark:any="";
  billDocument:any=[];
  id:any="";


  utilitiesL:any=[];
  meters:any=[];

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router,
    public authS:AuthenticationService) {}

  ngOnInit(): void {
    this.branchCode = this.authS.currentUserValue.permission?.branch[0].code;
    this.branch = this.authS.currentUserValue.permission?.branch[0]._id;
    this.apiS.getAllUtilityByBranch(this.authS.currentUserValue.permission?.branch[0]._id).subscribe(res=>{
        this.utilitiesL = res.data;
    })
    
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.breadCrumbItems = [
          { label: 'Utility Bill' },
          { label: 'Create Utility Bill', active: true }
        ];
        this.label= "Create Utility Bill";
          this.titleS.setTitle("Create Utility Bill - "+this.appC.title);
      }else{
        this.edit=true;
        this.breadCrumbItems = [
          { label: 'Utility Bill' },
          { label: 'Edit Utility Bill', active: true }
        ];
        this.label= "Edit Utility Bill";
        this.titleS.setTitle("Edit Utility Bill - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleUtilityBill(editParam.id).subscribe(res=>{
          
            this.date =new Date(res.data.date).getFullYear()+"-"+("0"+((new Date(res.data.date).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.date).getDate()).slice(-2);
            this.branchCode=res.data.branch?.code;
            this.utility=res.data.utility?._id;
            this.meter = res.data.meter;
            this.billNo=res.data.billNo;
            this.vendorName=res.data.vendorName;
            this.billType=res.data.billType;
            this.invoiceDate=new Date(res.data.invoiceDate).getFullYear()+"-"+("0"+((new Date(res.data.invoiceDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.invoiceDate).getDate()).slice(-2);
            this.fromBillDate=new Date(res.data.fromBillDate).getFullYear()+"-"+("0"+((new Date(res.data.fromBillDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.fromBillDate).getDate()).slice(-2);
            this.toBillDate=new Date(res.data.toBillDate).getFullYear()+"-"+("0"+((new Date(res.data.toBillDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.toBillDate).getDate()).slice(-2);
            this.noOfDays=res.data.noOfDays;
            this.initReading=res.data.initReading;
            this.finalReading=res.data.finalReading;
            this.consumption=res.data.consumption;
            this.chargesPerUnit=res.data.chargesPerUnit;
            this.totalBill=res.data.totalBill;
            this.perTotalBill=res.data.perTotalBill;
            this.billAmount=res.data.billAmount;
            this.lateFee=res.data.lateFee;
            this.grossAmount=res.data.grossAmount;
            this.dueDate=new Date(res.data.dueDate).getFullYear()+"-"+("0"+((new Date(res.data.dueDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.dueDate).getDate()).slice(-2);
            this.fundsToBeTransferred=new Date(res.data.fundsToBeTransferred).getFullYear()+"-"+("0"+((new Date(res.data.fundsToBeTransferred).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.fundsToBeTransferred).getDate()).slice(-2);
            this.branchAccount=res.data.branchAccount;
            this.remark=res.data.remark;
            this.billDocument=res.data.billDocument;

          })
        });
      }
    });
  }

  getUtilityDetails(event:any){
    this.apiS.getSingleUtility(event).subscribe(data=>{
      this.meters = data.data.utilities;

      this.utilityMaster = data.data.utility;
      for(let i=0;i<this.meters.length;i++){
        this.meters[i].billDocument = [];
        if(this.meters[i].billType == 'Shared'){
          this.meters[i].consumption = 0;
        }
      }
    })
  }
  checkIfArrayIsUnique() 
  {
      for (var i = 0; i < this.meters.length; i++) 
      {
          for (var j = 0; j < this.meters.length; j++) 
          {
              if (i != j) 
              {
                  if (this.meters[i] == this.meters[j]) 
                  {
                      return true;
                  }
              }
          }
      }
      return false; // means there are no duplicate values.
  }

  save(){
    if(this.checkIfArrayIsUnique()){
      this.toastr.error("Duplicate Bill No. Found");
      this.loader = false;
      return;
    }

    this.loader=true;
    let verifyArray:any=[];
    let financeVerifyArray:any=[];
    for(let i=0;i<this.meters.length;i++){

      if(this.meters[i].billDocument.length == 0){
        this.toastr.error("Please upload at least one document");
        this.loader = false;
        return;
      }
      let isExceded = (this.meters[i].grossAmount > this.meters[i].maximumConsumption) ? true:false;
      this.apiS.getApprovalLevelsCalculate(this.meters[i].grossAmount,isExceded,this.utility).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
          this.loader=false;
        } else {
          verifyArray = data.data;
          financeVerifyArray.push({slab:"",role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""});
          const data1 = JSON.stringify({
            "date":this.date,
            "branch":this.branch,
            "branchCode":this.authS.currentUserValue.permission?.branch[0].code,
            "branchName":this.authS.currentUserValue.permission?.branch[0].name,
            "cluster":this.authS.currentUserValue.permission?.branch[0].cluster,
            "zone":this.authS.currentUserValue.permission?.branch[0].zone,
            "division":this.authS.currentUserValue.permission?.branch[0].division,
            "state":this.authS.currentUserValue.permission?.branch[0].state,
            "meter":this.meters[i],
            "utility":this.utility,
            "utilityMaster":this.utilityMaster,
            "billNo":this.meters[i].billNo,
            "vendorName":this.meters[i].vendorName,
            "billType":this.meters[i].billType,
            "invoiceDate":this.meters[i].invoiceDate,
            "fromBillDate":this.meters[i].fromBillDate,
            "toBillDate":this.meters[i].toBillDate,
            "noOfDays":this.meters[i].noOfDays,
            "initReading":this.meters[i].initReading,
            "finalReading":this.meters[i].finalReading,
            "consumption":this.meters[i].consumption,
            "chargesPerUnit":this.meters[i].chargesPerUnit,
            "totalBill":this.meters[i].totalBill,
            "perTotalBill":this.meters[i].perTotalBill,
            "billAmount":this.meters[i].billAmount,
            "lateFee":this.meters[i].lateFee,
            "arrear":this.meters[i].arrear,
            "verifyStatus":verifyArray,
            "fverifyStatus":financeVerifyArray,
            "grossAmount":this.meters[i].grossAmount,
            "dueDate":this.meters[i].dueDate,
            "fundsToBeTransferred":this.fundsToBeTransferred,
            "branchAccount":this.branchAccount,
            "remark":this.remark,
            "billDocument":this.meters[i].billDocument,
            "billStatus":"Submitted",
          });
          this.apiS.createUtilityBill(data1).subscribe(result => {
            if (result.status === 'error') {
              this.toastr.error(result.message);
              this.loader = false;
            } else {
              if(i == (this.meters.length -1)){
                this.toastr.success("New Record Created Successfully");
                this.loader = false;
                this.clearFilter();
                this.router.navigate(['/branch/utility']);
              }
            }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader=false;
      });
      
      
      
    }
      
   
  }

  draft(){
    

    this.loader=true;
    
    for(let i=0;i<this.meters.length;i++){
      const data1 = JSON.stringify({
        "date":this.date,
        "branch":this.branch,
        "branchCode":this.authS.currentUserValue.permission?.branch[0].code,
        "branchName":this.authS.currentUserValue.permission?.branch[0].name,
        "cluster":this.authS.currentUserValue.permission?.branch[0].cluster,
        "zone":this.authS.currentUserValue.permission?.branch[0].zone,
        "division":this.authS.currentUserValue.permission?.branch[0].division,
        "state":this.authS.currentUserValue.permission?.branch[0].state,
        "meter":this.meters[i],
        "utility":this.utility,
        "utilityMaster":this.utilityMaster,
        "billNo":this.meters[i].billNo,
        "vendorName":this.meters[i].vendorName,
        "billType":this.meters[i].billType,
        "invoiceDate":this.meters[i].invoiceDate,
        "fromBillDate":this.meters[i].fromBillDate,
        "toBillDate":this.meters[i].toBillDate,
        "noOfDays":this.meters[i].noOfDays,
        "initReading":this.meters[i].initReading,
        "finalReading":this.meters[i].finalReading,
        "consumption":this.meters[i].consumption,
        "chargesPerUnit":this.meters[i].chargesPerUnit,
        "totalBill":this.meters[i].totalBill,
        "perTotalBill":this.meters[i].perTotalBill,
        "billAmount":this.meters[i].billAmount,
        "lateFee":this.meters[i].lateFee,
        "arrear":this.meters[i].arrear,
        "grossAmount":this.meters[i].grossAmount,
        "dueDate":this.meters[i].dueDate,
        "fundsToBeTransferred":this.fundsToBeTransferred,
        "branchAccount":this.branchAccount,
        "remark":this.remark,
        "billDocument":this.meters[i].billDocument,
        "billStatus":"Draft",
      });
      this.apiS.createUtilityBill(data1).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          if(i == (this.meters.length -1)){
            this.toastr.success("Utility Saved Successfully");
            this.loader = false;
            this.clearFilter();
            this.router.navigate(['/branch/utility']);
          }
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
      
      
      
    }
      
   
  }


  getDate(i:any){
    if(this.meters[i].fromBillDate != '' && this.meters[i].toBillDate != ''){
      let date1:any;
      let date2:any;
      date1 = new Date((new Date(this.meters[i].fromBillDate).getMonth()+1)+"/"+new Date(this.meters[i].fromBillDate).getDate()+"/"+new Date(this.meters[i].fromBillDate).getFullYear());
      date2 = new Date((new Date(this.meters[i].toBillDate).getMonth()+1)+"/"+new Date(this.meters[i].toBillDate).getDate()+"/"+new Date(this.meters[i].toBillDate).getFullYear());
      let diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      this.meters[i].noOfDays = diffDays +1;
    }
   
  }

  getConsumptionInitial(i:any,event:any){
    this.meters[i].consumption = this.meters[i].finalReading - event.target.value;
    this.meters[i].billAmount = this.meters[i].consumption * this.meters[i].chargesPerUnit;
    this.meters[i].grossAmount = ((this.meters[i].billAmount*1) + (this.meters[i].lateFee*1) + (this.meters[i].arrear*1)).toFixed(2);
  }

  getConsumptionFinal(i:any,event:any){
    this.meters[i].consumption = event.target.value - this.meters[i].initReading;
    this.meters[i].billAmount = this.meters[i].consumption * this.meters[i].chargesPerUnit;
    this.meters[i].grossAmount = ((this.meters[i].billAmount*1) + (this.meters[i].lateFee*1) + (this.meters[i].arrear*1)).toFixed(2);
  }

  getBillAmt(i:any,event:any){
    this.meters[i].billAmount = this.meters[i].consumption * event.target.value;
    this.meters[i].grossAmount = ((this.meters[i].billAmount*1) + (this.meters[i].lateFee*1) + (this.meters[i].arrear*1)).toFixed(2);
  }

  getGrossBill(i:any, event:any){
    this.meters[i].grossAmount = (event.target.value+this.meters[i].lateFee+this.meters[i].arrear).toFixed(2);
  }

  getGrossLate(i:any, event:any){
    this.meters[i].grossAmount = ((this.meters[i].billAmount *1)+(event.target.value*1)+(this.meters[i].arrear*1)).toFixed(2);
  }

  getGrossArrear(i:any, event:any){
    this.meters[i].grossAmount = ((this.meters[i].billAmount *1)+(this.meters[i].lateFee*1)+(event.target.value*1)).toFixed(2);
  }

  getTotalBill(i:any,event:any){
    this.meters[i].billAmount = (event.target.value * (this.meters[i].perTotalBill/100)).toFixed(2);
    this.meters[i].grossAmount = ((this.meters[i].billAmount*1) + (this.meters[i].lateFee*1) + (this.meters[i].arrear*1)).toFixed(2);
  }

  getPerTotalBill(i:any,event:any){
    this.meters[i].billAmount = (this.meters[i].totalBill * (event.target.value/100)).toFixed(2);
    this.meters[i].grossAmount = ((this.meters[i].billAmount*1) + (this.meters[i].lateFee*1) + (this.meters[i].arrear*1)).toFixed(2);
  }

  uploadBillDocument(event: any,i:any): void {
    if (event.target.files) {
      for(let j=0;j<event.target.files.length;j++){
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[j]);
        if (event.target.files[j].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.billChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.meters[i].billDocument.push(res.data.url);
            if(j == (event.target.files.length - 1)){
              this.billChild.nativeElement.value = "";
            }
          }
        });
      }
        
      
    }
  }

  clearFilter(){
    this.date="";
    this.branch="";
    this.branchCode="";
    this.utility="";
    this.billNo="";
    this.vendorName="";
    this.billType="";
    this.invoiceDate="";
    this.fromBillDate="";
    this.toBillDate="";
    this.noOfDays="";
    this.consumption="";
    this.billAmount="";
    this.lateFee="";
    this.grossAmount="";
    this.initReading="";
    this.finalReading="";
    this.chargesPerUnit="";
    this.totalBill="";
    this.perTotalBill="";
    this.dueDate="";
    this.fundsToBeTransferred="";
    this.branchAccount="";
    this.remark="";
    this.billDocument=[];
  }

  deleteBillDoc(i:any,ind:any){
    this.meters[i].billDocument.splice(ind,1);
  }

}
