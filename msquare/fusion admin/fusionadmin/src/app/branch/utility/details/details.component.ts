import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

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
  arrear:any="";
  grossAmount:any="";
  dueDate:any="";
  billDocument:any=[];
  status:any="";
  fstatus:any="";

  loader=false;

  baseURL=environment.baseURL;
  constructor(public _location:Location, public titleS:Title,public appC:AppComponent,public route:ActivatedRoute,public apiS:ApiService, public router: Router,
    public toastr:ToastrService,public authS:AuthenticationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'edit'){
        this.action = 'edit';
        this.breadCrumbItems = [
          { label: 'Utility Bill' },
          { label: 'Edit Utility Bill', active: true }
        ];
        this.label= "Edit Utility Bill";
        this.titleS.setTitle("Edit Utility Bill - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleUtilityBill(editParam.id).subscribe(res=>{
            this.item = res.data;
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
            this.arrear=res.data.arrear;
            this.grossAmount=res.data.grossAmount;
            this.dueDate=new Date(res.data.dueDate).getFullYear()+"-"+("0"+((new Date(res.data.dueDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.dueDate).getDate()).slice(-2);
            this.billDocument=res.data.billDocument;
            this.status = res.data.adminStatus;
            this.fstatus = res.data.financeStatus;

          })
        });
      }else{
        this.action = 'view';
        this.breadCrumbItems = [
          { label: 'Utility Bill' },
          { label: 'View Utility Bill', active: true }
        ];
        this.label= "View Utility Bill";
        this.titleS.setTitle("View Utility Bill - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleUtilityBill(editParam.id).subscribe(res=>{
            this.item =res.data;
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
            this.arrear=res.data.arrear;
            this.grossAmount=res.data.grossAmount;
            this.dueDate=new Date(res.data.dueDate).getFullYear()+"-"+("0"+((new Date(res.data.dueDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.dueDate).getDate()).slice(-2);
            this.billDocument=res.data.billDocument;

          })
        });
      }
        
    });
  }

  save(status:any){
    this.loader=true;
    this.status = status;
    if(this.status == 'Rejected' || this.fstatus == 'Rejected'){
      this.status =='Pending';
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
          let updatedData = {
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
            "verifyStatus":verifyArray,
            "fverifyStatus":financeVerifyArray,
            "billDocument":this.billDocument,
            "adminStatus":"Pending",
            "financeStatus":"Pending",
            "financeStatusDate":"",
            "financeStatusRemark":"",
            "financeRejectRemark":"",
            "financeApproved":null,
            "adminStatusDate":"",
            "adminStatusRemark":"",
            "adminRejectRemark":"",
            "adminApproved":null,
            "isOpen":false,
            "isFOpen":false,
            "billStatus":"Submitted",
            "date":this.item.date,
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
            "fundsToBeTransferred":this.item.fundsToBeTransferred,
            "branchAccount":this.item.disbursementBranchAcc,
            "remark":this.item.remark,
            "courier":this.item.courier,
            "transactionReceipt":this.item.transactionReceipt,
            "transactionDate":this.item.transactionDate,
            "transactionAmt":this.item.transactionAmt
          }
          const data1 = JSON.stringify(updatedData);
          this.apiS.updateUtilityBill(data1,this.id).subscribe(result => {
            if (result.status === 'error') {
              this.toastr.error(result.message);
              this.loader = false;
            } else {
              
              const aData = JSON.stringify({
                "user": this.authS.currentUserValue.id,
                "utilityBill":this.id,
                "currentData":this.item,
                "updatedData":updatedData
              })
              this.apiS.createActivity(aData).subscribe(uResult => {
              }); 
                this.toastr.success("Record Updated Successfully");
                this.loader = false;
                this.item.adminStatus = 'Pending';
                this.item.financeStatus = 'Pending';
                this.router.navigate(['/branch/utility']);
              }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
        }
      });
     
    }else{
      let updatedData = {
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
        "billDocument":this.billDocument,
        "billStatus":"Draft",
        "date":this.item.date,
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
        "fundsToBeTransferred":this.item.fundsToBeTransferred,
        "branchAccount":this.item.disbursementBranchAcc,
        "remark":this.item.remark,
        "verifyStatus":this.item.verifyStatus,
        "fverifyStatus":this.item.fverifyStatus,
        "adminStatus":this.item.adminStatus,
        "adminStatusDate":this.item.adminStatusDate,
        "adminStatusRemark":this.item.adminStatusRemark,
        "adminStatusDocument":this.item.adminStatusDocument,
        "adminRejectRemark":this.item.adminRejectRemark,
        "adminRejectDocument":this.item.adminRejectDocument,
        "adminApproved":this.item.adminApproved,
        "financeStatus":this.item.financeStatus,
        "financeStatusDate":this.item.financeStatusDate,
        "financeStatusRemark":this.item.financeStatusRemark,
        "financeStatusDocument":this.item.financeStatusDocument,
        "financeRejectRemark":this.item.financeRejectRemark,
        "financeRejectDocument":this.item.financeRejectDocument,
        "financeApproved":this.item.financeApproved,
        "courier":this.item.courier,
        "transactionReceipt":this.item.transactionReceipt,
        "transactionDate":this.item.transactionDate,
        "transactionAmt":this.item.transactionAmt,
      }
      const data = JSON.stringify(updatedData);
      this.apiS.updateUtilityBill(data,this.id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "utilityBill":this.id,
            "currentData":this.item,
            "updatedData":updatedData
          })
          this.apiS.createActivity(aData).subscribe(uResult => {
          }); 
            this.toastr.success("Record Updated Successfully");
            this.loader = false;
          }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
      
    }
   
  }


  updateAdminStatus(id:any,status:any){
    Swal.fire({
      title: 'Enter Remark',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#0ab39c',
      cancelButtonColor: '#f46a6a',
      allowOutsideClick: false,
    }).then((remark) => {
      if (remark.value) {
        const data=JSON.stringify({
          "adminStatus":status,
          "adminStatusDate":new Date(),
          "adminStatusRemark":remark.value,
          "adminApproved":this.authS.currentUserValue.id
        });
        this.apiS.updateUtilityBill(data,id).subscribe(data=>{
          if (data.status === 'error') {
            this.toastr.error(data.message);
          } else {
            let updatedData = {
              "date":this.item.date,
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
              "billNo":this.item.billNo,
              "vendorName":this.item.vendorName,
              "billType":this.item.meter?.billType,
              "invoiceDate":this.item.invoiceDate,
              "fromBillDate":this.item.fromBillDate,
              "toBillDate":this.item.toBillDate,
              "noOfDays":this.item.noOfDays,
              "initReading":this.item.initReading,
              "finalReading":this.item.finalReading,
              "consumption":this.item.consumption,
              "chargesPerUnit":this.item.chargesPerUnit,
              "totalBill":this.item.totalBill,
              "perTotalBill":this.item.perTotalBill,
              "billAmount":this.item.billAmount,
              "lateFee":this.item.lateFee,
              "arrear":this.item.arrear,
              "grossAmount":this.item.grossAmount,
              "dueDate":this.item.dueDate,
              "fundsToBeTransferred":this.item.fundsToBeTransferred,
              "branchAccount":this.item.disbursementBranchAcc,
              "remark":this.item.remark,
              "billDocument":this.item.billDocument,
              "verifyStatus":this.item.verifyStatus,
              "fverifyStatus":this.item.fverifyStatus,
              "adminStatus":status,
              "adminStatusDate":new Date(),
              "adminStatusRemark":remark.value,
              "adminStatusDocument":this.item.adminStatusDocument,
              "adminRejectRemark":this.item.adminRejectRemark,
              "adminRejectDocument":this.item.adminRejectDocument,
              "adminApproved":this.authS.currentUserValue.id,
              "financeStatus":this.item.financeStatus,
              "financeStatusDate":this.item.financeStatusDate,
              "financeStatusRemark":this.item.financeStatusRemark,
              "financeStatusDocument":this.item.financeStatusDocument,
              "financeRejectRemark":this.item.financeRejectRemark,
              "financeRejectDocument":this.item.financeRejectDocument,
              "financeApproved":this.item.financeApproved,
              "courier":this.item.courier,
              "transactionReceipt":this.item.transactionReceipt,
              "transactionDate":this.item.transactionDate,
              "transactionAmt":this.item.transactionAmt,
              "billStatus":this.item.billStatus
            }
            const aData = JSON.stringify({
              "user": this.authS.currentUserValue.id,
              "utilityBill":this.id,
              "currentData":this.item,
              "updatedData":updatedData
            })
            this.apiS.createActivity(aData).subscribe(uResult => {
            }); 
            this.item.adminStatus = status;
            this.item.adminStatusDate = new Date();
            this.item.adminStatusRemark = remark.value;
            if(status == 'Approved'){
              this.toastr.success("Transaction Approved Successfully");
            }else{
              this.toastr.error("Transaction Rejected Successfully");
            }
            
          }
        },error=>{
          this.toastr.error(error.message);
        });
      } else if (
        /* Read more about handling dismissals below */
        remark.dismiss === Swal.DismissReason.cancel
      ) {
        
      }
    });
}

getDate(){
  if(this.fromBillDate != '' && this.toBillDate != ''){
    let date1:any;
    let date2:any;
    date1 = new Date((new Date(this.fromBillDate).getMonth()+1)+"/"+new Date(this.fromBillDate).getDate()+"/"+new Date(this.fromBillDate).getFullYear());
    date2 = new Date((new Date(this.toBillDate).getMonth()+1)+"/"+new Date(this.toBillDate).getDate()+"/"+new Date(this.toBillDate).getFullYear());
    let diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    this.noOfDays = diffDays;
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


updateAdminOpen(id:any){
  const data=JSON.stringify({
    "isOpen":true
  });
  this.apiS.updateUtilityBill(data,id).subscribe(data=>{
    if (data.status === 'error') {
      this.toastr.error(data.message);
    } else {
      this.item.isOpen = true;
      
    }
  },error=>{
    this.toastr.error(error.message);
  });
}

deleteBillDoc(i:any){
  this.billDocument.splice(i,1);
}

}
