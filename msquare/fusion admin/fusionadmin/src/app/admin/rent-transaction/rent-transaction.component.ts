import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExcelService } from 'src/app/core/services/excel.service';

@Component({
  selector: 'app-rent-transaction',
  templateUrl: './rent-transaction.component.html',
  styleUrls: ['./rent-transaction.component.scss']
})
export class RentTransactionComponent implements OnInit {

  @ViewChild('table') table: any;
  @ViewChild('table2') table2: any;
  @ViewChild('table3') table3: any;
  @ViewChild('table4') table4: any;
  @ViewChild('table5') table5: any;
  @ViewChild('table6') table6: any;
  @ViewChild('table7') table7: any;
  dataTable: any;
  dataTable2: any;
  dataTable3: any;
  dataTable4: any;
  dataTable5: any;
  dataTable6: any;
  dataTable7: any;
  breadCrumbItems!: Array<{}>;
  data:any = [];
  item:any
  id="";
  pendingArrear:any="";
  waiver:any="";
  deduction:any="";
  securityDepositAdjust:any="";
  firstRentTransfer:any="";
  terms:any="";
  effectiveDate:any="";
  expiryDate:any="";
  increment:any="";
  totalTransferRent:any="";
  remarks:any="";
  rentbills:any=[];
  allrentbills:any=[];
  searchTerm:any="";

  selectedDate:any = "";
  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  where:any = {};
  printData:any=[];

  activeId:any = "";
  constructor(public api:ApiService,public router:Router,public toastr:ToastrService,public authS:AuthenticationService,public titleS:Title,public appC:AppComponent,
    public modalService:NgbModal,public excelS:ExcelService) {}

  ngOnInit(): void {
    this.titleS.setTitle("Rent - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Rent' , active: true }
    ];

    if(this.authS.currentUserValue.designation.id != 'L1-Finance' && this.authS.currentUserValue.designation.id != 'L2-Finance'){
      this.activeId = 1;
    }else{
      this.activeId = 3;
    }

    this.getData();

    this.api.getAllRentBill(1,{},"","","",10000).subscribe(data=>{
      data.data.map((res:any)=>{
        this.printData.push({
          "Branch":res.branch?.code +" - "+ res.branch?.name,
          "Cluster":res.branch?.cluster,
          "Division":res.branch?.division,
          "State":res.branch?.state,
          "Zone":res.branch?.zone,
          "Landlord Name":res.rent?.landlordName,
          "Mobile No.":res.rent?.mobileNo,
          "Pancard number (Landlord)":res.rent?.panLandlord,
          "Landlord Gst No":res.rent?.landlordgstno,
          "Landlord Bank Account No.":res.rent?.bankAccNo,
          "Landlord Bank IFSC Code":res.rent?.ifscCode,
          "Account Name":res.rent?.accountname,
          "Date":new Date(res.createdAt).getFullYear()+"-"+("0"+(new Date(res.createdAt).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.createdAt).getDate()).slice(-2),
          "Pending Arrear":"₹ "+res.pendingArrear,
          "Waiver":"₹ "+res.waiver,
          "Deduction":"₹ "+res.deduction,
          "Total Transfer Rent":"₹ "+res.totalTransferRent,
          "Increment":"₹ "+res.increment,
          "Expiry Date":new Date(res.expiryDate).getFullYear()+"-"+("0"+(new Date(res.expiryDate).getMonth()+1)).slice(-2)+"-"+("0"+new Date(res.expiryDate).getDate()).slice(-2),
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
    this.searchTerm = "";
    this.getData();
    
  }

  openModal1(content:any){
    this.modalService.open(content, { size: 'fullscreen'});
  }
  
  getData(){
    this.loading = true;
    this.api.getAllRentBill(this.page,this.where,"","",this.searchTerm).subscribe(res=>{
      
      this.allrentbills = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
    });
    this.api.getAllRentTemporary().subscribe(res=>{
      this.data = res.data;
    });
  }

  onSelectedDate(event:any){
    
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = new Date(date[0]);
      var date2 = new Date(date[1]);
      this.where.createdAt = {
        $gte: date1,
        $lte: date2
      }

    this.getData();
    }
  }

  check(){
    this.api.checkRentRaised().subscribe(data => {
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        
        this.toastr.success("Success");
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }

  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'lg'});
    this.item= item;
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
    this.excelS.exportAsExcelFile(this.printData, 'Rent Transactions '+ toToday);
  }

  previousPage(){
    this.page -= 1;
    this.getData();
  }

}
