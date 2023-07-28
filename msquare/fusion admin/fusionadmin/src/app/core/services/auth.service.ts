import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
@Injectable({ providedIn: 'root' })


/**
 * Auth-service Component
 */
export class AuthenticationService {

    
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")!));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  userSignIn(email : any, password: any) {
    const data = JSON.stringify({
      "email": email,
      "password": password
    });

    return this.http.post<any>(`${environment.baseURL}users/login`,data,{headers:{'Content-Type': 'application/json'}})
    .pipe(map(data => {
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      this.currentUserSubject.next(data.data);
      return data.data;
    }));
  }

  updateData(data:any){
    this.currentUserSubject.next(data);
  }


  // userSignUp
  userSignUp(firstName: any, lastName: any, email: any, mobile: any, dob: any, password: any) {
    const data = JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "mobile": mobile,
      "dob": dob,
      "password": password,
      "roles" :["user"]
    });
    return this.http.post<any>(`${environment.baseURL}/auth/signup`, data)
    .pipe(map(data => {
      return data;
    }));
  }

  forgotpassword(email: any) {
    return this.http.get<any>(`${environment.baseURL}forgot-password/`+email)
    .pipe(map(data => {
      return data;
    }));
  }
  

  
  // refreshToken
  refreshToken(token : any) {
    const data = JSON.stringify({
      "refreshToken": token
    });
    return this.http.post<any>(`${environment.baseURL}/auth/refreshtoken`, data)
    .pipe(map(data => {
      return data;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    window.location.replace("/");
  }

  hasApprovePermission(module:string,amount:number,verifyStatus:any){
    if(!this.currentUserValue.issuperadmin){
      switch(module){
        case "utility":
            if(this.currentUserValue.designation.id == 'L2-Admin' && this.currentUserValue.roleProfile == 'admin'){
              let index = verifyStatus.findIndex(
                (element:any) => element.role === "L1-Admin" && element.status === 'Verified'
              );
              if(index != -1){
                return true;
              }else{
                return false;
              }
            } else {
              return false;
            }
          break;
        case "rent":
          if(this.currentUserValue.designation.id == 'L2-Admin' && this.currentUserValue.roleProfile == 'admin'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === "L1-Admin" && element.status === 'Verified'
            );
            if(index != -1){
              return true;
            }else{
              return false;
            }
          } else {
            return false;
          }
        break;
        case "courier":
          if(this.currentUserValue.designation.id == 'L2-Admin' && this.currentUserValue.roleProfile == 'admin'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === 'L1-Admin' && element.status === 'Verified'
            );
            if(index != -1){
              return true;
            }else{
              return false;
            }
          } else {
            return false;
          }
          break;
      }
    }else{
      return false;
    }
   
    return false;
  }

  hasVerifiedPermission(module:string,amount:number,verifyStatus:any){
    if(!this.currentUserValue.issuperadmin){
      switch(module){
        case "utility":
          if(this.currentUserValue.roleProfile == 'admin'){
            if(_.some(verifyStatus, ['role', "business"])){
              let index = verifyStatus.findIndex(
                (element:any) => element.role === 'business' && element.status == 'Verified'
              );
              if(index != -1){
                if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
                  let index = verifyStatus.findIndex(
                    (element:any) => element.status === 'Pending'
                  );
                  if(index != -1){
                    if(verifyStatus[index].status == "Pending"){
                      return true;
                    }else{
                      return false;
                    } 
                  }else{
                    return false;
                  }
                } else {
                  return false;
                }
              }else{
                return false;
              }
            }else{
              let index = verifyStatus.findIndex(
                (element:any) => element.role === 'L1-Admin' && element.status == 'Pending'
              );
              if(index != -1){
                if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
                  let index = verifyStatus.findIndex(
                    (element:any) => element.status === 'Pending'
                  );
                  if(index != -1){
                    if(verifyStatus[index].status == "Pending"){
                      return true;
                    }else{
                      return false;
                    } 
                  }else{
                    return false;
                  }
                } else {
                  return false;
                }
              }else{
                return false;
              }
            }
            
            if(_.some(verifyStatus, ['role', "business"]) && _.some(verifyStatus, ['status', "Verified"])){
              if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
                let index = verifyStatus.findIndex(
                  (element:any) => element.status === 'Pending'
                );
                if(index != -1){
                  if(verifyStatus[index].status == "Pending"){
                    return true;
                  }else{
                    return false;
                  } 
                }else{
                  return false;
                }
              } else {
                return false;
              }
            }else if(!_.some(verifyStatus, ['role', "business"])){
              if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
                let index = verifyStatus.findIndex(
                  (element:any) => element.status === 'Pending'
                );
                if(index != -1){
                  if(verifyStatus[index].status == "Pending"){
                    return true;
                  }else{
                    return false;
                  }
                }else{
                  return false;
                }
              } else {
                return false;
              }
            }
          }else if(this.currentUserValue.roleProfile == 'business'){
            if(this.currentUserValue.permission.isUtility){
              if(_.some(verifyStatus, ['slab._id', this.currentUserValue.permission.utilitySlab._id]) && _.some(verifyStatus, ['role', this.currentUserValue.designation.role]) && _.some(verifyStatus, ['status', "Pending"])){
                let index = verifyStatus.findIndex(
                  (element:any) => element.slab?._id === this.currentUserValue.permission?.utilitySlab?._id && element.status === 'Pending'
                );
                if(index != -1){
                  if(verifyStatus[index].status == "Pending"){
                    return true;
                  }else{
                    return false;
                  } 
                }else{
                  return false;
                }
                
              } else {
                return false;
              }
            }else {
              return false;
            }
          }
          break;
        case "rent":
          if(this.currentUserValue.designation.id == 'Field-Admin'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === 'Field-Admin' && element.status == 'Pending'
            );
            if(index != -1){
              if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
                let index1 = verifyStatus.findIndex(
                  (element:any) => element.status === 'Pending'
                );
                if(index1 != -1){
                  if(verifyStatus[index1].status == "Pending"){
                    return true;
                  }else{
                    return false;
                  } 
                }else{
                  return false;
                }
              } else {
                return false;
              }
            }else{
              return false;
            }
          }else if(this.currentUserValue.designation.id == 'L1-Admin'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === 'Field-Admin' && element.status == 'Verified'
            );
            if(index != -1){
              if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
                let index1 = verifyStatus.findIndex(
                  (element:any) => element.status === 'Pending'
                );
                if(index1 != -1){
                  if(verifyStatus[index1].status == "Pending"){
                    return true;
                  }else{
                    return false;
                  } 
                }else{
                  return false;
                }
              } else {
                return false;
              }
            }else{
              return false;
            }
          }
          
        break;
        case "courier":
          if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
            let index = verifyStatus.findIndex(
              (element:any) => element.status === 'Pending'
            );
            if(index != -1){
              if(verifyStatus[index].status == "Pending"){
                return true;
              }else{
                return false;
              } 
            }else{
              return false;
            }
          } else {
            return false;
          }
        break;
      }
    }else{
      return false;
    }
   
    return false;
  }

  hasFApprovePermission(module:string,amount:number,verifyStatus:any){
    if(!this.currentUserValue.issuperadmin){
      switch(module){
        case "utility":
          if(this.currentUserValue.designation.id == 'L2-Finance' && this.currentUserValue.roleProfile == 'finance'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === 'L1-Finance' && element.status === 'Verified'
            );
            if(index != -1){
              return true;
            }else{
              return false;
            }
          } else {
            return false;
          }
          break;
        case "rent":
          if(this.currentUserValue.designation.id == 'L2-Finance' && this.currentUserValue.roleProfile == 'finance'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === 'L1-Finance' && element.status === 'Verified'
            );
            if(index != -1){
              return true;
            }else{
              return false;
            }
          } else {
            return false;
          }
        break;
        case "courier":
          if(this.currentUserValue.designation.id == 'L2-Finance' && this.currentUserValue.roleProfile == 'finance'){
            let index = verifyStatus.findIndex(
              (element:any) => element.role === 'L1-Finance' && element.status === 'Verified'
            );
            if(index != -1){
              return true;
            }else{
              return false;
            }
          } else {
            return false;
          }
          break;
      }
    }else{
      return false;
    }
   
    return false;
  }

  hasFVerifiedPermission(module:string,amount:number,verifyStatus:any){
    if(!this.currentUserValue.issuperadmin){
      switch(module){
        case "utility":
          if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
            let index = verifyStatus.findIndex(
              (element:any) => element.status === 'Pending'
            );
            if(index != -1){
              if(verifyStatus[index].status == "Pending"){
                return true;
              }else{
                return false;
              } 
            }else{
              return false;
            }
          } else {
            return false;
          }
          break;
        case "rent":
          if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
            let index = verifyStatus.findIndex(
              (element:any) => element.status === 'Pending'
            );
            if(index != -1){
              if(verifyStatus[index].status == "Pending"){
                return true;
              }else{
                return false;
              } 
            }else{
              return false;
            }
          } else {
            return false;
          }
        break;
        case "courier":
          if(_.some(verifyStatus, ['role', this.currentUserValue.designation.id]) && _.some(verifyStatus, ['status', "Pending"])){
            let index = verifyStatus.findIndex(
              (element:any) => element.status === 'Pending'
            );
            if(index != -1){
              if(verifyStatus[index].status == "Pending"){
                return true;
              }else{
                return false;
              } 
            }else{
              return false;
            }
          } else {
            return false;
          }
        break;
      }
    }else{
      return false;
    }
   
    return false;
  }
}

