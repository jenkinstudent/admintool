import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-transdetails',
  templateUrl: './rent-transdetails.component.html',
  styleUrls: ['./rent-transdetails.component.scss']
})
export class RentTransdetailsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  id = "";
  amt = 0;
  item: any = [];
  document: any = "";
  value: any = "";
  remark: any = "";

  baseURL = environment.baseURL;
  constructor(public _location: Location, public titleS: Title, public appC: AppComponent, public route: ActivatedRoute, public apiS: ApiService,
    public toastr: ToastrService, public authS: AuthenticationService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.titleS.setTitle("Details - " + this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Rent' },
      { label: 'Details', active: true }
    ];
    this.route.params.subscribe((data: any) => {
      this.id = data.id;
      this.apiS.getSingleRentBill(this.id).subscribe(data => {
        this.item = data.data;
        console.log(this.authS.hasVerifiedPermission('rent', (this.item.isTds) ? this.item.totalRentAfterDeduction : this.item.totalMonthlyRent, this.item.verifyStatus))
      })
    })
  }

  updateAdminStatus(status: any) {
    let verifyStatus: any;
    let fverifyStatus: any;
    if (status == 'Rejected') {
      const data = JSON.stringify({
        "adminStatus": status,
        "verifyStatus": [],
        "fverifyStatus": [],
        "rework": true,
        "adminStatusDate": new Date(),
        "adminRejectRemark": this.remark,
        "adminRejectDocument": this.document,
        "rejectedBy": this.authS.currentUserValue.id,
        "updateAdminApproveStatus": false
      });
      this.apiS.updateRentBill(data, this.id).subscribe(data => {
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.adminStatus = status;
          this.item.adminStatusDate = new Date();
          this.item.adminRejectRemark = this.remark;
          this.item.adminRejectDocument = this.document;
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
        "adminStatusRemark": this.remark,
        "adminStatusDocument": this.document,
        "adminApproved": this.authS.currentUserValue.id,
        "rework": false,
        "updateAdminApproveStatus": true
      });
      this.apiS.updateRentBill(data, this.id).subscribe(data => {
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.adminStatus = status;
          this.item.adminStatusDate = new Date();
          this.item.adminStatusRemark = this.remark;
          this.item.adminStatusDocument = this.document;
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

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  openModal1(content: any, value: any) {
    this.value = value;
    this.modalService.open(content, { size: 'md' });
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

  updateVerifiyStatus() {
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
    this.apiS.updateRentBill(data, this.id).subscribe(data => {
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.remark = "";
        this.document = "";
        this.modalService.dismissAll();
        this.toastr.success("Transaction Verified Successfully");

      }
    }, error => {
      this.toastr.error(error.message);
    });

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
        "rework": true,
        "financeStatusDate": new Date(),
        "financeRejectRemark": this.remark,
        "financeRejectDocument": this.document,
        "rejectedBy": this.authS.currentUserValue.id,
        "updateFinanceApproveStatus": false
      });
      this.apiS.updateRentBill(data, this.item._id).subscribe(data => {
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.financeStatus = status;
          this.item.financeStatusDate = new Date();
          this.item.financeRejectRemark = this.remark;
          this.item.financeRejectDocument = this.document;
          this.remark = "";
          this.document = "";
          this.toastr.error("Transaction Rejected Successfully");
          this.modalService.dismissAll();
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
        "updateFinanceApproveStatus": true
      });
      this.apiS.updateRentBill(data, this.item._id).subscribe(data => {
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
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
    let index = this.item.fverifyStatus.findIndex(
      (element: any) => element.status === 'Pending'
    );
    this.item.fverifyStatus[index].status = 'Verified';
    this.item.fverifyStatus[index].user = this.authS.currentUserValue.id;
    this.item.fverifyStatus[index].statusUpdatedOn = new Date();
    this.item.fverifyStatus[index].remark = this.remark;
    this.item.fverifyStatus[index].document = this.document;
    const data = JSON.stringify({
      "fverifyStatus": this.item.fverifyStatus,
      "rework": false,
      "updateFinanceVerifyStatus": true,
      "index": index
    });
    this.apiS.updateRentBill(data, this.id).subscribe(data => {
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.remark = "";
        this.document = "";
        this.modalService.dismissAll();
        this.toastr.success("Transaction Verified Successfully");

      }
    }, error => {
      this.toastr.error(error.message);
    });
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
