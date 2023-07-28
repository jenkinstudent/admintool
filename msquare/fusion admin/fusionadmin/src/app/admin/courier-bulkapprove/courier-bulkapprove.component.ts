import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-courier-bulkapprove',
  templateUrl: './courier-bulkapprove.component.html',
  styleUrls: ['./courier-bulkapprove.component.scss']
})
export class CourierBulkapproveComponent implements OnInit {

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
    this.titleS.setTitle("Courier - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Courier' , active: true }
    ];
    this.getData();
  }

  check(index:any){
    this.data[index].checked = true;
  }

  allAdminSelection(event:any){
    if(event.target.checked){
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Pending' && item.financeStatus == 'Pending' && this.authS.hasApprovePermission('courier',item.grossAmount, item.verifyStatus)){
          item.checked = true;
        }   
      });
    }else{
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Pending' && item.financeStatus == 'Pending' && this.authS.hasApprovePermission('courier',item.grossAmount, item.verifyStatus)){
          item.checked = false;
        }   
      });
    }
  }

  allFinanceSelection(event:any){
    if(event.target.checked){
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Approved' && item.financeStatus == 'Pending' && this.authS.hasFApprovePermission('courier',item.grossAmount, item.fverifyStatus)){
          item.checked = true;
        }   
      });
    }else{
      this.data.map((item:any)=>{
        if(item.adminStatus == 'Approved' && item.financeStatus == 'Pending' && this.authS.hasFApprovePermission('courier',item.grossAmount, item.fverifyStatus)){
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

    this.api.getAllCourier(1,{},"","","",10000).subscribe(res=>{
      this.data = res.data;
      console.log(this.data);
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
      this.api.updateCourier(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
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
      this.api.updateCourier(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
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
      this.api.updateCourier(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
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
      this.api.updateCourier(data,this.checkedData[i].id).subscribe(data=>{
        if (data.status === 'error') {
          this.toastr.error(data.message);
        } else {
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
