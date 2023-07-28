import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { jsPDF } from "jspdf";
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  certificates:any=[];
  redeemItems:any=[];
  baseURL=environment.baseURL;

  knowMore:boolean =false;
  rewardPoint:boolean=false;
  total = 0;

  rewardPoints:any=[];
  items:any=[];
  qtyError=true;
  totalRedeemPoints=0;
  remainingRedeemPoints= 0;

  addressLine1 : any = "";
  addressLine2 : any = "";
  city : any = "";
  state : any = "";
  country : any = "";
  pincode : any = "";
  constructor(public apiS:ApiService,public authS:AuthenticationService,public toastr:ToastrService,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    this.apiS.getAllCertificates(this.authS.currentUserValue.id).subscribe(data=>{
      this.certificates= data.data;
      console.log(this.certificates)
    })
    this.apiS.getTotalPointsByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.total = data.data;
      this.remainingRedeemPoints = this.total;
    })
    this.apiS.getAllRewardPointsByEmp(this.authS.currentUserValue.id).subscribe(data=>{
      this.rewardPoints = data.data;
    })
    this.dataService.getRedeemItems().subscribe(data=>{
      this.redeemItems = data.data;
    })
  }

  getRedeemItemData(item:any,i:any){
    let totalAmount = 0;
    for(let i=0;i<this.items.length;i++){
      totalAmount += this.items[i].itemId.points;
    }
    if(this.total >= (totalAmount + item.points)){
      const duplicateUser = this.items.filter((user:any) => user.itemId._id === item._id).length;
      if(duplicateUser == 0){
        this.items.push({itemId:item,qty:1});
        this.totalRedeemPoints=0;
        for(let i=0;i<this.items.length;i++){
          if(this.items[i].qty != undefined || this.items[i].qty == 0){
              this.totalRedeemPoints +=(this.items[i].itemId.points * this.items[i].qty);   
          }
        }
        this.remainingRedeemPoints = this.total - this.totalRedeemPoints;
      }else{
        this.toastr.error("You already added item in cart");
      }
      
    }
    else{
      this.toastr.error("You don't have sufficient reward points.")
    }
    
  }

  convertImageToPDF(imageSrc: string) {
    const pdf = new jsPDF();
    pdf.addImage(this.baseURL+"/retrieve/certificate/"+imageSrc, 'JPEG', 0, 0, 210, 297);
    pdf.save('certificate.pdf');
  }

  getQty(item:any,i:any,event:any){
    let qty = item.qty;
    if(event.target.value == ''){
      this.totalRedeemPoints = 0;
        this.remainingRedeemPoints = 0;
    }else{
        this.totalRedeemPoints=0;
        for(let i=0;i<this.items.length;i++){
          if(this.items[i].qty != undefined || this.items[i].qty == 0){
              this.totalRedeemPoints +=(this.items[i].itemId.points * this.items[i].qty);
          }
        }
        if(this.totalRedeemPoints > this.total){
          this.totalRedeemPoints = this.totalRedeemPoints - ((this.items[i].qty-1) * item.itemId.points);
          this.items[i].qty = 1;
          
        }
        this.remainingRedeemPoints = this.total - this.totalRedeemPoints;
      
    }
  
  }

  deleteItem(i:any){
    this.items.splice(i,1);
    this.totalRedeemPoints=0;
    for(let i=0;i<this.items.length;i++){
      if(this.items[i].qty != undefined || this.items[i].qty == 0){
          this.totalRedeemPoints +=(this.items[i].itemId.points * this.items[i].qty);
      }
    }
    this.remainingRedeemPoints = this.total - this.totalRedeemPoints;
  }

  submit(){
    if(this.items.length == 0){
      this.toastr.error("Please select item");
      return;
    }

    if(this.addressLine1  == '' || this.addressLine2 == ''){
      this.toastr.error("Please enter address");
      return;
    }
    
    if(this.addressLine1  == '' || this.addressLine2 == ''){
      this.toastr.error("Please enter address");
      return;
    }
    
    if(this.city == ''){
      this.toastr.error("Please enter city");
      return;
    }

    if(this.state == ''){
      this.toastr.error("Please enter state");
      return;
    }

    if(this.country == ''){
      this.toastr.error("Please enter country");
      return;
    }
    
    if(this.pincode == ''){
      this.toastr.error("Please enter pincode");
      return;
    }

    if(this.pincode.toString().length != 6){
      this.toastr.error("Please enter 6 digit pincode");
      return;
    }

    const data = JSON.stringify({
      "items":this.items,
      "employeeId":this.authS.currentUserValue.id,
      "addressLine1":this.addressLine1,
      "addressLine2":this.addressLine2,
      "city":this.city,
      "state":this.state,
      "country":this.country,
      "pincode":this.pincode
    });
    this.apiS.createRedeemReward(data).subscribe(result=>{
      if(result.status){
        const rdata = JSON.stringify({
          "title":"Points Redeemed",
          "points":this.totalRedeemPoints,
          "type":"debit",
          "employeeId":this.authS.currentUserValue.id
        })
        this.apiS.createRewardPoints(rdata).subscribe(data=>{
          if(data.status){
            this.toastr.success(result.message);
            this.totalRedeemPoints = 0;
            this.items = [];
            this.remainingRedeemPoints = 0;
            this.addressLine1 = "";
            this.addressLine2 = "";
            this.city = "";
            this.pincode = "";
            this.state = "";
            this.country = "";
          }else{
            this.toastr.error(data.message);
          }
        })
      }else{
        this.toastr.error(result.message);
      }
    })
  }
}
