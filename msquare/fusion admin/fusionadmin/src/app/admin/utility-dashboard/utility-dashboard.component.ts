import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import * as $ from 'jquery'

@Component({
  selector: 'app-utility-dashboard',
  templateUrl: './utility-dashboard.component.html',
  styleUrls: ['./utility-dashboard.component.scss']
})
export class UtilityDashboardComponent implements OnInit {

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

  branchesL:any=0;
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
  all:any="";
  item:any=[]
  exceeded:any="";


  constructor(public authService:AuthenticationService,public apiS:ApiService,public toastr:ToastrService,public modalService:NgbModal) {

  }
  
  ngOnInit(): void {

    this.apiS.getAllBranch(1,{},"","","",10000).subscribe(data=>{
      this.branchesL = data.totalRecords;
    })
    this.apiS.getAllCluster().subscribe(data=>{
      this.clustersL = data.data.length;
      this.clusterData = data.data;
    })
    this.apiS.getAllZone().subscribe(data=>{
      this.zonesL = data.data.length;
      this.zonesData = data.data;
    })
    this.apiS.getAllDivision().subscribe(data=>{
      this.divisionsL = data.data.length;
      this.divisionData = data.data;
    })
    this.apiS.getAllState().subscribe(data=>{
      this.statesL = data.data.length;
      this.stateData = data.data;
    })
    this.apiS.getAllUtilityBill(1,{},"","","",10000).subscribe(data=>{
      this.activeTransactions = data.data;
    })

    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (this.getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    let where:any = {};
    where.invoiceDate = {
      $gte: currentDate,
      $lte: nextDate
    }
    this.apiS.getAllUtilityBill(1,where,"","","",10000).subscribe(data=>{
      this.events = data.data;
    })
    this.apiS.getCurrentTransactionsOverview().subscribe(data=>{
      this.kpi = data.kpi;
      this.chart = data.chart;
    })

    this.apiS.getExceeded().subscribe(data=>{
      this.exceeded = data.exceeded;
      this.all = data.all;
      this.status7 = data.data;
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
    this.apiS.getZoneData().subscribe(data=>{
      this.zones =  data.data;
    });
    this.apiS.getClusterData().subscribe(data=>{
      
      this.clusters =  data.data;
      
    });
    this.apiS.getAllUtilityBill(1,{},"","","",10000).subscribe(res=>{
      this.statUtilityData = res.data;
    });
    this.apiS.getAllCourier(1,{},"","","",10000).subscribe(res=>{
      this.statCourierData = res.data;
    });
    
  }


  onlyUnique(value:any, index:any, self:any) { 
    return self.data?.branch?.zone.indexOf(value) === index;
}
  changeYearSelection(year:any){
    this.salesSelectedName=year;
  }

  getDaysInCurrentMonth(month:any) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
}

  onSelectedDate(event:any){
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = date[0];
      var date2 = date[1];

      let where:any = {};
      where.invoiceDate = {
        $gte: date1,
        $lte: date2
      }
      this.events = [];
      this.apiS.getAllUtilityBill(1,where,"","","",10000).subscribe(data=>{
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

  fullModal(smallDataModal: any) {
    this.modalService.open(smallDataModal, { size: 'fullscreen', windowClass: 'modal-holder' });
  }



}
