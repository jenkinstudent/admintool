import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { DatePipe, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-utility-transdetails',
  templateUrl: './utility-transdetails.component.html',
  styleUrls: ['./utility-transdetails.component.scss']
})
export class UtilityTransdetailsComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  id = "";
  amt = 0;
  item: any = [];

  date: any = "";
  amount: any = "";
  receipt: any = "";
  branchAccount: any = "";
  remark: any = "";
  status: any = "";

  document: any = "";
  value: any = "";

  baseURL = environment.baseURL;
  constructor(public _location: Location, public titleS: Title, public appC: AppComponent, public modalService: NgbModal, public route: ActivatedRoute, public apiS: ApiService,
    public toastr: ToastrService, public authS: AuthenticationService, public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.titleS.setTitle("Details - " + this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Utility' },
      { label: 'Details', active: true }
    ];
    this.route.params.subscribe((data: any) => {
      this.id = data.id;
      this.apiS.getSingleUtilityBill(this.id).subscribe(data => {
        this.item = data.data;
        this.amount = this.item.grossAmount;
        this.branchAccount = this.item.branchAccount;
        this.date = this.datePipe.transform(new Date(),'yyyy-MM-dd')
      })
    })

  }

  getViewBillStatus() {
    if (_.some(this.item.verifyStatus, ['role', "business"])) {
      let index = this.item.verifyStatus.findIndex(
        (element: any) => element.role === 'business' && element.status == 'Verified'
      );
      if (index != -1) {
        let index = this.item.verifyStatus.findIndex(
          (element: any) => element.role === 'L1-Admin' && element.status == 'Pending'
        );

        if (index != -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      let index = this.item.verifyStatus.findIndex(
        (element: any) => element.role === 'L1-Admin' && element.status == 'Pending'
      );

      if (index != -1) {
        return true;
      } else {
        return false;
      }
    }
  }

  getFViewBillStatus() {
    let index = this.item.fverifyStatus.findIndex(
      (element: any) => element.role === 'L1-Finance' && element.status == 'Pending'
    );
    if (index != -1) {
      return true;
    } else {
      return false;
    }
  }

  updateAdminStatus(status: any) {
    let verifyStatus: any;
    let fverifyStatus: any;
    if (status == 'Rejected') {
      verifyStatus = [];
      fverifyStatus = [];
      const data = JSON.stringify({
        "adminStatus": status,
        "verifyStatus": verifyStatus,
        "fverifyStatus": fverifyStatus,
        "rework": true,
        "adminStatusDate": new Date(),
        "adminRejectRemark": this.remark,
        "adminRejectDocument": this.document,
        "rejectedBy": this.authS.currentUserValue.id,
        "updateAdminApproveStatus": false
      });
      this.apiS.updateUtilityBill(data, this.id).subscribe(data => {
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
            "verifyStatus":verifyStatus,
            "fverifyStatus":fverifyStatus,
            "adminStatus":status,
            "adminStatusDate":new Date(),
            "adminStatusRemark":this.item.adminStatusRemark,
            "adminStatusDocument":this.item.adminStatusDocument,
            "adminRejectRemark":this.remark,
            "adminRejectDocument":this.document,
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
          this.item.adminRejectRemark = this.remark;
          this.item.adminRejectDocument = this.document;
          this.item.adminStatusDate = new Date();
          this.remark = "";
          this.document = "";
          this.modalService.dismissAll();
          this.toastr.success("Transaction Rejected Successfully");
        }
      }, error => {
        this.toastr.error(error.message);
      });
    } else {
      verifyStatus = this.item.verifyStatus;
      fverifyStatus = this.item.fverifyStatus;
      const data = JSON.stringify({
        "adminStatus": status,
        "verifyStatus": verifyStatus,
        "adminStatusDate": new Date(),
        "adminApproved": this.authS.currentUserValue.id,
        "rework": false,
        "adminStatusRemark": this.remark,
        "adminStatusDocument": this.document,
        "updateAdminApproveStatus": true
      });
      this.apiS.updateUtilityBill(data, this.id).subscribe(data => {
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
            "verifyStatus":verifyStatus,
            "fverifyStatus":fverifyStatus,
            "adminStatus":status,
            "adminStatusDate":new Date(),
            "adminStatusRemark":this.remark,
            "adminStatusDocument":this.document,
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
          this.item.adminStatusRemark = this.remark;
          this.item.adminStatusDocument = this.document;
          this.remark = "";
          this.document = "";
          this.toastr.success("Transaction Approved Successfully");
        }
      }, error => {
        this.toastr.error(error.message);
      });
    }
  }

  updateFinanceStatus(status: any) {
    let verifyStatus: any;
    let fverifyStatus: any;
    if (status == 'Rejected') {
      verifyStatus = [];
      fverifyStatus = [];
      const data = JSON.stringify({
        "financeStatus": status,
        "fverifyStatus": fverifyStatus,
        "verifyStatus": verifyStatus,
        "financeStatusDate": new Date(),
        "rework": true,
        "rejectedBy": this.authS.currentUserValue.id,
        "financeRejectRemark": this.remark,
        "financeRejectDocument": this.document,
        "updateFinanceApproveStatus": false
      });
      this.apiS.updateUtilityBill(data, this.item._id).subscribe(data => {
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
            "verifyStatus":verifyStatus,
            "fverifyStatus":fverifyStatus,
            "adminStatus":this.item.adminStatus,
            "adminStatusDate":this.item.adminStatusDate,
            "adminStatusRemark":this.item.adminStatusRemark,
            "adminStatusDocument":this.item.adminStatusDocument,
            "adminRejectRemark":this.item.adminRejectRemark,
            "adminRejectDocument":this.item.adminRejectDocument,
            "adminApproved":this.item.adminApproved,
            "financeStatus":status,
            "financeStatusDate":new Date(),
            "financeStatusRemark":this.item.financeStatusRemark,
            "financeStatusDocument":this.item.financeStatusDocument,
            "financeRejectRemark":this.remark,
            "financeRejectDocument":this.document,
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
          this.item.financeStatus = status;
          this.item.financeStatusDate = new Date();
          this.item.financeRejectRemark = this.remark;
          this.item.financeRejectDocument = this.document;
          this.remark = "";
          this.document = "";
          this.modalService.dismissAll();
          this.toastr.error("Transaction Rejected Successfully");
        }
      }, error => {
        this.toastr.error(error.message);
      });
    } else {
      verifyStatus = this.item.verifyStatus;
      fverifyStatus = this.item.fverifyStatus;
      const data = JSON.stringify({
        "financeStatus": status,
        "fverifyStatus": fverifyStatus,
        "verifyStatus": verifyStatus,
        "financeStatusDate": new Date(),
        "financeApproved": this.authS.currentUserValue.id,
        "rework": false,
        "financeStatusRemark": this.remark,
        "financeStatusDocument": this.document,
        "updateFinanceApproveStatus": true
      });
      this.apiS.updateUtilityBill(data, this.item._id).subscribe(data => {
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
            "verifyStatus":verifyStatus,
            "fverifyStatus":fverifyStatus,
            "adminStatus":this.item.adminStatus,
            "adminStatusDate":this.item.adminStatusDate,
            "adminStatusRemark":this.item.adminStatusRemark,
            "adminStatusDocument":this.item.adminStatusDocument,
            "adminRejectRemark":this.item.adminRejectRemark,
            "adminRejectDocument":this.item.adminRejectDocument,
            "adminApproved":this.item.adminApproved,
            "financeStatus":status,
            "financeStatusDate":new Date(),
            "financeStatusRemark":this.remark,
            "financeStatusDocument":this.document,
            "financeRejectRemark":this.item.financeRejectRemark,
            "financeRejectDocument":this.item.financeRejectDocument,
            "financeApproved":this.authS.currentUserValue.id,
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
          this.item.financeStatus = status;
          this.item.financeStatusDate = new Date();
          this.item.financeStatusRemark = this.remark;
          this.item.financeStatusDocument = this.document;
          this.remark = "";
          this.document = "";
          this.modalService.dismissAll();
          this.toastr.success("Transaction Approved Successfully");
        }
      }, error => {
        this.toastr.error(error.message);
      });
    }
  }

  updateFVerifiyStatus() {
    if(this.amount > this.item.grossAmount){
      this.toastr.error("Please enter amount less than equal to gross amount");
      return;
    }

    let index = this.item.fverifyStatus.findIndex(
      (element: any) => element.status === 'Pending'
    );
    // let index = _.findIndex(this.item.fverifyStatus, ['slab._id', this.authS.currentUserValue.permission.utilitySlab._id]);
    this.item.fverifyStatus[index].status = 'Verified';
    this.item.fverifyStatus[index].user = this.authS.currentUserValue.id;
    this.item.fverifyStatus[index].statusUpdatedOn = new Date();
    this.item.fverifyStatus[index].remark = this.remark;
    this.item.fverifyStatus[index].document = this.document;
    const data = JSON.stringify({
      "fverifyStatus": this.item.fverifyStatus,
      "rework": false,
      "updateFinanceVerifyStatus": true,
      "branchAccount": this.branchAccount,
      "transactionDate": this.date,
      "transactionReceipt": this.receipt,
      "transactionAmt": this.amount,
      "index": index
    });
    this.apiS.updateUtilityBill(data, this.id).subscribe(data => {
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
          "branchAccount":this.branchAccount,
          "remark":this.item.remark,
          "billDocument":this.item.billDocument,
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
          "transactionReceipt":this.receipt,
          "transactionDate":this.date,
          "transactionAmt":this.amount,
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
        this.item.branchAccount = this.branchAccount;
        this.item.transactionDate = this.date;
        this.item.transactionReceipt = this.receipt;
        this.item.transactionAmt = this.amount;
        this.branchAccount = "";
        this.date = "";
        this.receipt = "";
        this.amount = "";
        this.remark = "";
        this.document = "";
        this.modalService.dismissAll();
        this.toastr.success("Transaction Verified Successfully");

      }
    }, error => {
      this.toastr.error(error.message);
    });
  }

  uploadTransactionReceipt(event: any) {
    if (event.target.files) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);

      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.receipt = res.data.url;
        }
      });

    }
  }

  uploadDocument(event: any) {
    if (event.target.files) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);

      this.apiS.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.document = res.data.url;
        }
      });

    }
  }


  updateFinanceOpen(id: any) {
    const data = JSON.stringify({
      "isFOpen": true,
      "rework": false
    });
    this.apiS.updateUtilityBill(data, id).subscribe(data => {
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.item.isFOpen = true;

      }
    }, error => {
      this.toastr.error(error.message);
    });
  }


  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }




  openModal1(content: any, value: any) {
    this.value = value;
    this.modalService.open(content, { size: 'md' });
  }


  updateVerifiyStatus() {
    if (this.authS.currentUserValue.roleProfile == 'business') {
      let index = this.item.verifyStatus.findIndex(
        (element: any) => element.slab._id === this.authS.currentUserValue.permission.utilitySlab._id && element.status === 'Pending'
      );
      // let index = _.findIndex(this.item.verifyStatus, ['slab._id', this.authS.currentUserValue.permission.utilitySlab._id]);
      this.item.verifyStatus[index].status = 'Verified';
      this.item.verifyStatus[index].user = this.authS.currentUserValue.id;
      this.item.verifyStatus[index].statusUpdatedOn = new Date();
      this.item.verifyStatus[index].remark = this.remark;
      this.item.verifyStatus[index].document = this.document;
      const data = JSON.stringify({
        "verifyStatus": this.item.verifyStatus,
        "rework": false,
        "updateAdminVerifyStatus": true,
        "index": index
      });
      this.apiS.updateUtilityBill(data, this.id).subscribe(data => {
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
          this.remark = "";
          this.document = "";
          this.modalService.dismissAll();
          this.toastr.success("Transaction Verified Successfully");

        }
      }, error => {
        this.toastr.error(error.message);
      });
    } else if (this.authS.currentUserValue.roleProfile == 'admin') {

      let index = this.item.verifyStatus.findIndex(
        (element: any) => element.status === 'Pending'
      );
      this.item.verifyStatus[index].status = 'Verified';
      this.item.verifyStatus[index].user = this.authS.currentUserValue.id;
      this.item.verifyStatus[index].statusUpdatedOn = new Date();
      this.item.verifyStatus[index].remark = this.remark;
      this.item.verifyStatus[index].document = this.document;
      const data = JSON.stringify({
        "verifyStatus": this.item.verifyStatus,
        "rework": false,
        "updateAdminVerifyStatus": true,
        "index": index
      });
      this.apiS.updateUtilityBill(data, this.id).subscribe(data => {
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
          this.remark = "";
          this.document = "";
          this.modalService.dismissAll();
          this.toastr.success("Transaction Verified Successfully");
        }
      }, error => {
        this.toastr.error(error.message);
      });

    }

  }

  updateAdminOpen(id: any) {
    const data = JSON.stringify({
      "isOpen": true,
      "rework": false
    });
    this.apiS.updateUtilityBill(data, id).subscribe(data => {
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.item.isOpen = true;

      }
    }, error => {
      this.toastr.error(error.message);
    });
  }

}
