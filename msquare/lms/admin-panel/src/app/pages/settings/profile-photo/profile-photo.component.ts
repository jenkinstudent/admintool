import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent {
  breadCrumbItems!: Array<{}>;
  searchTerm:any="";

  pendingUsers:any=[];
  oldUserRequests:any=[];
  remark="";
  id:any;
  imageModal="";

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public model: NgbModal) {
    this.title.setTitle("Profile Photo Approval - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.getData();
    
    this.breadCrumbItems = [
      { label: 'Settings' },
      { label: 'Profile Photo Approval' , active: true }
    ];
  }

  getData(){
    this.api.getAllProfilePicUpdation().subscribe(data=>{
      this.pendingUsers = data.data;
    });
  }

  updateSuccessStatus(id:any){
    this.api.updateProfilePicStatus(id,'Approve',"").subscribe(data=>{
      this.toast.success("Profile Photo Approved");
      this.getData();
    });
  }

  openRejectModal(content:any,id:any){
    this.id = id;
    this.model.open(content,{centered:true});
  }

  closeRejectModal(){
    this.model.dismissAll();
  }

  showModal(content:any, image:any){
    this.imageModal = image;
    this.model.open(content,{centered:true})
  }

  updateRejectedStatus(){
    if(this.remark == ""){
      this.toast.error("Remark is required");
      return;
    }
    this.api.updateProfilePicStatus(this.id,'Reject',this.remark).subscribe(data=>{
      this.toast.success("Profile Photo Rejected");
      this.getData();
      this.id="";
      this.remark="";
      
    });
  }

}
