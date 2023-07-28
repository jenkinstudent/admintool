import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{

  data:any=[];
  allocationData:any=[];

  breadCrumbItems!: Array<{}>;
  loading = false;

  item:any=[];

  
  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: AuthenticationService,
    public modalService:NgbModal) {
    this.title.setTitle("Report - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.getData();
    this.breadCrumbItems = [
      { label: 'Allocation' },
      { label: 'Report' , active: true }
    ];
  }

  getData(){
    this.api.allocation().subscribe(data=>{
      this.data = data.data;
    });

  }

  openModal(content:any, item:any){
    this.loading = true;
    this.allocationData = [];
    this.item = item;
    this.modalService.open(content, {size: 'fullscreen'})
    this.api.singleAllocations(item._id,item.allocationType).subscribe(data=>{
      this.allocationData = data.data;
      this.loading = false;
    })
  }

  deleteAllocation(item:any){
    Swal.fire({
      title: 'You are about to delete a allcoation ?',
      text: 'Deleting your allocation will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        const ddata = JSON.stringify({
          deleted: true
        })
        this.api.updateAllocations(ddata,item._id).subscribe(updated=>{
          if(updated.status === "success"){
            this.api.deleteAllocations(item._id).subscribe(data=>{
              if(data.status === "success"){
                this.toast.success(data.message);
                this.getData();
                item.deleted = true;
              }else{
                this.toast.success(data.message);
              }
            })
          }
        })
      }
    });
  }

  deleteProgramWatch(item:any){
    Swal.fire({
      title: 'You are about to delete a program allcoation ?',
      text: 'Deleting your program allocation will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.api.deleteProgramsWatch(item._id).subscribe(data=>{
          if(data.status === "success"){
            this.toast.success("Allocation Deleted Successfully");
            let index = this.item.employeeData.map((res:any)=> { return res.id._id; }).indexOf(item.employeeId._id);
            this.item.employeeData.splice(index,1);
            if(this.item.employeeData > 0){
              const aData = JSON.stringify({
                employeeData:this.item.employeeData
              })
              this.api.updateAllocations(aData,this.item._id).subscribe(data=>{
                this.allocationData = [];
                this.api.singleAllocations(this.item._id,this.item.allocationType).subscribe(data=>{
                  this.allocationData = data.data;
                })
              });
            }else{
              this.api.deleteSingleAllocations(this.item._id).subscribe(data=>{
                this.modalService.dismissAll();
                this.getData()
              });
            }
          }else{
            this.toast.success(data.message);
          }
        })
      }
    });
  }

  deleteLearningActivityWatch(item:any){
    Swal.fire({
      title: 'You are about to delete a learning activity allcoation ?',
      text: 'Deleting your learning activity allocation will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.api.deleteLearningActivityWatch(item._id).subscribe(data=>{
          if(data.status === "success"){
            this.toast.success("Allocation Deleted Successfully");
            let index = this.item.employeeData.map((res:any)=> { return res.id._id; }).indexOf(item.employeeId._id);
            this.item.employeeData.splice(index,1);
            if(this.item.employeeData > 0){
              const aData = JSON.stringify({
                employeeData:this.item.employeeData
              })
              this.api.updateAllocations(aData,this.item._id).subscribe(data=>{
                this.allocationData = [];
                this.api.singleAllocations(this.item._id,this.item.allocationType).subscribe(data=>{
                  this.allocationData = data.data;
                })
              });
            }else{
              this.api.deleteSingleAllocations(this.item._id).subscribe(data=>{
                this.modalService.dismissAll();
                this.getData()
              });
            }
           
          }else{
            this.toast.success(data.message);
          }
        })
      }
    });
  }

  deleteCourseWatch(item:any){
    Swal.fire({
      title: 'You are about to delete a course allcoation ?',
      text: 'Deleting your course allocation will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.api.deleteCoursesWatch(item._id).subscribe(data=>{
          if(data.status === "success"){
            this.toast.success("Allocation Deleted Successfully");
            let index = this.item.employeeData.map((res:any)=> { return res.id._id; }).indexOf(item.employeeId._id);
            this.item.employeeData.splice(index,1);
            if(this.item.employeeData > 0){
              const aData = JSON.stringify({
                employeeData:this.item.employeeData
              })
              this.api.updateAllocations(aData,this.item._id).subscribe(data=>{
                this.allocationData = [];
                this.api.singleAllocations(this.item._id,this.item.allocationType).subscribe(data=>{
                  this.allocationData = data.data;
                })
              });
            }else{
              this.api.deleteSingleAllocations(this.item._id).subscribe(data=>{
                this.modalService.dismissAll();
                this.getData()
              });
            }
          }else{
            this.toast.success(data.message);
          }
        })
      }
    });
  }

  deleteModuleWatch(item:any){
    Swal.fire({
      title: 'You are about to delete a module allcoation ?',
      text: 'Deleting your module allocation will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.api.deleteModulesWatch(item._id).subscribe(data=>{
          if(data.status === "success"){
            this.toast.success("Allocation Deleted Successfully");
            let index = this.item.employeeData.map((res:any)=> { return res.id._id; }).indexOf(item.employeeId._id);
            this.item.employeeData.splice(index,1);
            if(this.item.employeeData > 0){
              const aData = JSON.stringify({
                employeeData:this.item.employeeData
              })
              this.api.updateAllocations(aData,this.item._id).subscribe(data=>{
                this.allocationData = [];
                this.api.singleAllocations(this.item._id,this.item.allocationType).subscribe(data=>{
                  this.allocationData = data.data;
                })
              });
            }else{
              this.api.deleteSingleAllocations(this.item._id).subscribe(data=>{
                this.modalService.dismissAll();
                this.getData()
              });
            }
          }else{
            this.toast.success(data.message);
          }
        })
      }
    });
  }
}
