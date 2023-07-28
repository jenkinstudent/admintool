import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  salesSelectedName = new Date().getFullYear();
  kpi={ 
    noOfTotalTransaction:0,
    noOfExceededTransaction:0,
    totalTransactionAmt:0,
    totalExceededAmt:0};
  chart:any;
  selectedDate:any=new Date();
  upcomingSchedulesTasks:any=[];
  activeTransactions:any = [];
  clusters:any = [];
  events:any=[];
  status7: any;

  branchesL:any=0;
  zonesL:any=0;
  clustersL:any=0;
  divisionsL:any=0;
  dashboardType:any="Utility";

  total:any=0;
  approvedAdmin:any=0;
  approvedFinance:any=0;
  pendingTransactions:any=0;
  exceeded:any=[];
  all:any="";
  exceededU:any="";
  item:any=[];
  statCourierData:any=[];

  constructor(public authService:AuthenticationService,public apiS:ApiService,public modalService:NgbModal) { }

  ngOnInit(): void {

    this.apiS.getAllBranch().subscribe(data=>{
      this.branchesL = data.data.length;
    })
    this.apiS.getAllCluster().subscribe(data=>{
      this.clustersL = data.data.length;
    })
    this.apiS.getAllZone().subscribe(data=>{
      this.zonesL = data.data.length;
    })
    this.apiS.getAllDivision().subscribe(data=>{
      this.divisionsL = data.data.length;
    });
    this.apiS.getCountUtilityBillByBranch(this.authService.currentUserValue.id).subscribe(data=>{
      this.total = data.total;
      this.approvedAdmin = data.approvedAdmin;
      this.approvedFinance = data.approvedFinance;
      this.pendingTransactions = data.pendingTransactions;
    });
    this.apiS.getCurrentTransactionsOverviewByBranch(this.authService.currentUserValue.id).subscribe(data=>{
      this.kpi = data.kpi;
      this.chart = data.chart;
    });





    this.apiS.getAllUtilityBill(1,{},"","","",10000).subscribe(res=>{
      this.activeTransactions = res.data;
      
    });

    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (this.getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    let where:any = {};
    where.invoiceDate = {
      $gte: currentDate,
      $lte: nextDate
    }
    

    this.apiS.getAllUtilityBill(1,where,"","","",10000).subscribe(res=>{
      this.events = res.data;
    });
    this.apiS.getExceededConsumptionByBranch(this.authService.currentUserValue.id).subscribe(data=>{
      this.exceeded = data.data;
    })
    this.apiS.getExceeded().subscribe(data=>{
      this.exceededU = data.exceeded;
      this.all = data.all;
      this.status7 = data.data;
    })
    this.apiS.getAllCourierByBranch(this.authService.currentUserValue.id).subscribe(res=>{
      this.statCourierData = res.data;
    });
  }

  changeYearSelection(year:any){
    this.salesSelectedName=year;
  }

  onSelectedDate(event:any){
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = new Date(date[0]);
      var date2 = new Date(date[1]);

      let where:any = {};
      where.invoiceDate = {
        $gte: date1,
        $lte: date2
      }

      this.apiS.getAllUtilityBill(1,where,"","","",10000).subscribe(res=>{
        this.events=[];
        this.events = res.data;
      });
    }
  }


  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'lg'});
    this.item= item;
  }
  
  changeDashboard(event:any) {

    if(event.target.checked){
      this.dashboardType = 'Rent';
    } else {
      this.dashboardType = 'Utility';
    }
  }


  getDaysInCurrentMonth(month:any) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
}

}
