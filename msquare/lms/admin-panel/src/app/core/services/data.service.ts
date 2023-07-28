import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  notifications:any = [];
  allNotifications:any = [];
  unreadNotification = 0;

  id:any="";
  moduleId:any;
  courseId:any;
  courseIndex:any;
  moduleIndex:any;

  constructor(public api:ApiService,public auth:AuthenticationService,public route:ActivatedRoute) {
    this.getNotification();
    this.route.params.subscribe((routeParams: any) => {
      this.id = '';
      this.moduleId = '';
      this.courseId= '';
      this.courseIndex= '';
      this.moduleIndex= '';

      this.id = routeParams.id;
      this.moduleId = routeParams.moduleId;
      this.courseId= routeParams.courseId;
      this.courseIndex= routeParams.courseIndex;
      this.moduleIndex= routeParams.moduleIndex;
      
      console.log(this.id);
    });
   }

  getNotification(){
    this.api.userNotification(this.auth.currentUserValue.id).subscribe(data=>{
      this.allNotifications = data.data;
      for(let i =0;i<data.data.length;i++){
        if(i < 5){
          this.notifications.push(data.data[i]);
        }
        if(data.data[i].status == '0'){
          this.unreadNotification += 1;
        }
      }
     })  
  }


}
