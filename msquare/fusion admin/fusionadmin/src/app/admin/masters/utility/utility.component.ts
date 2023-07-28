import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent implements OnInit {
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

  activities:any = [];
  item:any = [];
  baseURL = environment.baseURL;

  constructor(public api:ApiService,public router:Router,public toastr:ToastrService, public offcanvasService:NgbOffcanvas,
    public modalS: NgbModal,public datePipe:DatePipe) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Utility' , active: true }
    ];

    this.getData();
  }

  getData(){
    this.loading = true;
    this.api.getAllUtility(this.page,this.where,"","",this.searchTerm).subscribe(res=>{
      this.data = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
      
    });
    this.api.getAllUtilityCount().subscribe(res=>{
      this.commercial = res.commercial;
      this.domestic = res.domestic;
    })
  }


  edit(id: any) {
    this.router.navigate(['/admin/masters/utility/action/edit'], {
      queryParams: {
        id: id
      }
    })
  }

  openCanvas(content:any,item:any){
    this.activities = [];
    const data = JSON.stringify({
      utility:item._id
    })
    this.api.getActivities(data).subscribe(data =>{
      this.activities = data.data;
    })
    this.offcanvasService.open(content, { position: 'end' });
  }

  openModal(content:any, item:any){
    this.item = [];
    this.modalS.open(content,{size:'fullscreen'});
    this.item = item;
  }

  arrayEqual(currentData:any, updatedData:any){
    return (JSON.stringify(currentData) === JSON.stringify(updatedData));
  }

  changeStatus(event:any,id:any,index:any){
    let status = 'Active';
      if(!event.target.checked){
        status = 'Inactive';
      }
      const data=JSON.stringify({
        status:status
      });
      this.api.updateUtility(data,id).subscribe(data=>{
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

}