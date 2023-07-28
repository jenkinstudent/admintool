import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-utility-bulkapprove',
  templateUrl: './utility-bulkapprove.component.html',
  styleUrls: ['./utility-bulkapprove.component.scss']
})
export class UtilityBulkapproveComponent implements OnInit {


  @Input() type: string | undefined;
  breadCrumbItems!: Array<{}>;
  data:any = [];
  notRaised:any = [];
  currentMonth:any=[];
  searchTerm:any = "";
  baseURL = environment.baseURL;
  item:any=[];

  selectedDate:any = "";
  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  aloading = false;
  rloading = false;
  where:any = {};
  printData:any = [];
  checkedData:any = [];

  cmFirstDate = new Date().getFullYear()+"-"+("0"+(new Date().getMonth()+1)).slice(-2)+"-01";

  constructor(public api:ApiService,public router:Router,public toastr:ToastrService,public authS:AuthenticationService,public titleS:Title,public appC:AppComponent,
    public modalService:NgbModal,public excelS:ExcelService,public route:ActivatedRoute) {}

  ngOnInit(): void {
    this.titleS.setTitle("Utility - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Utility' , active: true }
    ];
    this.getData();
  }

  check(index:any){
    this.data[index].checked = true;
  }

  allAdminSelection(event:any){
    if(event.target.checked){
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Pending' && item.financeStatus == 'Pending' && this.authS.hasApprovePermission('utility',item.grossAmount, item.verifyStatus)){
          item.checked = true;
        }   
      });
    }else{
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Pending' && item.financeStatus == 'Pending' && this.authS.hasApprovePermission('utility',item.grossAmount, item.verifyStatus)){
          item.checked = false;
        }   
      });
    }
  }

  allFinanceSelection(event:any){
    if(event.target.checked){
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Approved' && item.financeStatus == 'Pending' && this.authS.hasFApprovePermission('utility',item.grossAmount, item.fverifyStatus)){
          item.checked = true;
        }   
      });
    }else{
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Approved' && item.financeStatus == 'Pending' && this.authS.hasFApprovePermission('utility',item.grossAmount, item.fverifyStatus)){
          item.checked = false;
        }   
      });
    }
  }

  clear(){
    this.selectedDate = "";
    this.searchTerm = "";
    this.where = {};
    this.page = 1;
    this.searchTerm = "";
    this.getData();
    
  }

  getData(){
    this.loading = true;

    this.api.getAllUtilityBill(this.page,this.where,"","",this.searchTerm).subscribe(res=>{
      this.data = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
    });
  }

  adminApproveAll(){
    this.aloading = true;
    this.data.map((item:any)=>{
      if(item.checked){
        this.checkedData.push({id:item._id});
      }
    });
    if(this.checkedData.length == 0){
      this.toastr.error("Please select at least 1.");
      this.aloading = false;
      return;
    }
    for(let i = 0;i<this.checkedData.length;i++){
      const data=JSON.stringify({
        "adminStatus":'Approved',
        "adminStatusDate":new Date(),
        "adminApproved":this.authS.currentUserValue.id,
        "rework":false,
        "updateAdminApproveStatus":true
      });
      this.api.updateUtilityBill(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          let updatedData = {
            "date":this.checkedData[i].date,
            "branch":this.checkedData[i].branch._id,
            "branchCode":this.checkedData[i].branch.code,
            "branchName":this.checkedData[i].branch.name,
            "cluster":this.checkedData[i].branch.cluster,
            "zone":this.checkedData[i].branch.zone,
            "division":this.checkedData[i].branch.division,
            "state":this.checkedData[i].branch.state,
            "meter":this.checkedData[i].meter,
            "utility":this.checkedData[i].utility._id,
            "utilityMaster":this.checkedData[i].utility?.utility,
            "billNo":this.checkedData[i].billNo,
            "vendorName":this.checkedData[i].vendorName,
            "billType":this.checkedData[i].meter?.billType,
            "invoiceDate":this.checkedData[i].invoiceDate,
            "fromBillDate":this.checkedData[i].fromBillDate,
            "toBillDate":this.checkedData[i].toBillDate,
            "noOfDays":this.checkedData[i].noOfDays,
            "initReading":this.checkedData[i].initReading,
            "finalReading":this.checkedData[i].finalReading,
            "consumption":this.checkedData[i].consumption,
            "chargesPerUnit":this.checkedData[i].chargesPerUnit,
            "totalBill":this.checkedData[i].totalBill,
            "perTotalBill":this.checkedData[i].perTotalBill,
            "billAmount":this.checkedData[i].billAmount,
            "lateFee":this.checkedData[i].lateFee,
            "arrear":this.checkedData[i].arrear,
            "grossAmount":this.checkedData[i].grossAmount,
            "dueDate":this.checkedData[i].dueDate,
            "fundsToBeTransferred":this.checkedData[i].fundsToBeTransferred,
            "branchAccount":this.checkedData[i].disbursementBranchAcc,
            "remark":this.checkedData[i].remark,
            "billDocument":this.checkedData[i].billDocument,
            "verifyStatus":this.checkedData[i].verifyStatus,
            "fverifyStatus":this.checkedData[i].fverifyStatus,
            "adminStatus":'Approved',
            "adminStatusDate":new Date(),
            "adminStatusRemark":this.checkedData[i].adminStatusRemark,
            "adminStatusDocument":this.checkedData[i].adminStatusDocument,
            "adminRejectRemark":this.checkedData[i].adminRejectDocument,
            "adminRejectDocument":this.checkedData[i].adminRejectDocument,
            "adminApproved":this.authS.currentUserValue.id,
            "financeStatus":this.checkedData[i].financeStatus,
            "financeStatusDate":this.checkedData[i].financeStatusDate,
            "financeStatusRemark":this.checkedData[i].financeStatusRemark,
            "financeStatusDocument":this.checkedData[i].financeStatusDocument,
            "financeRejectRemark":this.checkedData[i].financeRejectRemark,
            "financeRejectDocument":this.checkedData[i].financeRejectDocument,
            "financeApproved":this.checkedData[i].financeApproved,
            "courier":this.checkedData[i].courier,
            "transactionReceipt":this.checkedData[i].transactionReceipt,
            "transactionDate":this.checkedData[i].transactionDate,
            "transactionAmt":this.checkedData[i].transactionAmt,
            "billStatus":this.checkedData[i].billStatus
          }
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "utilityBill":this.checkedData[i]._id,
            "currentData":this.checkedData[i],
            "updatedData":updatedData
          })
          this.api.createActivity(aData).subscribe(uResult => {
          }); 
          if(i == (this.checkedData.length - 1)){
            this.toastr.success("Transactions Approved Successfully");
            this.getData();
            this.checkedData = [];
            this.aloading = false;
          }
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  }

  adminRejectAll(){
    this.rloading = true;
    this.data.map((item:any)=>{
      if(item.checked){
        this.checkedData.push({id:item._id});
      }
    });
    if(this.checkedData.length == 0){
      this.toastr.error("Please select at least 1.");
      this.rloading = false;
      return;
    }
    
    for(let i = 0;i<this.checkedData.length;i++){
      const data=JSON.stringify({
        "adminStatus":"Rejected",
        "verifyStatus":[],
        "fverifyStatus":[],
        "rework":true,
        "rejectedBy":this.authS.currentUserValue.id,
        "updateAdminApproveStatus":false
      });
      this.api.updateUtilityBill(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          let updatedData = {
            "date":this.checkedData[i].date,
            "branch":this.checkedData[i].branch._id,
            "branchCode":this.checkedData[i].branch.code,
            "branchName":this.checkedData[i].branch.name,
            "cluster":this.checkedData[i].branch.cluster,
            "zone":this.checkedData[i].branch.zone,
            "division":this.checkedData[i].branch.division,
            "state":this.checkedData[i].branch.state,
            "meter":this.checkedData[i].meter,
            "utility":this.checkedData[i].utility._id,
            "utilityMaster":this.checkedData[i].utility?.utility,
            "billNo":this.checkedData[i].billNo,
            "vendorName":this.checkedData[i].vendorName,
            "billType":this.checkedData[i].meter?.billType,
            "invoiceDate":this.checkedData[i].invoiceDate,
            "fromBillDate":this.checkedData[i].fromBillDate,
            "toBillDate":this.checkedData[i].toBillDate,
            "noOfDays":this.checkedData[i].noOfDays,
            "initReading":this.checkedData[i].initReading,
            "finalReading":this.checkedData[i].finalReading,
            "consumption":this.checkedData[i].consumption,
            "chargesPerUnit":this.checkedData[i].chargesPerUnit,
            "totalBill":this.checkedData[i].totalBill,
            "perTotalBill":this.checkedData[i].perTotalBill,
            "billAmount":this.checkedData[i].billAmount,
            "lateFee":this.checkedData[i].lateFee,
            "arrear":this.checkedData[i].arrear,
            "grossAmount":this.checkedData[i].grossAmount,
            "dueDate":this.checkedData[i].dueDate,
            "fundsToBeTransferred":this.checkedData[i].fundsToBeTransferred,
            "branchAccount":this.checkedData[i].disbursementBranchAcc,
            "remark":this.checkedData[i].remark,
            "billDocument":this.checkedData[i].billDocument,
            "verifyStatus":[],
            "fverifyStatus":[],
            "adminStatus":'Rejected',
            "adminStatusDate":this.checkedData[i].adminStatusDate,
            "adminStatusRemark":this.checkedData[i].adminStatusRemark,
            "adminStatusDocument":this.checkedData[i].adminStatusDocument,
            "adminRejectRemark":this.checkedData[i].adminRejectDocument,
            "adminRejectDocument":this.checkedData[i].adminRejectDocument,
            "adminApproved":this.checkedData[i].adminApproved,
            "financeStatus":this.checkedData[i].financeStatus,
            "financeStatusDate":this.checkedData[i].financeStatusDate,
            "financeStatusRemark":this.checkedData[i].financeStatusRemark,
            "financeStatusDocument":this.checkedData[i].financeStatusDocument,
            "financeRejectRemark":this.checkedData[i].financeRejectRemark,
            "financeRejectDocument":this.checkedData[i].financeRejectDocument,
            "financeApproved":this.checkedData[i].financeApproved,
            "courier":this.checkedData[i].courier,
            "transactionReceipt":this.checkedData[i].transactionReceipt,
            "transactionDate":this.checkedData[i].transactionDate,
            "transactionAmt":this.checkedData[i].transactionAmt,
            "billStatus":this.checkedData[i].billStatus
          }
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "utilityBill":this.checkedData[i]._id,
            "currentData":this.checkedData[i],
            "updatedData":updatedData
          })
          this.api.createActivity(aData).subscribe(uResult => {
          }); 
          if(i == (this.checkedData.length - 1)){
            this.toastr.success("Transactions Rejected Successfully");
            this.getData();
            this.checkedData = [];
            this.rloading = false;
          }
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  }

  financeApproveAll(){
    this.aloading = true;
    this.data.map((item:any)=>{
      if(item.checked){
        this.checkedData.push({id:item._id});
      }
    });
    if(this.checkedData.length == 0){
      this.toastr.error("Please select at least 1.");
      this.aloading = false;
      return;
    }
    for(let i = 0;i<this.checkedData.length;i++){
      const data=JSON.stringify({
        "financeStatus":"Approved",
        "financeStatusDate":new Date(),
        "financeApproved":this.authS.currentUserValue.id,
        "rework":false,
        "updateFinanceApproveStatus":true
      });
      this.api.updateUtilityBill(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          let updatedData = {
            "date":this.checkedData[i].date,
            "branch":this.checkedData[i].branch._id,
            "branchCode":this.checkedData[i].branch.code,
            "branchName":this.checkedData[i].branch.name,
            "cluster":this.checkedData[i].branch.cluster,
            "zone":this.checkedData[i].branch.zone,
            "division":this.checkedData[i].branch.division,
            "state":this.checkedData[i].branch.state,
            "meter":this.checkedData[i].meter,
            "utility":this.checkedData[i].utility._id,
            "utilityMaster":this.checkedData[i].utility?.utility,
            "billNo":this.checkedData[i].billNo,
            "vendorName":this.checkedData[i].vendorName,
            "billType":this.checkedData[i].meter?.billType,
            "invoiceDate":this.checkedData[i].invoiceDate,
            "fromBillDate":this.checkedData[i].fromBillDate,
            "toBillDate":this.checkedData[i].toBillDate,
            "noOfDays":this.checkedData[i].noOfDays,
            "initReading":this.checkedData[i].initReading,
            "finalReading":this.checkedData[i].finalReading,
            "consumption":this.checkedData[i].consumption,
            "chargesPerUnit":this.checkedData[i].chargesPerUnit,
            "totalBill":this.checkedData[i].totalBill,
            "perTotalBill":this.checkedData[i].perTotalBill,
            "billAmount":this.checkedData[i].billAmount,
            "lateFee":this.checkedData[i].lateFee,
            "arrear":this.checkedData[i].arrear,
            "grossAmount":this.checkedData[i].grossAmount,
            "dueDate":this.checkedData[i].dueDate,
            "fundsToBeTransferred":this.checkedData[i].fundsToBeTransferred,
            "branchAccount":this.checkedData[i].disbursementBranchAcc,
            "remark":this.checkedData[i].remark,
            "billDocument":this.checkedData[i].billDocument,
            "verifyStatus":this.checkedData[i].verifyStatus,
            "fverifyStatus":this.checkedData[i].fverifyStatus,
            "adminStatus":this.checkedData[i].adminStatus,
            "adminStatusDate":this.checkedData[i].adminStatusDate,
            "adminStatusRemark":this.checkedData[i].adminStatusRemark,
            "adminStatusDocument":this.checkedData[i].adminStatusDocument,
            "adminRejectRemark":this.checkedData[i].adminRejectDocument,
            "adminRejectDocument":this.checkedData[i].adminRejectDocument,
            "adminApproved":this.checkedData[i].adminApproved,
            "financeStatus":"Approved",
            "financeStatusDate":new Date(),
            "financeStatusRemark":this.checkedData[i].financeStatusRemark,
            "financeStatusDocument":this.checkedData[i].financeStatusDocument,
            "financeRejectRemark":this.checkedData[i].financeRejectRemark,
            "financeRejectDocument":this.checkedData[i].financeRejectDocument,
            "financeApproved":this.authS.currentUserValue.id,
            "courier":this.checkedData[i].courier,
            "transactionReceipt":this.checkedData[i].transactionReceipt,
            "transactionDate":this.checkedData[i].transactionDate,
            "transactionAmt":this.checkedData[i].transactionAmt,
            "billStatus":this.checkedData[i].billStatus
          }
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "utilityBill":this.checkedData[i]._id,
            "currentData":this.checkedData[i],
            "updatedData":updatedData
          })
          this.api.createActivity(aData).subscribe(uResult => {
          }); 
          if(i == (this.checkedData.length - 1)){
            this.toastr.success("Transactions Approved Successfully");
            this.getData();
            this.checkedData = [];
            this.aloading = false;
          }
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  }

  financeRejectAll(){
    this.rloading = true;
    this.data.map((item:any)=>{
      if(item.checked){
        this.checkedData.push({id:item._id});
      }
    });
    if(this.checkedData.length == 0){
      this.toastr.error("Please select at least 1.");
      this.rloading = false;
      return;
    }
    for(let i = 0;i<this.checkedData.length;i++){
      const data=JSON.stringify({
        "financeStatus":"Rejected",
        "fverifyStatus":[],
        "verifyStatus":[],
        "rework":true,
        "rejectedBy":this.authS.currentUserValue.id,
        "updateFinanceApproveStatus":false
      });
      this.api.updateUtilityBill(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          let updatedData = {
            "date":this.checkedData[i].date,
            "branch":this.checkedData[i].branch._id,
            "branchCode":this.checkedData[i].branch.code,
            "branchName":this.checkedData[i].branch.name,
            "cluster":this.checkedData[i].branch.cluster,
            "zone":this.checkedData[i].branch.zone,
            "division":this.checkedData[i].branch.division,
            "state":this.checkedData[i].branch.state,
            "meter":this.checkedData[i].meter,
            "utility":this.checkedData[i].utility._id,
            "utilityMaster":this.checkedData[i].utility?.utility,
            "billNo":this.checkedData[i].billNo,
            "vendorName":this.checkedData[i].vendorName,
            "billType":this.checkedData[i].meter?.billType,
            "invoiceDate":this.checkedData[i].invoiceDate,
            "fromBillDate":this.checkedData[i].fromBillDate,
            "toBillDate":this.checkedData[i].toBillDate,
            "noOfDays":this.checkedData[i].noOfDays,
            "initReading":this.checkedData[i].initReading,
            "finalReading":this.checkedData[i].finalReading,
            "consumption":this.checkedData[i].consumption,
            "chargesPerUnit":this.checkedData[i].chargesPerUnit,
            "totalBill":this.checkedData[i].totalBill,
            "perTotalBill":this.checkedData[i].perTotalBill,
            "billAmount":this.checkedData[i].billAmount,
            "lateFee":this.checkedData[i].lateFee,
            "arrear":this.checkedData[i].arrear,
            "grossAmount":this.checkedData[i].grossAmount,
            "dueDate":this.checkedData[i].dueDate,
            "fundsToBeTransferred":this.checkedData[i].fundsToBeTransferred,
            "branchAccount":this.checkedData[i].disbursementBranchAcc,
            "remark":this.checkedData[i].remark,
            "billDocument":this.checkedData[i].billDocument,
            "verifyStatus":[],
            "fverifyStatus":[],
            "adminStatus":this.checkedData[i].adminStatus,
            "adminStatusDate":this.checkedData[i].adminStatusDate,
            "adminStatusRemark":this.checkedData[i].adminStatusRemark,
            "adminStatusDocument":this.checkedData[i].adminStatusDocument,
            "adminRejectRemark":this.checkedData[i].adminRejectDocument,
            "adminRejectDocument":this.checkedData[i].adminRejectDocument,
            "adminApproved":this.checkedData[i].adminApproved,
            "financeStatus":"Rejected",
            "financeStatusDate":this.checkedData[i].financeStatusDate,
            "financeStatusRemark":this.checkedData[i].financeStatusRemark,
            "financeStatusDocument":this.checkedData[i].financeStatusDocument,
            "financeRejectRemark":this.checkedData[i].financeRejectRemark,
            "financeRejectDocument":this.checkedData[i].financeRejectDocument,
            "financeApproved":this.checkedData[i].financeApproved,
            "courier":this.checkedData[i].courier,
            "transactionReceipt":this.checkedData[i].transactionReceipt,
            "transactionDate":this.checkedData[i].transactionDate,
            "transactionAmt":this.checkedData[i].transactionAmt,
            "billStatus":this.checkedData[i].billStatus
          }
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "utilityBill":this.checkedData[i]._id,
            "currentData":this.checkedData[i],
            "updatedData":updatedData
          })
          this.api.createActivity(aData).subscribe(uResult => {
          }); 
          if(i == (this.checkedData.length - 1)){
            this.toastr.success("Transactions Rejected Successfully");
            this.getData();
            this.checkedData = [];
            this.rloading = false;
          }
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  }

  nextPage(){
    this.page += 1;
    this.getData();
  }


  previousPage(){
    this.page -= 1;
    this.getData();
  }

}
