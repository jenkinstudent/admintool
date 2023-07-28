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
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent {
  breadCrumbItems!: Array<{}>;
  pendingUserRequests:any=[];
  oldUserRequests:any=[];
  remark="";
  id:any;
  searchTerm = "";
  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public modal: NgbModal) {
    this.title.setTitle("Employee Registration - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    
    this.breadCrumbItems = [
      { label: 'Settings' },
      { label: 'Employee Registration' , active: true }
    ];

    this.getData();
  }


  getData(){
    this.api.getPendingUserRequests().subscribe(data=>{
      this.pendingUserRequests = data.data;
    });
    this.api.getOldUserRequests().subscribe(data=>{
      this.oldUserRequests = data.data;
    })
  }

  updateSuccessStatus(id:any){
    this.api.updateStatusUserRequests(id,1,"").subscribe(data=>{
      this.toast.success("User Request Approved");
      this.getData();
    });
  }

  openRejectModal(content:any,id:any){
    this.id = id;
    this.modal.open(content,{centered:true});
  }

  closeRejectModal(){
    this.modal.dismissAll();
  }

  updateRejectedStatus(){
    if(this.remark == ""){
      this.toast.error("Please enter Remark");
      return;
    }
    this.api.updateStatusUserRequests(this.id,2,this.remark).subscribe(data=>{
      this.toast.success("User Request Rejected");
      this.getData();
      this.id="";
      this.remark="";
      this.closeRejectModal();
    });
  }

}
