import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  @ViewChild('table') table: any;
  @ViewChild('table2') table2: any;
  dataTable: any;
  dataTable2: any;
  breadCrumbItems!: Array<{}>;
  data:any = [];
  currentMonth:any=[];
  item:any;
  branchCode:any="";
  selectGst:any="";

  searchTerm:any="";


  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  where:any = {};
   
  constructor(public api:ApiService,public modalService:NgbModal, public router:Router,public toastr:ToastrService,public authS:AuthenticationService,public titleS:Title,public appC:AppComponent,) {}

  ngOnInit(): void {
    this.titleS.setTitle("Courier - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Courier' , active: true }
    ];

    this.getData();
    this.api.getSingleUser(this.authS.currentUserValue.id).subscribe(data=>{
      this.branchCode = data.data.branchId?.code;
    })
    
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (this.getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    this.api.getAllCourier(1,{date:{$gte:currentDate,$lte:nextDate}},"","","",10000).subscribe(data=>{
      this.currentMonth = data.data;
    });
  }

  getData(){
    this.loading = true;
    this.api.getAllCourier(this.page,this.where,"","",this.searchTerm).subscribe(res=>{
      this.data = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
    });
  }
  

  getDaysInCurrentMonth(month:any) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        month,
        0
    ).getDate();
}

  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'lg'});
    this.item= item;
  }

  edit(id: any) {
    this.router.navigate(['/branch/courier/action/edit'], {
      queryParams: {
        id: id
      }
    })
  }

  viewData(id:any){
    this.router.navigate(['/branch/courier/action/view'], {
      queryParams: {
        id: id
      }
    })
  }

  onSelectedGst(event:any){
    this.where = {};
    if (event == 'With GST') {
      this.where.$and = [{ vendorGstNo: { $exists: true }},{ vendorGstNo: {$ne: ''} }];
    } else {
      this.where.$or = [{ vendorGstNo: { $exists: false }},{ vendorGstNo: '' }];
    }
    this.page = 1;
    this.getData();
  }

  search(event:any){
    this.searchTerm = event.target.value;
    this.page = 1;
    this.getData();
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
          // this.toastr.error("Status Updated");
        }else if(status == 'Active'){
          // this.toastr.success("Status Updated");
        }
      });
  }

  clear(){
    this.searchTerm = "";
    this.where = {};
    this.selectGst = "";
    this.page = 1;
    this.getData();
  }

  previousPage(){
    this.page -= 1;
    this.getData();
  }

  nextPage(){
    this.page += 1;
    this.getData();
  }

}
