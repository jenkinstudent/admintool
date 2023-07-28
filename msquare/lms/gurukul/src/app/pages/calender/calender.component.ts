import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import * as moment from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  pevents:any=[];
  cevents:any=[];
  mevents:any=[];
  aevents:any=[];
  programmes:any=[];
  courses:any=[];
  modules:any=[];
  activities:any=[];
  currentSelectedDate:any="";
  constructor(private apiS:ApiService, public authService:AuthenticationService, private dataService: DataService) { }

  ngOnInit(): void {
    let date = moment().tz('Asia/Kolkata');
    let currentDate = moment(date).tz('Asia/Kolkata').startOf('day');
    let tomorrow = moment(currentDate).tz('Asia/Kolkata').add(1, 'day');
    let nextDate = moment(tomorrow).tz('Asia/Kolkata').startOf('day');
    this.currentSelectedDate = currentDate.format('YYYY-MM-DD');
    this.dataService.getMyProgramsData().subscribe(data=>{
      this.programmes = data.data;
      this.pevents = this.programmes.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    this.dataService.getMyCoursesData().subscribe(data=>{
      this.courses = data.data;
      this.cevents = this.courses.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    this.dataService.getMyModulesData().subscribe(data=>{
      this.modules = data.data;
      this.mevents = this.modules.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    this.dataService.getMyLearningActivityData().subscribe(data=>{
      this.activities = data.data;
      this.aevents = this.activities.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
  }

  getDate(event:any){
    this.pevents = [];
    this.cevents = [];
    this.mevents = [];
    this.aevents = [];
    let currentDate = moment(event.target.value).tz('Asia/Kolkata');
    this.currentSelectedDate = currentDate.toDate().toUTCString();
    let nextDate = moment(currentDate).tz('Asia/Kolkata').add(1, 'day');
    let date2 = nextDate.format('YYYY-MM-DD');
    if(date2 != undefined && event.target.value != undefined){
      this.pevents = this.programmes.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
      this.cevents = this.courses.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
      this.mevents = this.modules.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
      this.aevents = this.activities.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    }
  }
}
