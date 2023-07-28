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
  selector: 'app-reward-products',
  templateUrl: './reward-products.component.html',
  styleUrls: ['./reward-products.component.scss']
})
export class RewardProductsComponent implements OnInit{
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  data:any=[];
  imageModal="";

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,
    public modalService:NgbModal) {
    this.title.setTitle("Reward Products - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'Reward Products' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.data = [];
    this.api.getAllRedeemItems().subscribe(data=>{
      this.data = data.data; 
    })
  }

  editData(id:any){
    this.router.navigate(['/pages/engage/reward-products/action/edit'],{
      queryParams:{id:id}
    });
  }

  deleteData(id:any){
    Swal.fire({
      title: 'You are about to delete a reward products ?',
      text: 'Deleting your reward products will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then((result:any) => {
      if (result.value) {
        this.api.deleteRedeemItems(id).subscribe(data=>{
          if(data.status){
              this.toast.success(data.message);
              this.getData();
          } else {
            this.toast.error(data.message);
          }
        })
      }
    });
  }

  showModal(content:any, image:any){
    this.modalService.open(content,{centered:true});
    this.imageModal=image;
  }

  changeStatus(item:any,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    const data = JSON.stringify({
      "status": status
    })
    this.api.updateRedeemItems(data,item._id).subscribe(data=>{
      if(status == "0"){
        this.toast.error("Hide Status Updated");
      }else if(status == "1"){
        this.toast.success("Hide Status Updated");
      }
    });
  }

}
