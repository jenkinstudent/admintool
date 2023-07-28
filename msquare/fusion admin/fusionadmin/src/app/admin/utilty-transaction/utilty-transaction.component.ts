import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-utilty-transaction',
  templateUrl: './utilty-transaction.component.html',
  styleUrls: ['./utilty-transaction.component.scss']
})
export class UtiltyTransactionComponent implements OnInit {


  breadCrumbItems!: Array<{}>;
  data:any = [];
  notRaised:any = [];
  currentMonth:any=[];
  searchTerm:any = "";
  baseURL = environment.baseURL;
  item:any=[];

  selectedDate:any = "";
  selectedProduct:any = "";
  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  where:any = {};
  printData:any = [];
  utilityMasters:any = [];

  activeId:any = "";

  cmFirstDate = new Date().getFullYear()+"-"+("0"+(new Date().getMonth()+1)).slice(-2)+"-01";

  constructor(public api:ApiService,public router:Router,public toastr:ToastrService,public authS:AuthenticationService,public titleS:Title,public appC:AppComponent,
    public modalService:NgbModal,public excelS:ExcelService) {}

  ngOnInit(): void {
    this.titleS.setTitle("Utility - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Utility' , active: true }
    ];
    if(this.authS.currentUserValue.designation.id != 'L1-Finance' && this.authS.currentUserValue.designation.id != 'L2-Finance'){
      this.activeId = 1;
    }else{
      this.activeId = 2;
    }
    this.api.getAllUtilityMaster().subscribe(data => {
      this.utilityMasters = data.data;
    })
    this.getData();
    this.api.getAllUtilityBill(1,{},"","","",10000).subscribe(data=>{
      data.data.map((res:any)=>{
        this.printData.push({
          "Voucher No.":res.voucherNo,
          "Branch":res.branch?.code +" - "+ res.branch?.name,
          "Cluster":res.branch?.cluster,
          "Division":res.branch?.division,
          "State":res.branch?.state,
          "Zone":res.branch?.zone,
          "Utility Name":res.utility?.utility?.name,
          "Premises Type":res.utility?.premisesType,
          "Bill No.":res.billNo,
          "Invoice Date":new Date(res.invoiceDate).getFullYear()+"-"+("0"+(new Date(res.invoiceDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.invoiceDate).getDate()).slice(-2),
          "From Date":new Date(res.fromBillDate).getFullYear()+"-"+("0"+(new Date(res.fromBillDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.fromBillDate).getDate()).slice(-2),
          "To Date":new Date(res.toBillDate).getFullYear()+"-"+("0"+(new Date(res.toBillDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.toBillDate).getDate()).slice(-2),
          "Date Raised On":new Date(res.date).getFullYear()+"-"+("0"+(new Date(res.date).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.date).getDate()).slice(-2),
          "Due Date":new Date(res.dueDate).getFullYear()+"-"+("0"+(new Date(res.dueDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.dueDate).getDate()).slice(-2),
          "Vendor Name":res.vendorName,
          "Consumption":res.consumption,
          "Gross Amt":"₹ "+res.grossAmount,
          "Exceeded":"₹ "+(res.grossAmount > res.meter?.maximumConsumption)?(res.grossAmount - res.meter?.maximumConsumption):0,
          "Admin Approval":res.adminStatus,
          "Admin Approved By":(res.adminStatus == 'Approved')?res.adminApproved?.name +" On "+ new Date(res.adminStatusDate).getFullYear()+"-"+("0"+(new Date(res.adminStatusDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.adminStatusDate).getDate()).slice(-2):'',
          "Finance Approval":res.financeStatus,
          "Finance Approved By":(res.financeStatus == 'Approved')?res.financeApproved?.name +" On "+ new Date(res.financeStatusDate).getFullYear()+"-"+("0"+(new Date(res.financeStatusDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.financeStatusDate).getDate()).slice(-2):'',
        })
      })
    })
  }


  clear(){
    this.selectedDate = "";
    this.searchTerm = "";
    this.where = {};
    this.page = 1;
    this.selectedProduct = "";
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

  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'lg'});
    this.item= item;
  }


openModal1(content:any){
  this.modalService.open(content, { size: 'fullscreen'});
}

  onSelectedDate(event:any){
    
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = new Date(date[0]);
      var date2 = new Date(date[1]);
      this.where.invoiceDate = {
        $gte: date1,
        $lte: date2
      }
      this.page = 1;
    this.getData();
    }
  }

  onSelectedProduct(event:any){
    this.where.utilityMaster = event;
    this.page = 1;
    this.getData();
  }

  search(event:any){
    this.searchTerm = event.target.value;
    this.page = 1;
    this.getData();
  }

  statusSearch(event:any){
    let status = event.target.value;
    this.where.status = status;
    if(status == ""){
      this.where = {};
    }

    this.getData();
  }

  nextPage(){
    this.page += 1;
    this.getData();
  }

  exportData() {
    var dToday = new Date();
    var monthToday = dToday.getMonth() + 1;
    var dayToday = dToday.getDate();
    var yearToday = dToday.getFullYear();
    var hour = dToday.getHours();
    var min = dToday.getMinutes();
    var sec = dToday.getSeconds();

    var toToday = [yearToday, monthToday, dayToday, hour, min, sec].join('-');
    this.excelS.exportAsExcelFile(this.printData, 'Utility Transactions '+ toToday);
  }

  previousPage(){
    this.page -= 1;
    this.getData();
  }

}
