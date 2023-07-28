import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  @ViewChild('courierInvChild') courierInvChild!:ElementRef;
  breadCrumbItems!: Array<{}>;

  baseURL=environment.baseURL;
  label = 'Create Courier';
  loader = false;
  action = 1;
  edit=false;

  utility:any=[];
  date:any=new Date().getFullYear()+"-"+("0"+((new Date().getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date().getDate()).slice(-2);
  branch:any="";
  branchCode:any="";
  branchName:any="";
  branchAddress:any="";
  cluster:any="";
  state:any="";
  vendorName:any="";
  vendorGstNo:any="";
  invoiceNo:any="";
  origination:any="";
  destination:any="";
  courierChanges:any="";
  gstChanges:any="";
  totalAmount:any="";
  courierInvoice:any="";
  status:any="";
  id:any="";

  items:any=[];
  branches:any=[];
  clusters:any=[];
  verifyArray:any=[];
  fverifyArray:any=[];
  financeStatus:any="";
  adminStatus:any="";

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router,
    public authS:AuthenticationService) {}

  ngOnInit(): void {
    this.branchCode = this.authS.currentUserValue.permission?.branch[0].code;
    this.branchName = this.authS.currentUserValue.permission?.branch[0].name;
    this.branchAddress = this.authS.currentUserValue.permission?.branch[0].address;
    this.branch = this.authS.currentUserValue.permission?.branch[0]._id;
    this.state = this.authS.currentUserValue.permission?.branch[0].state;
    this.cluster = this.authS.currentUserValue.permission?.branch[0].cluster;
    this.origination = this.authS.currentUserValue.permission?.branch[0].name;
    
    this.apiS.getAllBranchForSuperAdmin().subscribe(data=>{
      this.branches = data.data;
    })
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.breadCrumbItems = [
          { label: 'Courier' },
          { label: 'Create Courier', active: true }
        ];
        this.label= "Create Courier";
          this.titleS.setTitle("Create Courier - "+this.appC.title);
      }else if(data.action == 'view'){
        this.action = 0;
        this.breadCrumbItems = [
          { label: 'Courier' },
          { label: 'View Courier', active: true }
        ];
        this.label= "View Courier";
        this.titleS.setTitle("View Courier - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleCourier(editParam.id).subscribe(res=>{
            this.date =new Date(res.data.date).getFullYear()+"-"+("0"+((new Date(res.data.date).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.date).getDate()).slice(-2);
            this.items=res.data.utility;
            this.branch=res.data.branch;
            this.branchCode=res.data.branch?.code;
            this.branchName=res.data.branch?.name;
            this.branchAddress=res.data.branch?.address;
            this.cluster=res.data.cluster;
            this.state=res.data.state;
            this.vendorName=res.data.vendorName;
            this.vendorGstNo=res.data.vendorGstNo;
            this.invoiceNo=res.data.invoiceNo;
            this.origination=res.data.origination;
            this.destination=res.data.destination;
            this.courierChanges=res.data.courierChanges;
            this.gstChanges=res.data.gstChanges;
            this.totalAmount=res.data.totalAmount;
            this.courierInvoice=res.data.courierInvoice;
            this.verifyArray = res.data.verifyStatus;
            this.fverifyArray = res.data.fverifyStatus;
            this.financeStatus = res.data.financeStatus;
            this.adminStatus = res.data.adminStatus;
            this.status = res.data.status;
          })
        });
      }else{
        this.edit=true;
        this.breadCrumbItems = [
          { label: 'Courier' },
          { label: 'Edit Courier', active: true }
        ];
        this.label= "Edit Courier";
        this.titleS.setTitle("Edit Courier - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleCourier(editParam.id).subscribe(res=>{
            this.date =new Date(res.data.date).getFullYear()+"-"+("0"+((new Date(res.data.date).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.date).getDate()).slice(-2);
            this.items=res.data.utility;
            this.branch=res.data.branch;
            this.branchCode=res.data.branch?.code;
            this.branchName=res.data.branch?.name;
            this.branchAddress=res.data.branch?.address;
            this.vendorName=res.data.vendorName;
            this.vendorGstNo=res.data.vendorGstNo;
            this.invoiceNo=res.data.invoiceNo;
            this.origination=res.data.origination;
            this.destination=res.data.destination;
            this.courierChanges=res.data.courierChanges;
            this.gstChanges=res.data.gstChanges;
            this.totalAmount=res.data.totalAmount;
            this.verifyArray = res.data.verifyStatus;
            this.fverifyArray = res.data.fverifyStatus;
            this.courierInvoice=res.data.courierInvoice;
            this.financeStatus = res.data.financeStatus;
            this.adminStatus = res.data.adminStatus;
            this.status = res.data.status;
          })
        });
      }
    });
  }

  add(){
    
    this.items.push({documentName:'',refNo:'',quantity:0});
  }

  
  delete(i:any){
    this.items.splice(i,1);
  }


  getCourierChanges(){
    this.totalAmount = this.courierChanges +  this.gstChanges;
  }

  save(){
    this.loader=true;
    if(this.edit){
      if(this.adminStatus == 'Rejected' || this.financeStatus == 'Rejected'){
        this.verifyArray = [];
        this.fverifyArray = [];
        this.verifyArray.push({role:"L1-Admin",status:"Pending",user:"",statusUpdatedOn:""});
        this.fverifyArray.push({role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""});
        const data = JSON.stringify({
          "utility":this.items,
          "date":this.date,
          "branch":this.branch,
          "branchCode":this.branchCode,
          "branchName":this.branchName,
          "branchAddress":this.branchAddress,
          "cluster":this.cluster,
          "state":this.state,
          "vendorName":this.vendorName,
          "vendorGstNo":this.vendorGstNo,
          "invoiceNo":this.invoiceNo,
          "origination":this.origination,
          "destination":this.destination,
          "courierChanges":this.courierChanges,
          "gstChanges":this.gstChanges,
          "totalAmount":this.totalAmount,
          "courierInvoice":this.courierInvoice,
          "verifyStatus":this.verifyArray,
          "fverifyStatus":this.fverifyArray,
          "adminStatus":"Pending",
            "financeStatus":"Pending",
            "financeStatusDate":"",
            "financeStatusRemark":"",
            "financeApproved":null,
            "adminStatusDate":"",
            "adminStatusRemark":"",
            "adminApproved":null,
        });
        this.apiS.updateCourier(data,this.id).subscribe(result => {
          if (result.status === 'error') {
            this.toastr.error(result.message);
            this.loader = false;
          } else {
            this.toastr.success("New Record Updated Successfully");
            this.loader = false;
            this.clearFilter();
            this.router.navigate(['/branch/courier']);
            
          }
        },error=>{
          this.toastr.error(error.message);
          this.loader = false;
        });
      }else{
        const data = JSON.stringify({
          "utility":this.items,
          "date":this.date,
          "branch":this.branch,
          "branchCode":this.branchCode,
          "branchName":this.branchName,
          "branchAddress":this.branchAddress,
          "cluster":this.cluster,
          "state":this.state,
          "vendorName":this.vendorName,
          "vendorGstNo":this.vendorGstNo,
          "invoiceNo":this.invoiceNo,
          "origination":this.origination,
          "destination":this.destination,
          "courierChanges":this.courierChanges,
          "gstChanges":this.gstChanges,
          "totalAmount":this.totalAmount,
          "courierInvoice":this.courierInvoice,
        });
        this.apiS.updateCourier(data,this.id).subscribe(result => {
          if (result.status === 'error') {
            this.toastr.error(result.message);
            this.loader = false;
          } else {
            this.toastr.success("New Record Updated Successfully");
            this.loader = false;
            this.clearFilter();
            this.router.navigate(['/branch/courier']);
            
          }
        },error=>{
          this.toastr.error(error.message);
          this.loader = false;
        });
      }
      
    }else{
      let verifyArray:any=[];
      let financeVerifyArray:any=[];
      verifyArray.push({role:"L1-Admin",status:"Pending",user:"",statusUpdatedOn:""});
      financeVerifyArray.push({role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""});
      const data = JSON.stringify({
        "utility":this.items,
        "date":this.date,
        "branch":this.branch,
        "branchCode":this.branchCode,
        "branchName":this.branchName,
        "branchAddress":this.branchAddress,
        "cluster":this.cluster,
        "state":this.state,
        "vendorName":this.vendorName,
        "vendorGstNo":this.vendorGstNo,
        "invoiceNo":this.invoiceNo,
        "origination":this.origination,
        "destination":this.destination,
        "courierChanges":this.courierChanges,
        "gstChanges":this.gstChanges,
        "totalAmount":this.totalAmount,
        "courierInvoice":this.courierInvoice,
        "verifyStatus":verifyArray,
        "fverifyStatus":financeVerifyArray,
      });
      this.apiS.createCourier(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("New Record Created Successfully");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/branch/courier']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
   
  }


  uploadCourierInvoice(event: any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.courierInvChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.courierInvoice =res.data.url;
          }
        });
      
    }
  }

  clearFilter(){
    this.utility="";
    this.date="";
    this.items = [];
    this.branch="";
    this.branchCode="";
    this.branchName="";
    this.branchAddress="";
    this.cluster="";
    this.state="";
    this.vendorName="";
    this.vendorGstNo="";
    this.invoiceNo="";
    this.origination="";
    this.destination="";
    this.courierChanges="";
    this.gstChanges="";
    this.totalAmount="";
    this.courierInvoice="";
  }



}
