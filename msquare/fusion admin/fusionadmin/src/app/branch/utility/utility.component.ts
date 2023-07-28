import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  data:any = [];
  notRaised:any=[];
  expectedVouchers:any = [];
  vouchersRaised:any=[];
  currentMonth:any=[];

  where:any ={};
  totalBranches = 0;
  hasMore = true;
  page = 1;

  item:any=[];
  utilityMasters:any = [];
  searchTerm:any="";
  selectedDate:any = "";
  selectedProduct:any = "";
  
  constructor(public api:ApiService,public router:Router,public toastr:ToastrService,public authS:AuthenticationService,public titleS:Title,public appC:AppComponent,
    public modalService:NgbModal) {}

  ngOnInit(): void {
    this.titleS.setTitle("Utility Bill - "+this.appC.title);
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Utility Bill' , active: true }
    ];

    this.api.getAllUtilityMaster().subscribe(data => {
      this.utilityMasters = data.data;
    })

    this.getData();
  }

  getData(){
    this.api.getAllExpectedVouchers(this.authS.currentUserValue.permission?.branch[0]._id).subscribe(data=>{
      this.expectedVouchers = data.data.length;
    })
    var date = new Date();
    let currentDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (1)).slice(-2));
    let nextDate = new Date(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + (this.getDaysInCurrentMonth(date.getMonth() + 1))).slice(-2));
    let whereCount:any = {};
    whereCount.invoiceDate = {
      $gte: currentDate,
      $lte: nextDate
    }
    this.api.getAllUtilityBill(1,whereCount,"","","",10000).subscribe(res=>{
      this.vouchersRaised = res.data.length;
    })


   this.getUtilityData();

    var date = new Date();
    let where:any = {};
    where.invoiceDate = {
      $gte: currentDate,
      $lte: nextDate
    }

    this.api.getAllUtilityBill(1,where,"","","",10000).subscribe(res=>{
      this.currentMonth = res.data;
    });
    this.api.getAllUtilityTemporary().subscribe(res=>{
      this.notRaised = res.data;
    });
  }


  getUtilityData(){
    this.api.getAllUtilityBill(this.page,this.where,"","",this.searchTerm,10000).subscribe(res=>{
      this.data = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
    });
  }

  onSelectedDate(event:any){
    
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = new Date(date[0]);
      var date2 = new Date(date[1]);
      this.where.invoiceDate = {
        $gte: date1,
        $lte: date2
      }
      this.page = 1;
    this.getData();
    }
  }


  clear(){
    this.selectedDate = "";
    this.searchTerm = "";
    this.where = {};
    this.page = 1;
    this.selectedProduct = "";
    this.searchTerm = "";
    this.getData();
  }

  onSelectedProduct(event:any){
    this.where.utilityMaster = event;
    this.page = 1;
    this.getData();
  }

  search(event:any){
    this.searchTerm = event.target.value;
    this.page = 1;
    this.getData();
  }

  edit(id: any) {
    this.router.navigate(['/branch/utility/details/edit'], {
      queryParams: {
        id: id
      }
    })
  }

  view(id: any) {
    this.router.navigate(['/branch/utility/details/view'], {
      queryParams: {
        id: id
      }
    })
  }

  check(){
    this.api.checkUtilityRaised().subscribe(data => {
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        
        this.toastr.success("Success");
      }
    },error=>{
      this.toastr.error(error.message);
    });
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


  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'lg'});
    this.item= item;
  }

  getDaysInCurrentMonth(month:any) {
    const date = new Date();

    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
}
}
