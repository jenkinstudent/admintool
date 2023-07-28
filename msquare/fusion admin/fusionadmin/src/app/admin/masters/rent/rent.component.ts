import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  
  @ViewChild('table') table: any;
  dataTable: any;
  data:any = [];
  commercial={
    total:0,
    recent:0,
    assigned:0,
    pendingAssigned:0
  };
  domestic={
    total:0,
    recent:0,
    assigned:0,
    pendingAssigned:0
  };

  searchTerm:any="";
  statusTerm:any="";

  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  where:any = {};

  item:any = [];

  activities:any = [];
  utilityMasters:any = [];
  baseURL = environment.baseURL;

  constructor(public api:ApiService,public router:Router,public toastr:ToastrService,public offcanvasService:NgbOffcanvas,
    public modalS:NgbModal, public datePipe:DatePipe) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Rent' , active: true }
    ];

    this.api.getAllUtilityMaster().subscribe(data => {
      this.utilityMasters = data.data;
      console.log(this.utilityMasters)
    })
    this.getData();
  }

  getData(){
    this.loading = true;
    this.api.getAllRent(this.page,this.where,"","",this.searchTerm).subscribe(res=>{
      this.data = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
    });
    this.api.getAllRentCount().subscribe(res=>{
      this.commercial = res.commercial;
      this.domestic = res.domestic;
    })
  }

  edit(id: any) {
    this.router.navigate(['/admin/masters/rent/action/edit'], {
      queryParams: {
        id: id
      }
    })
  }


  changeStatus(event:any,id:any,index:any){
    let status = 'Active';
      if(!event.target.checked){
        status = 'Inactive';
      }
      const data=JSON.stringify({
        status:status
      });
      this.api.updateRent(data,id).subscribe(data=>{
        this.data[index].status = status;
        if(status == 'Inactive'){
          this.toastr.success("Status Updated");
        }else if(status == 'Active'){
          this.toastr.success("Status Updated");
        }
      });
  }

  search(event:any){
    this.searchTerm = event.target.value;
    this.page = 1;
    this.getData();
  }

  getFacility(item:any, facility:any){
    if(facility != undefined){
      if(facility.length > 0){
        return facility.some((res:any) =>res._id.toString() == item._id.toString())
      }else{
        return false;
      }
      
    }else{
      return false;
    }
    
  }

  statusSearch(event:any){
    let status = event.target.value;
    
    this.where.status = status;
    if(status == ""){
      this.where = {};
    }
    this.getData();
  }

  nextPage(){
    this.page += 1;
    this.getData();
  }

  previousPage(){
    this.page -= 1;
    this.getData();
  }

  openModal(content:any, item:any){
    this.modalS.open(content,{size:'fullscreen'});
    this.item = item;
  }


  openCanvas(content:any,item:any){
    const data = JSON.stringify({
      rent:item._id
    })
    this.api.getActivities(data).subscribe(data =>{
      this.activities = data.data
      console.log(this.activities)
    })
    this.offcanvasService.open(content, { position: 'end' });
  }

  arrayEqual(currentData:any, updatedData:any){
    return (JSON.stringify(currentData) === JSON.stringify(updatedData));
  }
}
