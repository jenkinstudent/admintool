import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { AuthenticationService } from './auth.service';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import { ModulePipe } from 'src/app/core/pipes/module.pipe';
import { withCache } from '@ngneat/cashew';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  notifications:any = [];
  unreadNotification = 0;

  id:any="";
  moduleId:any;
  courseId:any;
  courseIndex:any;
  moduleIndex:any;

  private empDashboardData: any;
  private myModulesData: any;
  private myModulesDoneData: any;
  private myModulesCertifiedData: any;
  private myCoursesData: any;
  private myCoursesDoneData: any;
  private myCoursesModulesDoneData: any;
  private myCoursesCertifiedData: any;
  private myProgramsData: any;
  private myProgramsDoneData: any;
  private myProgramsCoursesDoneData: any;
  private myProgramsCoursesModulesDoneData: any;
  private myProgramsCertifiedData: any;
  private myLearningActivityData: any;
  private myLearningActivityDoneData: any;
  private myLearningActivityCoursesDoneData: any;
  private myLearningActivityCoursesModulesDoneData: any;
  private top100winners: any;
  private recentOpenQuiz: any;
  private topWinners: any;
  private posts: any;
  private myPosts: any;
  private supports: any;
  private users: any;
  private ceos: any;
  private redeemItems: any;

  constructor(public api:ApiService,public auth:AuthenticationService,public route:ActivatedRoute,public http:HttpClient) {
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


  getEmpDashboardData(): Observable<any> {
    if (this.empDashboardData) {
      return of(this.empDashboardData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/emp-dashboard`).pipe(tap(data=>{
        this.empDashboardData = data;
      }));
    }
  }


   getMyModulesData(): Observable<any>{
    if (this.myModulesData) {
      return of(this.myModulesData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/moduleswatch-emp/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        data.data.sort(function(a:any, b:any){return a.index - b.index});
        this.myModulesData = data;
      }));
      
    }
  }

  getMyModulesDoneData(): Observable<any> {
    if (this.myModulesDoneData) {
      return of(this.myModulesDoneData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/moduleswatch-emp-count/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myModulesDoneData = data; 
      }));
      
    }
  }

  getMyCoursesData(): Observable<any> {
    if (this.myCoursesData) {
      return of(this.myCoursesData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/courseswatch-emp/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        data.data.sort(function(a:any, b:any){return a.index - b.index});
        data.data.map((cData:any) => {
          cData.modules.sort(function(a:any, b:any){return a.index - b.index});
        })
        this.myCoursesData = data; 
      }));
      
    }
  }

  getMyCoursesDoneData(): Observable<any> {
    if (this.myCoursesDoneData) {
      return of(this.myCoursesDoneData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/courseswatch-emp-count/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myCoursesDoneData = data; 
      }));
      
    }
  }

  getMyCoursesModulesDoneData(id:any): Observable<any> {
    // if (this.myCoursesModulesDoneData) {
    //   return of(this.myCoursesModulesDoneData);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/courseswatch-single-count/`+id).pipe(tap(async data=>{
        this.myCoursesModulesDoneData = data; 
      }));
      
    // }
  }

  getMyProgramsData(): Observable<any> {
    if (this.myProgramsData) {
      return of(this.myProgramsData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/programswatch-emp/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        data.data.sort(function(a:any, b:any){return a.index - b.index});
        data.data.map((cData:any) => {
          cData.courses.sort(function(a:any, b:any){return a.index - b.index});
          cData.courses.map((mData:any) => {
            mData.module.sort(function(a:any, b:any){return a.index - b.index});
          })
        })
        this.myProgramsData = data; 
      }));
      
    }
  }

  getMyProgramsDoneData(): Observable<any> {
    if (this.myProgramsDoneData) {
      return of(this.myProgramsDoneData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/programswatch-emp-count/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myProgramsDoneData = data; 
      }));
      
    }
  }

  getMyProgramsCoursesDoneData(id:any): Observable<any> {
    // if (this.myProgramsCoursesDoneData) {
    //   return of(this.myProgramsCoursesDoneData);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/programswatch-single-count/`+id).pipe(tap(async data=>{
        this.myProgramsCoursesDoneData = data; 
      }));
      
    // }
  }

  getMyProgramsCoursesModulesDoneData(id:any,courseId:any): Observable<any> {
    // if (this.myProgramsCoursesModulesDoneData) {
    //   return of(this.myProgramsCoursesModulesDoneData);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/programswatch-single-module-count/`+id+`/`+courseId).pipe(tap(async data=>{
        this.myProgramsCoursesModulesDoneData = data; 
      }));
      
    // }
  }

  getMyLearningActivityData(): Observable<any> {
    if (this.myLearningActivityData) {
      return of(this.myLearningActivityData);
    } else {
      return this.http.get<any>(`${environment.baseURL}/learningactivitywatch-emp/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myLearningActivityData = data; 
      })); 
    }
  }

  getMyLearningActivityDoneData(): Observable<any> {
    // if (this.myLearningActivityDoneData) {
    //   return of(this.myLearningActivityDoneData);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/learningactivity-emp-count/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myLearningActivityDoneData = data; 
      }));
    // }
  }

  getMyLearningActivityCoursesDoneData(id:any): Observable<any> {
    // if (this.myLearningActivityCoursesDoneData) {
    //   return of(this.myLearningActivityCoursesDoneData);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/learningactivitywatch-course-count/`+id+`/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myLearningActivityCoursesDoneData = data; 
      }));
    // }
  }

  getMyLearningActivityCoursesModulesDoneData(id:any,courseId:any): Observable<any> {
    // if (this.myLearningActivityCoursesModulesDoneData) {
    //   return of(this.myLearningActivityCoursesModulesDoneData);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/learningactivitywatch-module-count/`+id+`/`+courseId+`/`+this.auth.currentUserValue.id).pipe(tap(async data=>{
        this.myLearningActivityCoursesModulesDoneData = data; 
      }));
    // }
  }

  getMyModulesCertifiedData(moduleId:any, quizId:any){
    return this.http.get<any>(`${environment.baseURL}/moduleswatch-certified/`+moduleId+`/`+quizId).pipe(tap(async data=>{
      this.myModulesCertifiedData = data; 
    }));
  }

  getMyCoursesCertifiedData(courseId:any, quizId:any){
    return this.http.get<any>(`${environment.baseURL}/courseswatch-certified/`+courseId+`/`+quizId).pipe(tap(async data=>{
      this.myCoursesCertifiedData = data; 
    }));
  }

  getMyProgramsCertifiedData(programId:any, quizId:any){
    return this.http.get<any>(`${environment.baseURL}/programswatch-certified/`+programId+`/`+quizId).pipe(tap(async data=>{
      this.myProgramsCertifiedData = data; 
    }));
  }

  getTop100Winners(programId:any, quizId:any){
    return this.http.get<any>(`${environment.baseURL}/all-winners-quiz/`+programId+`/`+quizId,).pipe(tap(async data => {
      this.top100winners = data; 
    }));
  }

  getRecentOpenQuiz(count:any){
    // if (this.recentOpenQuiz) {
    //   return of(this.recentOpenQuiz);
    // } else {
      return this.http.get<any>(`${environment.baseURL}/recent-open-quiz/`+count,{context: withCache()}).pipe(tap(data => {
        this.recentOpenQuiz = data;
      }));
    // }
  }

  getTopWinners(){
    if (this.topWinners) {
      return of(this.topWinners);
    } else {
      return this.http.get<any>(`${environment.baseURL}/top-winners`,{context: withCache()}).pipe(tap(data => {
        this.topWinners = data;
      }));
    }
  }

  getAllPost(){
    if (this.posts) {
      return of(this.posts);
    } else {
      return this.http.get<any>(`${environment.baseURL}/postactive`,{context: withCache()}).pipe(tap(data => {
        data.data.map((res:any) => {
          res.isLike=false;
          res.isLoading=false;
          if(res.likes != undefined){
            res.likes.map((likes:any) => {
              res.isLike=false;
              if(this.auth.currentUserValue.id == likes.employeeId){
                res.isLike =true;
              }else{
                res.isLike=false;
              }
            })
          }else{
            res.isLike=false;
          }
        })
        this.posts = data;
      }));
    }
  }

  getMyPost(){
    if (this.myPosts) {
      return of(this.myPosts);
    } else {
      return this.http.get<any>(`${environment.baseURL}/postactive-user/`+this.auth.currentUserValue.id,{context: withCache()}).pipe(tap(data => {
        data.data.map((res:any) => {
          res.isLike=false;
          res.isLoading=false;
          if(res.likes != undefined){
            res.likes.map((likes:any) => {
              res.isLike=false;
              if(this.auth.currentUserValue.id == likes.employeeId){
                res.isLike =true;
              }else{
                res.isLike=false;
              }
            })
          }else{
            res.isLike=false;
          }
        })
        this.myPosts = data;
      }));
    }
  }

  getSupports(){
    if (this.supports) {
      return of(this.supports);
    } else {
      return this.http.get<any>(`${environment.baseURL}/support/emp/`+this.auth.currentUserValue.id,{context: withCache()}).pipe(tap(data => {
        this.supports = data;
      }));
    }
  }

  getUsers(){
    if (this.users) {
      return of(this.users);
    } else {
      return this.http.get<any>(`${environment.baseURL}/user/all`,{context: withCache()}).pipe(tap(data => {
        this.users = data;
      }));
    }
  }

  getCEOs(){
    if (this.ceos) {
      return of(this.ceos);
    } else {
      return this.http.get<any>(`${environment.baseURL}/ceo`,{context: withCache()}).pipe(tap(data => {
        this.ceos = data;
      }));
    }
  }

  getRedeemItems(){
    if (this.redeemItems) {
      return of(this.redeemItems);
    } else {
      return this.http.get<any>(`${environment.baseURL}/redeemItems-all`,{context: withCache()}).pipe(tap(data => {
        this.redeemItems = data;
      }));
    }
  }
}