import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courier-details',
  templateUrl: './courier-details.component.html',
  styleUrls: ['./courier-details.component.scss']
})
export class CourierDetailsComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  id="";
  amt=0;
  item:any=[];

  remark:any = "";
  value:any = "";

  status:any="";
  baseURL=environment.baseURL;
  constructor(public _location:Location, public titleS:Title,public appC:AppComponent,public route:ActivatedRoute,public apiS:ApiService,
    public toastr:ToastrService,public authS:AuthenticationService,public modalService:NgbModal) { }

  ngOnInit(): void {
    this.titleS.setTitle("Details - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Courier' },
      { label: 'Details' , active: true }
    ];
    this.route.params.subscribe((data:any)=>{
      this.id= data.id;
      this.apiS.getSingleCourier(this.id).subscribe(data=>{
        this.item = data.data;
      })
    })
    console.log(this.authS.hasVerifiedPermission('courier',this.item.grossAmount, this.item.verifyStatus))
  }

  updateStatus(status:any){
    const data = JSON.stringify({
      "status":status
    });
    this.apiS.updateCourier(data,this.item._id).subscribe(result => {
      if (result.status === 'error') {
        this.toastr.error(result.message);
      } else {
        this.toastr.success("Status Updated Successfully");
        this.item.status = status;
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }

  openModal(content:any){
    this.modalService.open(content, { size: 'lg'});
  }

  openModal1(content: any, value: any) {
    this.value = value;
    this.modalService.open(content, { size: 'md' });
  }

  updateFinanceStatus(status:any){
    let verifyStatus:any;
    let fverifyStatus:any;
    if(status == 'Rejected'){
      verifyStatus = [];
      fverifyStatus = [];
      const data=JSON.stringify({
        "financeStatus":status,
        "fverifyStatus":fverifyStatus,
        "verifyStatus":verifyStatus,
        "rework":true,
        "rejectedBy":this.authS.currentUserValue.id,
        "updateFinanceApproveStatus":false,
        "financeRejectRemark": this.remark,
        "financeStatusDate": new Date(),
      });
      this.apiS.updateCourier(data,this.item._id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.financeStatus = status;
          this.item.financeRejectRemark = this.remark;
          this.item.financeStatusDate = new Date()
          this.remark = "";
            this.toastr.error("Transaction Rejected Successfully");
            this.modalService.dismissAll();
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }else{
      verifyStatus = this.item.verifyStatus;
      fverifyStatus = this.item.fverifyStatus;
      const data=JSON.stringify({
        "financeStatus":status,
        "fverifyStatus":fverifyStatus,
        "verifyStatus":verifyStatus,
        "financeStatusDate":new Date(),
        "financeStatusRemark":this.remark,
        "financeApproved":this.authS.currentUserValue.id,
        "rework":false,
        "updateFinanceApproveStatus":true
      });
      this.apiS.updateCourier(data,this.item._id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.financeStatus = status;
          this.item.financeStatusDate = new Date();
          this.item.financeStatusRemark = this.remark;
          this.remark = "";
          this.modalService.dismissAll();
          this.toastr.success("Transaction Approved Successfully");
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
        
  }


  updateAdminStatus(status:any){
    let verifyStatus:any;
    let fverifyStatus:any;
    if(status == 'Rejected'){
      const data=JSON.stringify({
        "adminStatus":status,
        "verifyStatus":[],
        "fverifyStatus":[],
        "rework":true,
        "rejectedBy":this.authS.currentUserValue.id,
        "updateAdminApproveStatus":false,
        "adminRejectRemark": this.remark,
        "adminStatusDate": new Date(),
      });
      this.apiS.updateCourier(data,this.id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.adminStatus = status;
          this.item.adminRejectRemark = this.remark;
          this.item.adminStatusDate = new Date()
          this.remark = "";
          this.toastr.success("Transaction Rejected Successfully");
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }else{
      verifyStatus = this.item.verifyStatus;
      fverifyStatus = this.item.fverifyStatus;
      const data=JSON.stringify({
        "adminStatus":status,
        "verifyStatus":verifyStatus,
        "adminStatusDate":new Date(),
        "adminStatusRemark": this.remark,
        "adminApproved":this.authS.currentUserValue.id,
        "rework":false,
        "updateAdminApproveStatus":true
      });
      this.apiS.updateCourier(data,this.id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
          this.item.adminStatus = status;
          this.item.adminStatusDate = new Date();
          this.item.adminStatusRemark = this.remark;
          this.remark = "";
          this.toastr.success("Transaction Approved Successfully");
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
}

updateFVerifiyStatus(){
  let index = this.item.fverifyStatus.findIndex(
    (element:any) => element.status === 'Pending'
  );
  this.item.fverifyStatus[index].status = 'Verified';
  this.item.fverifyStatus[index].user = this.authS.currentUserValue.id;
  this.item.fverifyStatus[index].remark = this.remark;
  this.item.fverifyStatus[index].statusUpdatedOn = new Date();
  const data=JSON.stringify({
    "fverifyStatus":this.item.fverifyStatus,
    "rework":false,
    "updateFinanceVerifyStatus":true,
    "index":index
  });
  this.apiS.updateCourier(data,this.id).subscribe(data=>{
    if (data.status === 'error') {
      this.toastr.error(data.message);
    } else {
      this.remark = "";
      this.toastr.success("Transaction Verified Successfully");
    }
  },error=>{
    this.toastr.error(error.message);
  });
   
}

updateVerifiyStatus(){
  let index = this.item.verifyStatus.findIndex(
    (element:any) => element.status === 'Pending'
  );
  this.item.verifyStatus[index].status = 'Verified';
  this.item.verifyStatus[index].user = this.authS.currentUserValue.id;
  this.item.verifyStatus[index].statusUpdatedOn = new Date();
  this.item.fverifyStatus[index].remark = this.remark;
  const data=JSON.stringify({
    "verifyStatus":this.item.verifyStatus,
    "rework":false,
    "updateAdminVerifyStatus":true,
    "index":index
  });
  this.apiS.updateCourier(data,this.id).subscribe(data=>{
    if (data.status === 'error') {
      this.toastr.error(data.message);
    } else {
      this.remark = "";
      this.toastr.success("Transaction Verified Successfully");
      
    }
  },error=>{
    this.toastr.error(error.message);
  });
}




}
