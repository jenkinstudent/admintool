import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';
import * as moment from 'moment-timezone';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  greet:any="";
  @ViewChild('termscondModal') termscondModal!: ElementRef;

  employeesL:any=0;
  modulesL:any=0;
  programmesL:any=0;
  activitiesL:any=0;

  programmes:any=[];
  courses:any=[];
  modules:any=[];
  activities:any=[];
  chairman:any=[];
  news:any=[];
  othernews:any=[];
  achievements:any=[];
  pevents:any=[];
  cevents:any=[];
  mevents:any=[];
  aevents:any=[];
  trainingGlimpses:any=[];
  trainingday:any=[];

  currentSelectedDate:any="";

  baseURL=environment.baseURL;

  resultAnnouncing:any =false;
  resultAnnouceQuiz:any;
  resultAnnouceTime:any;

  showNavigationIndicators: any;
  element: any;

  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  zoom: number = 1;

  constructor(@Inject(DOCUMENT) private document: any,public authService:AuthenticationService,public apiS:ApiService,public modalService:NgbModal,private dataService: DataService) { 
    
  }

  ngAfterViewInit(){
    if(!this.authService.currentUserValue.isAgree){
      this.modalService.open(this.termscondModal ,{centered:true,backdrop:'static'});
    }
  }
  
  ngOnInit(): void {
    this.element = document.documentElement;
    this.greetData();
    this._fetchData();
  }

  greetData(){
    const myDate = moment().tz('Asia/Kolkata');
    const hrs = myDate.hour();
    if (hrs < 12)
      this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      this.greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      this.greet = 'Good Evening';
  }

  _fetchData(){
    this.dataService.getEmpDashboardData().subscribe(data => {
      this.trainingday = data.data.topWinners;
      this.employeesL = data.data.count.activeEmp;
      this.trainingGlimpses = data.data.trainingGlimpse;
      this.chairman = data.data.chairman;
      if(data.data.recentQuiz.data){
        this.resultAnnouceTime = data.data.recentQuiz.resultTime;
        this.resultAnnouncing = true;
        this.resultAnnouceQuiz = data.data.recentQuiz.quiz;
      }else{
        this.resultAnnouncing = false;
      }
      this.news = data.data.fusionNews;
      this.othernews = data.data.otherNews;
    });
    let date = moment().tz('Asia/Kolkata');
    let currentDate = moment(date).tz('Asia/Kolkata').startOf('day');
    let tomorrow = moment(currentDate).tz('Asia/Kolkata').add(1, 'day');
    let nextDate = moment(tomorrow).tz('Asia/Kolkata').startOf('day');
    this.currentSelectedDate = currentDate.format('YYYY-MM-DD');
    this.dataService.getMyProgramsData().subscribe(data=>{
      this.programmesL = data.data.length;
      this.programmes = data.data;
      this.pevents = this.programmes.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    this.dataService.getMyCoursesData().subscribe(data=>{
      this.courses = data.data;
      this.cevents = this.courses.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    this.dataService.getMyModulesData().subscribe(data=>{
      this.modulesL = data.data.length;
      this.modules = data.data;
      this.mevents = this.modules.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    this.dataService.getMyLearningActivityData().subscribe(data=>{
      this.activitiesL = data.data.length;
      this.activities = data.data;
      this.aevents = this.activities.filter((obj:any) => (moment(obj.createdAt).tz('Asia/Kolkata') >= currentDate && moment(obj.createdAt).tz('Asia/Kolkata') <= nextDate));
    })
    
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }


  iAgree(){
    
    const data =JSON.stringify({
      "isAgree":true
    })
    console.log(data);
    this.apiS.updateSingleUser(data,this.authService.currentUserValue.id).subscribe(data=>{
      if(data.status){
        let localData = {
          "id": this.authService.currentUserValue.id, 
          "email": this.authService.currentUserValue.email,
          "salutation": this.authService.currentUserValue.salutation,
          "firstName": this.authService.currentUserValue.firstName,
          "lastName": this.authService.currentUserValue.lastName,
          "mobile": this.authService.currentUserValue.mobile,
          "whatsappNo": this.authService.currentUserValue.whatsappNo,
          "dob": this.authService.currentUserValue.dob,
          "photo": this.authService.currentUserValue.photo,
          "accessToken": this.authService.currentUserValue.accessToken,
          "refreshToken": this.authService.currentUserValue.refreshToken,
          "lastLoginOn": this.authService.currentUserValue.lastLoginOn,
          "isAgree":true
        }
        localStorage.setItem('currentUser', JSON.stringify(localData));
        this.authService.updateData(localData);
        this.modalService.dismissAll();
      }
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
