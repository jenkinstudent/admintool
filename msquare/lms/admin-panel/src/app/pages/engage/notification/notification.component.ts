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
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  notificationArr:any=[];
  imageModal="";

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,
    public modalService:NgbModal) {
    this.title.setTitle("Notification - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'Notification' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.api.getAllNotification().subscribe(data=>{
      this.notificationArr = data.data; 
    })
  }

  showModal(content:any, image:any){
    this.modalService.open(content,{'centered':true})
    this.imageModal=image;
  }
}
