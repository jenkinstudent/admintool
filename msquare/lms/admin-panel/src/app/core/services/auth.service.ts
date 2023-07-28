import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth.models';
import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
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
      "credential": email,
      "password": password,
      "role": "admin",
      "platform":"web",
      "version":""
    });

    return this.http.post<any>(`${environment.baseURL}/auth/signin`,data,{headers:{'Content-Type': 'application/json'}})
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
  userSignUp(data: any) {
    return this.http.post<any>(`${environment.baseURL}/auth/signup`, data)
    .pipe(map(data => {
      return data;
    }));
  }

  forgotpassword(email: any) {
    return this.http.get<any>(`${environment.baseURL}/forgot-password/`+email)
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
  
  userForgotPassword(employeeCode:any,dob: any, mobile:any,password:any) {
    const data = JSON.stringify({
      "employeeCode":employeeCode,
      "dob": dob,
      "mobile": mobile,
      "password":password
    });

    return this.http.post<any>(`${environment.baseURL}/auth/forgot_password`,data,{headers:{'Content-Type': 'application/json'}})
    .pipe(map(data => {
      return data;
    }));
  }
  
}

