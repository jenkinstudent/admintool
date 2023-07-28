import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationData:any = [];
  imageModal:any="";
  baseURL=environment.baseURL;
  pendingData:any = [];
  constructor(private api: ApiService,public modalService:NgbModal, public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getData();
    setTimeout(() => {
      if(this.pendingData.length > 0){
        this.api.updateNotification(this.pendingData).subscribe(data=>{

        })
      }
    }, 300);
    
  }

  getData(){
    this.notificationData = [];
    this.api.userNotification(this.auth.currentUserValue.id).subscribe(res=>{
      this.notificationData = res.data;
      for(let i=0;i<res.data.length;i++){
        if(res.data[i].status == '0'){
          this.pendingData.push(res.data[i])
        }
      }
    });
  }

  openModal(content:any,image:any){
    this.modalService.open(content, {
      centered: true,
    });
    this.imageModal=image;
  }

}
