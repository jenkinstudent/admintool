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
  selector: 'app-courier-transaction',
  templateUrl: './courier-transaction.component.html',
  styleUrls: ['./courier-transaction.component.scss']
})
export class CourierTransactionComponent implements OnInit {

  @ViewChild('table') table: any;
  @ViewChild('table2') table2: any;
  dataTable: any;
  dataTable2: any;
  breadCrumbItems!: Array<{}>;
  data: any = [];
  currentMonth: any = [];
  printData: any = [];
  item: any;
  branchCode: any = "";
  searchTerm: any = "";
  selectGst: any = "";

  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  where: any = {};

  constructor(public api: ApiService, public modalService: NgbModal, public router: Router, public toastr: ToastrService, public authS: AuthenticationService, public titleS: Title, public appC: AppComponent,
    public excelS: ExcelService) { }

  ngOnInit(): void {
    this.titleS.setTitle("Courier - " + this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Courier', active: true }
    ];

    this.getData();
    this.api.getSingleUser(this.authS.currentUserValue.id).subscribe(data => {
      this.branchCode = data.data.branchId?.code;
    })
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (this.getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    this.api.getAllCourier(1, { date: { $gte: currentDate, $lte: nextDate } }, "", "", "", 10000).subscribe(data => {
      this.currentMonth = data.data;
    });
    this.api.getAllCourier(1, {}, "", "", "", 10000).subscribe(data => {
      data.data.map((res: any) => {
        this.printData.push({
          "Date": new Date(res.date).getFullYear() + "-" + ("0" + (new Date(res.date).getMonth() + 1)).slice(-2) + "-" + ("0" + new Date(res.date).getDate()).slice(-2),
          "Branch Name": res.branch?.code + " - " + res.branch?.name,
          "Branch Address": res.branch?.address,
          "Cluster": res.branch?.cluster,
          "State": res.branch?.state,
          "Vendor Name": res.vendorName,
          "Vendor GST No.": res.vendorGstNo,
          "Invoice No.": res.invoiceNo,
          "Destination": res.destination,
          "Courier Charges": res.courierChanges,
          "GST Charges": res.gstChanges,
          "Total Amount": res.totalAmount,
          "Admin Approval": res.adminStatus,
          "Admin Approved By": (res.adminStatus == 'Approved') ? res.adminApproved?.name + " On " + new Date(res.adminStatusDate).getFullYear() + "-" + ("0" + (new Date(res.adminStatusDate).getMonth() + 1)).slice(-2) + "-" + ("0" + new Date(res.adminStatusDate).getDate()).slice(-2) : '',
          "Finance Approval": res.financeStatus,
          "Finance Approved By": (res.financeStatus == 'Approved') ? res.financeApproved?.name + " On " + new Date(res.financeStatusDate).getFullYear() + "-" + ("0" + (new Date(res.financeStatusDate).getMonth() + 1)).slice(-2) + "-" + ("0" + new Date(res.financeStatusDate).getDate()).slice(-2) : '',
        })
      })
    })
  }

  getDaysInCurrentMonth(month: any) {
    const date = new Date();

    return new Date(
      date.getFullYear(),
      month,
      0
    ).getDate();
  }

  getData() {
    this.loading = true;
    this.api.getAllCourier(this.page, this.where, "", "", this.searchTerm).subscribe(res => {
      this.data = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
    });
  }

  onSelectedGst(event: any) {
    this.where = {};
    if (event == 'With GST') {
      this.where.$and = [{ vendorGstNo: { $exists: true }},{ vendorGstNo: {$ne: ''} }];
    } else {
      this.where.$or = [{ vendorGstNo: { $exists: false }},{ vendorGstNo: '' }];
    }
    this.page = 1;
    this.getData();
  }

openModal(content: any, item: any){
  this.modalService.open(content, { size: 'lg' });
  this.item = item;
}

openModal1(content: any){
  this.modalService.open(content, { size: 'fullscreen' });
}

edit(id: any) {
  this.router.navigate(['/branch/courier/action/edit'], {
    queryParams: {
      id: id
    }
  })
}

search(event: any){
  this.searchTerm = event.target.value;
  this.page = 1;
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
  this.excelS.exportAsExcelFile(this.printData, 'Courier Transactions ' + toToday);
}

clear(){
  this.searchTerm = "";
  this.where = {};
  this.page = 1;
  this.selectGst = "";
  this.getData();
}

previousPage(){
  this.page -= 1;
  this.getData();
}

nextPage(){
  this.page += 1;
  this.getData();
}

}
