import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent-raised',
  templateUrl: './rent-raised.component.html',
  styleUrls: ['./rent-raised.component.scss']
})
export class RentRaisedComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  id="";
  amt=0;
  item:any=[];

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
  verifyArray:any=[];
  fverifyArray:any=[];
  tds:any=10;

  baseURL=environment.baseURL;
  action:any = "";

  constructor(public _location:Location, public titleS:Title,public appC:AppComponent,public route:ActivatedRoute,public apiS:ApiService,
    public toastr:ToastrService,public authS:AuthenticationService,public router:Router) { }

  ngOnInit(): void {
    this.titleS.setTitle("Raise a Rent - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Transactions' },
      { label: 'Rent' },
      { label: 'Raise' , active: true }
    ];
    this.route.params.subscribe((data:any)=>{
      this.id= data.id;
      this.action = data.activity;
      if(this.action == 'create'){
        this.apiS.getSingleRentTemporary(this.id).subscribe(data=>{
          this.item = data.data;
        })
      }else if(this.action == 'edit'){
        this.apiS.getSingleRentBill(this.id).subscribe(data=>{
          this.item = data.data;
          this.pendingArrear = data.data.pendingArrear;
          this.waiver = data.data.waiver;
          this.deduction = data.data.deduction;
          this.securityDepositAdjust = data.data.securityDepositAdjust;
          this.firstRentTransfer = data.data.firstRentTrasnfer;
          this.terms = data.data.terms;
          this.effectiveDate = new Date(data.data.effectiveDate).getFullYear()+"-"+("0"+((new Date(data.data.effectiveDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(data.data.effectiveDate).getDate()).slice(-2);
          this.expiryDate = new Date(data.data.expiryDate).getFullYear()+"-"+("0"+((new Date(data.data.expiryDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(data.data.expiryDate).getDate()).slice(-2);
          this.increment = data.data.increment;
          this.totalTransferRent = data.data.totalTransferRent;
          this.remarks = data.data.remarks;
        })
      }
      
    })
  }

  confirmStatus(){
    if(this.action == 'create'){
      this.verifyArray = [];
      this.fverifyArray = [];
      this.verifyArray.push({role:"Field-Admin",status:"Pending",user:"",statusUpdatedOn:""},{role:"L1-Admin",status:"Pending",user:"",statusUpdatedOn:""});
      this.fverifyArray.push({role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""});
      const data = JSON.stringify({
        "adminStatus":"Confirmed",
        "adminConfirmed":this.authS.currentUserValue.id
      });
      this.apiS.updateRentTemporary(data,this.id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
        } else {
          
          const rentdata = JSON.stringify({
            "rent":this.item.rent?._id,
            "branch":this.item.rent?.branch,
            "pendingArrear":this.pendingArrear,
            "waiver":this.waiver,
            "deduction":this.deduction,
            "securityDepositAdjust":this.securityDepositAdjust,
            "firstRentTrasnfer":this.firstRentTransfer,
            "terms":this.terms,
            "effectiveDate":this.effectiveDate,
            "expiryDate":this.expiryDate,
            "increment":this.increment,
            "totalTransferRent":this.totalTransferRent,
            "remarks":this.remarks,
            "isTds":((this.item.rent?.totalMonthlyRent * 12) > 240000)?true:false,
            "tds":this.tds,
            "totalRentAfterDeduction":((this.item.rent?.totalMonthlyRent * 12) > 240000)?(this.item.rent?.totalMonthlyRent - (this.item.rent?.totalMonthlyRent * (this.tds/100))).toFixed(0):0,
            "verifyStatus":this.verifyArray,
            "fverifyStatus":this.fverifyArray,
          });
          this.apiS.createRentBill(rentdata).subscribe(rdata => {
            if (rdata.status === 'error') {
              this.toastr.error(rdata.message);
            } else {
              this.toastr.success("New Record Created Successfully");
              this.item.adminStatus = "Confirmed";
              this.router.navigate(['/admin/rent-transaction']);
            }
          },error=>{
            this.toastr.error(error.message);
          });
        
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }else if(this.action == 'edit'){
      this.verifyArray = [];
      this.fverifyArray = [];
      this.verifyArray.push({role:"Field-Admin",status:"Pending",user:"",statusUpdatedOn:""},{role:"L1-Admin",status:"Pending",user:"",statusUpdatedOn:""});
      this.fverifyArray.push({role:"L1-Finance",status:"Pending",user:"",statusUpdatedOn:""});
      const rentdata = JSON.stringify({
        "pendingArrear":this.pendingArrear,
        "waiver":this.waiver,
        "deduction":this.deduction,
        "securityDepositAdjust":this.securityDepositAdjust,
        "firstRentTrasnfer":this.firstRentTransfer,
        "terms":this.terms,
        "effectiveDate":this.effectiveDate,
        "expiryDate":this.expiryDate,
        "increment":this.increment,
        "totalTransferRent":this.totalTransferRent,
        "remarks":this.remarks,
        "verifyStatus":this.verifyArray,
        "fverifyStatus":this.fverifyArray,
        "adminStatus":"Pending",
        "financeStatus":"Pending",
        "financeStatusDate":"",
        "financeStatusRemark":"",
        "financeRejectRemark":"",
        "financeApproved":null,
        "adminStatusDate":"",
        "adminStatusRemark":"",
        "adminRejectRemark":"",
        "adminApproved":null
      });
      this.apiS.updateRentBill(rentdata,this.item._id).subscribe(rdata => {
        if (rdata.status === 'error') {
          this.toastr.error(rdata.message);
        } else {
          this.toastr.success("New Record Updated Successfully");
          this.router.navigate(['/admin/rent-transaction']);
        }
      },error=>{
        this.toastr.error(error.message);
      });
    
    }
    
  }


  


}
