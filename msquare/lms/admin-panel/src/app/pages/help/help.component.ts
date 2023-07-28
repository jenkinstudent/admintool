import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  @ViewChild("filtetcontent") filtetcontent!:TemplateRef<any>;
  searchTerm = "";
  breadCrumbItems!: Array<{}>;
  
  emp:any = [];
  supportRequests:any = [];
  displayDetailsItem:any;
  supportTransactionItem:any;
  remarkInput = "";
  

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,private offcanvasService: NgbOffcanvas, public modalService: NgbModal) {
    this.title.setTitle("Help & Support - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: '' },
      { label: 'Help' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.api.getAllUsersByPagination(1,"").subscribe(data=>{
      this.emp = data.data;
      console.log(this.emp);
    });
    this.api.getAllSupportRequests().subscribe(data=>{
      this.supportRequests = data.data;
    });
  }

  showSupport(item:any){

  }

  displayDetails(item:any){
    this.displayDetailsItem = item;
    // console.log(item);
    this.api.getAllSupportTransaction(item._id).subscribe(data=>{
      this.supportTransactionItem = data.data;
      // console.log(data.data);
    })
    this.offcanvasService.open(this.filtetcontent, { position: 'end' });
  }

  openModal(content:any,item:any){
    this.displayDetailsItem = item;
    this.modalService.open(content, {
      centered: true,
    });
  }

  updateStatus(id:any){
    this.api.updateSupportRequestStatus(id,this.remarkInput,1).subscribe(data=>{
      if(data.status){
        // this.api.updateSupportTransactionStatus(id,1).subscribe(data=>{
          this.remarkInput = "";
          this.displayDetailsItem = {};
          this.supportTransactionItem = {};
          this.getData();
          this.modalService.dismissAll();
          this.toast.success(data.message);
        // })
      }else{
        this.toast.success(data.message);
      }
    });
  }
}
