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
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit{
  @ViewChild('table') table: any;
  dataTable:any;
  printData:any=[];
  data:any=[];
  searchTerm:any="";
  page:any="";
  totalPages:any="";
  hasMore:boolean = false;
  importLoader=false;

  statusFilter:any = 1;
  breadCrumbItems!: Array<{}>;
  emp:any=[];
  loading = false;

  courseCount=0;
  programCount=0;
  moduleCount=0;
  qbCount=0;
  
  imageModal:any = "";
  
  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: AuthenticationService,
    public modalService:NgbModal) {
    this.title.setTitle("Module - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.getData();
    this.breadCrumbItems = [
      { label: 'Learning Activity' },
      { label: 'Module' , active: true }
    ];
  }

  getData(){
    this.loading =true;
    this.api.allModulesLearningActivity().subscribe(data=>{
      this.data = data.data;
    });

    this.api.getOverallSnapshotLearning().subscribe(data=>{
      this.courseCount = data.course;
      this.programCount = data.program;
      this.moduleCount = data.module;
      this.qbCount = data.qb;
    })
  }

  openModal(content:any,image:any){
    this.modalService.open(content, {
      centered: true,
    });
    this.imageModal=image;
  }

  editModule(id:String){
    this.router.navigate(['/pages/learning-activity/module/activity/edit'],{
      queryParams:{id:id}
    });
  }

  deleteModule(id:any){
    this.api.deleteModule(id).subscribe(data=>{
      if(data.status){
          this.toast.success(data.message);
          this.getData();
      } else {
        this.toast.error(data.message);
      }
    })
  }

  confirm(id:any) {
    Swal.fire({
      title: 'You are about to delete a module ?',
      text: 'Deleting your module will remove all of your information from database.',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.deleteModule(id);
      }
    });
  }


  changeModuleStatus(item:any,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusModule(item._id,status).subscribe(data=>{
      if(status == "0"){
        item.status = "0";
        this.toast.error("Module Status Updated");
      }else if(status == "1"){
        item.status = "1";
        this.toast.success("Module Status Updated");
      }
    });
  }
}
