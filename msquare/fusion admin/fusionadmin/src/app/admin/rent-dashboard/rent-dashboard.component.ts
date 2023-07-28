import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent-dashboard',
  templateUrl: './rent-dashboard.component.html',
  styleUrls: ['./rent-dashboard.component.scss']
})
export class RentDashboardComponent implements OnInit {

  salesSelectedName = new Date().getFullYear();
  kpi={ 
    totalRaised:0,
        escalatedTransactions:0,
        lastExceeded:0,
        pendingTransactions:0,};
  chart:any;
  selectedDate:any=new Date();
  upcomingSchedulesTasks:any=[];
  activeTransactions:any = [];
  clusters:any = [];
  events:any=[];
  status7: any;
  statUtilitySearchTerm = "";
  statUtilityZoneTerm = "";
  statUtilityStateTerm = "";
  statUtilityClusterTerm = "";
  statUtilityDivisionTerm = "";

  statCourierSearchTerm = "";
  statCourierZoneTerm = "";
  statCourierStateTerm = "";
  statCourierClusterTerm = "";
  statCourierDivisionTerm = "";
  baseURL=environment.baseURL;

  statUtilityData:any = [];
  statCourierData:any = [];

  
  zonesL:any=0;
  clustersL:any=0;
  divisionsL:any=0;
  statesL:any=0;
  dashboardType:any="Utility";
  remark:any="";
  commercialNorth:any=0;
  commercialSouth:any=0;
  commercialWest:any=0;
  commercialEast:any=0;
  domesticNorth:any=0;
  domesticSouth:any=0;
  domesticWest:any=0;
  domesticEast:any=0;
  zones:any=[];
  zonesData:any=[];
  clusterData:any=[];
  stateData:any=[];
  divisionData:any=[];

  rentsL:any=0;
  approvedFinance:any=0;
  pendingRaised:any=0;

  month = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
  currentMonth = this.month[(new Date().getMonth() + 1)];
  previousMonth = this.month[(new Date().getMonth())];
  previousMonth1 = this.month[(new Date().getMonth() - 1)];
  previousMonth2 = this.month[(new Date().getMonth() - 2)];

  cCurrentMonth = 0;
  cPreviousMonth = 0;
  cPreviousMonth1 = 0;
  cPreviousMonth2 = 0;
  dCurrentMonth = 0;
  dPreviousMonth = 0;
  dPreviousMonth1 = 0;
  dPreviousMonth2 = 0;
  item:any="";

  rentBills:any=[];
  

  constructor(public authService:AuthenticationService,public apiS:ApiService,public toastr:ToastrService,public modalService:NgbModal) {

  }
  
  ngOnInit(): void {

    this.apiS.getAllRentBill(1,{},"","","",10000).subscribe(data=>{
      this.rentsL = data.data.length;
      this.rentBills = data.data;
    })
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (this.getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    let where:any = {};
    where.createdAt = {
      $gte: currentDate,
      $lte: nextDate
    }
    this.apiS.getAllRentBill(1,where,"","","",10000).subscribe(data=>{
      this.events = data.data;
    })
    let whereData:any = {};
    whereData.financeStatus = "Approved";
    this.apiS.getAllRentBill(1,whereData,"","","",10000).subscribe(data=>{
      this.approvedFinance = data.data.length;
    })
    this.apiS.getAllPendingRaised().subscribe(data=>{
      this.pendingRaised = data.data.length;
    })
    this.apiS.getAllRentBillByStatus().subscribe(data=>{
      this.cCurrentMonth = data.cCurrentMonth;
      this.cPreviousMonth = data.cPreviousMonth;
      this.cPreviousMonth1 = data.cPreviousMonth1;
      this.cPreviousMonth2 = data.cPreviousMonth2;
      this.dCurrentMonth = data.dCurrentMonth;
      this.dPreviousMonth = data.dPreviousMonth;
      this.dPreviousMonth1 = data.dPreviousMonth1;
      this.dPreviousMonth2 = data.dPreviousMonth2;
    })
    this.apiS.getCurrentTransactionsOverviewForRent().subscribe(data=>{
      this.kpi = data.kpi;
      this.chart = data.chart;
    })
    this.apiS.getExceededConsumption().subscribe(data=>{
      this.commercialEast = data.commercialEastZone;
        this.commercialNorth = data.commercialNorthZone;
        this.commercialSouth = data.commercialSouthZone;
        this.commercialWest = data.commercialWestZone;
        this.domesticEast = data.domesticEastZone;
        this.domesticNorth = data.domesticNorthZone;
        this.domesticSouth = data.domesticSouthZone;
        this.domesticWest = data.domesticWestZone;
    })
  }

  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'lg'});
    this.item= item;
  }

  getDaysInCurrentMonth(month:any) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
}

  onlyUnique(value:any, index:any, self:any) { 
    return self.data?.branch?.zone.indexOf(value) === index;
}
  changeYearSelection(year:any){
    this.salesSelectedName=year;
  }

  onSelectedDate(event:any){
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = date[0];
      var date2 = date[1];
      let where:any = {};
      where.createdAt = {
        $gte: date1,
        $lte: date2
      }
      this.events = [];
      this.apiS.getAllRentBill(1,where,"","","",10000).subscribe(data=>{
        this.events = data.data;
      })
    }
  }

  updateAdminOpen(id:any,index:any){
    const data=JSON.stringify({
      "isOpen":true
    });
    this.apiS.updateUtilityBill(data,id).subscribe(data=>{
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.activeTransactions[index].data.isOpen = true;
        
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }

  updateAdminStatus(id:any,status:any,index:any){
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
            "adminApproved":this.authService.currentUserValue.id
          });
          this.apiS.updateUtilityBill(data,id).subscribe(data=>{
            if (data.status === 'error') {
              this.toastr.error(data.message);
            } else {
              let updatedData = {
                "date":this.activeTransactions[index].date,
                "branch":this.activeTransactions[index].branch._id,
                "branchCode":this.activeTransactions[index].branch.code,
                "branchName":this.activeTransactions[index].branch.name,
                "cluster":this.activeTransactions[index].branch.cluster,
                "zone":this.activeTransactions[index].branch.zone,
                "division":this.activeTransactions[index].branch.division,
                "state":this.activeTransactions[index].branch.state,
                "meter":this.activeTransactions[index].meter,
                "utility":this.activeTransactions[index].utility._id,
                "utilityMaster":this.activeTransactions[index].utility?.utility,
                "billNo":this.activeTransactions[index].billNo,
                "vendorName":this.activeTransactions[index].vendorName,
                "billType":this.activeTransactions[index].meter?.billType,
                "invoiceDate":this.activeTransactions[index].invoiceDate,
                "fromBillDate":this.activeTransactions[index].fromBillDate,
                "toBillDate":this.activeTransactions[index].toBillDate,
                "noOfDays":this.activeTransactions[index].noOfDays,
                "initReading":this.activeTransactions[index].initReading,
                "finalReading":this.activeTransactions[index].finalReading,
                "consumption":this.activeTransactions[index].consumption,
                "chargesPerUnit":this.activeTransactions[index].chargesPerUnit,
                "totalBill":this.activeTransactions[index].totalBill,
                "perTotalBill":this.activeTransactions[index].perTotalBill,
                "billAmount":this.activeTransactions[index].billAmount,
                "lateFee":this.activeTransactions[index].lateFee,
                "arrear":this.activeTransactions[index].arrear,
                "grossAmount":this.activeTransactions[index].grossAmount,
                "dueDate":this.activeTransactions[index].dueDate,
                "fundsToBeTransferred":this.activeTransactions[index].fundsToBeTransferred,
                "branchAccount":this.activeTransactions[index].disbursementBranchAcc,
                "remark":this.activeTransactions[index].remark,
                "billDocument":this.activeTransactions[index].billDocument,
                "verifyStatus":this.activeTransactions[index].verifyStatus,
                "fverifyStatus":this.activeTransactions[index].fverifyStatus,
                "adminStatus":status,
                "adminStatusDate":new Date(),
                "adminStatusRemark":remark.value,
                "adminStatusDocument":this.activeTransactions[index].adminStatusDocument,
                "adminRejectRemark":this.activeTransactions[index].adminRejectDocument,
                "adminRejectDocument":this.activeTransactions[index].adminRejectDocument,
                "adminApproved":this.authService.currentUserValue.id,
                "financeStatus":this.activeTransactions[index].financeStatus,
                "financeStatusDate":this.activeTransactions[index].financeStatusDate,
                "financeStatusRemark":this.activeTransactions[index].financeStatusRemark,
                "financeStatusDocument":this.activeTransactions[index].financeStatusDocument,
                "financeRejectRemark":this.activeTransactions[index].financeRejectRemark,
                "financeRejectDocument":this.activeTransactions[index].financeRejectDocument,
                "financeApproved":this.activeTransactions[index].financeApproved,
                "courier":this.activeTransactions[index].courier,
                "transactionReceipt":this.activeTransactions[index].transactionReceipt,
                "transactionDate":this.activeTransactions[index].transactionDate,
                "transactionAmt":this.activeTransactions[index].transactionAmt,
                "billStatus":this.activeTransactions[index].billStatus
              }
              const aData = JSON.stringify({
                "user": this.authService.currentUserValue.id,
                "utilityBill":id,
                "currentData":this.activeTransactions[index],
                "updatedData":updatedData
              })
              this.apiS.createActivity(aData).subscribe(uResult => {
                if (uResult.status === 'error') {
                  this.toastr.error(uResult.message);
                } else {
                  this.activeTransactions[index].adminStatus = status;
                  this.activeTransactions[index].adminStatusDate = new Date();
                  this.activeTransactions[index].adminStatusRemark = remark.value;
                  if(status == 'Approved'){
                    this.toastr.success("Transaction Approved Successfully");
                  }else{
                    this.toastr.error("Transaction Rejected Successfully");
                  }
                }
              },error=>{
                this.toastr.error(error.message);
              }); 
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

  changeDashboard(event:any) {
    if(event.target.checked){
      this.dashboardType = 'Rent';
    } else {
      this.dashboardType = 'Utility';
    }
  }


}
