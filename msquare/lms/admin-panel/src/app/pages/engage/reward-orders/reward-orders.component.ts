import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reward-orders',
  templateUrl: './reward-orders.component.html',
  styleUrls: ['./reward-orders.component.scss']
})
export class RewardOrdersComponent implements OnInit{

  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  data:any=[];
  item:any;

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,
    public modalService:NgbModal) {
    this.title.setTitle("Reward Orders - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'Reward Orders' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.data = [];
    this.api.getAllRedeemReward().subscribe(data=>{
      this.data = data.data; 
    })
  }


  approve(){
    if(this.item.pincode.toString().length != 6){
      this.toast.error("Please enter 6 digit pincode");
      return;
    }
    const data = JSON.stringify({
      status:"Approve",
      remark:this.item.remark,
      addressLine1:this.item.addressLine1,
      addressLine2:this.item.addressLine2,
      city:this.item.city,
      state:this.item.state,
      country:this.item.country,
      pincode:this.item.pincode
    });
    this.api.updateRedeemReward(data,this.item._id).subscribe(result=>{
      if(result.status){
        this.toast.success("Approved Successfully");
        this.item.status = "Approve";
        
      }else{
        this.toast.error(result.message);
      }
    })
  }
  
  openModal(content:any, item:any){
    this.modalService.open(content,{centered:true});
    this.item=item;
  }



}
