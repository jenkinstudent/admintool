import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raised',
  templateUrl: './raised.component.html',
  styleUrls: ['./raised.component.scss']
})
export class RaisedComponent implements OnInit {

  @ViewChild('billChild') billChild!:ElementRef;

  breadCrumbItems!: Array<{}>;
  id="";
  label="";
  amt=0;
  item:any=[];

  action="";

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
  billDocument:any=[];
  status:any="";
  arrear:any='';
  disbursementBranchAcc:any="";
  fundsToBeTransferred:any="";
  remarks:any="";
  

  loader=false;

  baseURL=environment.baseURL;
  constructor(public _location:Location, public titleS:Title,public appC:AppComponent,public route:ActivatedRoute,public apiS:ApiService,
    public toastr:ToastrService,public authS:AuthenticationService) { }

    ngOnInit(): void {
      this.titleS.setTitle("Raise a Utility - "+this.appC.title);
      this.label = "Raise a Utility";
    this.breadCrumbItems = [
      { label: 'Utility' },
      { label: 'Raise' , active: true }
    ];
      this.route.params.subscribe((data:any)=>{
        this.id= data.id;
        this.apiS.getSingleUtilityTemporary(this.id).subscribe(data=>{

          this.item = data.data;
        })
      })
    }

getDate(){
  if(this.fromBillDate != '' && this.toBillDate != ''){
    let date1:any;
    let date2:any;
    date1 = new Date((new Date(this.fromBillDate).getMonth()+1)+"/"+new Date(this.fromBillDate).getDate()+"/"+new Date(this.fromBillDate).getFullYear());
    date2 = new Date((new Date(this.toBillDate).getMonth()+1)+"/"+new Date(this.toBillDate).getDate()+"/"+new Date(this.toBillDate).getFullYear());
    let diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    this.noOfDays = diffDays +1;
  }
 
}

getConsumptionInitial(event:any){
  this.consumption = this.finalReading - event.target.value;
  this.billAmount = this.consumption * this.chargesPerUnit;
  this.grossAmount = ((this.billAmount*1) + (this.lateFee*1) + (this.arrear*1)).toFixed(2);
}

getConsumptionFinal(event:any){
  this.consumption = event.target.value - this.initReading;
  this.billAmount = this.consumption * this.chargesPerUnit;
  this.grossAmount = ((this.billAmount*1) + (this.lateFee*1) + (this.arrear*1)).toFixed(2);
}

getBillAmt(event:any){
  this.billAmount = this.consumption * event.target.value;
  this.grossAmount = ((this.billAmount*1) + (this.lateFee*1) + (this.arrear*1)).toFixed(2);
}

getGrossBill(event:any){
  this.grossAmount = (event.target.value+this.lateFee+this.arrear).toFixed(2);
}

getGrossLate(event:any){
  this.grossAmount = ((this.billAmount *1)+(event.target.value*1)+(this.arrear*1)).toFixed(2);
}

getGrossArrear(event:any){
  this.grossAmount = ((this.billAmount *1)+(this.lateFee*1)+(event.target.value*1)).toFixed(2);
}

getTotalBill(event:any){
  this.billAmount = (event.target.value * (this.perTotalBill/100)).toFixed(2);
  this.grossAmount = ((this.billAmount*1) + (this.lateFee*1) + (this.arrear*1)).toFixed(2);
}

getPerTotalBill(event:any){
  this.billAmount = (this.totalBill * (event.target.value/100)).toFixed(2);
  this.grossAmount = ((this.billAmount*1) + (this.lateFee*1) + (this.arrear*1)).toFixed(2);
}

uploadBillDocument(event: any): void {
  if (event.target.files) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      if (event.target.files[0].size > 300 * 1024) {
        this.toastr.error('File size exceeds the limit of 300 KB.');
        this.billChild.nativeElement.value = "";
        return; 
      }
      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.billDocument.push(res.data.url);
        }
      });
    
  }
}



confirmStatus(){
  if(this.billDocument.length == 0){
    this.toastr.error("Please upload at least one document");
    this.loader = false;
    return;
  }
  const data = JSON.stringify({
    "adminStatus":"Confirmed",
    "adminConfirmed":this.authS.currentUserValue.id
  });
  this.apiS.updateUtilityTemporary(data,this.id).subscribe(result => {
    if (result.status === 'error') {
      this.toastr.error(result.message);
    } else {
      let verifyArray:any=[];
      let financeVerifyArray:any=[];
      let isExceded = (this.grossAmount > this.item.meter?.maximumConsumption) ? true:false;
      this.apiS.getApprovalLevelsCalculate(this.grossAmount,isExceded,this.item.utility._id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
          this.loader=false;
        } else {
          verifyArray = data.data;
          financeVerifyArray.push({slab:"",role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""});
          const utilitydata = JSON.stringify({
            "date":new Date(),
            "branch":this.item.branch._id,
            "branchCode":this.item.branch.code,
            "branchName":this.item.branch.name,
            "cluster":this.item.branch.cluster,
            "zone":this.item.branch.zone,
            "division":this.item.branch.division,
            "state":this.item.branch.state,
            "meter":this.item.meter,
            "utility":this.item.utility._id,
            "utilityMaster":this.item.utility?.utility,
            "billNo":this.billNo,
            "vendorName":this.vendorName,
            "billType":this.item.meter?.billType,
            "invoiceDate":this.invoiceDate,
            "fromBillDate":this.fromBillDate,
            "toBillDate":this.toBillDate,
            "noOfDays":this.noOfDays,
            "initReading":this.initReading,
            "finalReading":this.finalReading,
            "consumption":this.consumption,
            "chargesPerUnit":this.chargesPerUnit,
            "totalBill":this.totalBill,
            "perTotalBill":this.perTotalBill,
            "billAmount":this.billAmount,
            "lateFee":this.lateFee,
            "arrear":this.arrear,
            "grossAmount":this.grossAmount,
            "dueDate":this.dueDate,
            "fundsToBeTransferred":this.fundsToBeTransferred,
            "branchAccount":this.disbursementBranchAcc,
            "remark":this.remarks,
            "billDocument":this.billDocument,
            "verifyStatus":verifyArray,
            "fverifyStatus":financeVerifyArray,
            "billStatus":"Submitted"
          });
          this.apiS.createUtilityBill(utilitydata).subscribe(rdata => {
            if (rdata.status === 'error') {
              this.toastr.error(rdata.message);
            } else {
              
              this.toastr.success("New Record Created Successfully");
              this.item.adminStatus = "Confirmed"
              this._location.back();
            }
          },error=>{
            this.toastr.error(error.message);
          });
        }
      });
    }
  },error=>{
    this.toastr.error(error.message);
  });
}

confirmStatusIndraft(){
  if(this.billDocument.length == 0){
    this.toastr.error("Please upload at least one document");
    this.loader = false;
    return;
  }
  const data = JSON.stringify({
    "adminStatus":"Confirmed",
    "adminConfirmed":this.authS.currentUserValue.id
  });
  this.apiS.updateUtilityTemporary(data,this.id).subscribe(result => {
    if (result.status === 'error') {
      this.toastr.error(result.message);
    } else {
      const utilitydata = JSON.stringify({
        "date":new Date(),
        "branch":this.item.branch._id,
        "branchCode":this.item.branch.code,
        "branchName":this.item.branch.name,
        "cluster":this.item.branch.cluster,
        "zone":this.item.branch.zone,
        "division":this.item.branch.division,
        "state":this.item.branch.state,
        "meter":this.item.meter,
        "utility":this.item.utility._id,
        "utilityMaster":this.item.utility?.utility,
        "billNo":this.billNo,
        "vendorName":this.vendorName,
        "billType":this.item.meter?.billType,
        "invoiceDate":this.invoiceDate,
        "fromBillDate":this.fromBillDate,
        "toBillDate":this.toBillDate,
        "noOfDays":this.noOfDays,
        "initReading":this.initReading,
        "finalReading":this.finalReading,
        "consumption":this.consumption,
        "chargesPerUnit":this.chargesPerUnit,
        "totalBill":this.totalBill,
        "perTotalBill":this.perTotalBill,
        "billAmount":this.billAmount,
        "lateFee":this.lateFee,
        "arrear":this.arrear,
        "grossAmount":this.grossAmount,
        "dueDate":this.dueDate,
        "fundsToBeTransferred":this.fundsToBeTransferred,
        "branchAccount":this.disbursementBranchAcc,
        "remark":this.remarks,
        "billDocument":this.billDocument,
        "billStatus":"Submitted"
      });
      this.apiS.createUtilityBill(utilitydata).subscribe(rdata => {
        if (rdata.status === 'error') {
          this.toastr.error(rdata.message);
        } else {
          
          this.toastr.success("New Record Created Successfully");
          this.item.adminStatus = "Confirmed"
          this._location.back();
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  },error=>{
    this.toastr.error(error.message);
  });
}


deleteBillDoc(i:any){
  this.billDocument.splice(i,1);
}


}
