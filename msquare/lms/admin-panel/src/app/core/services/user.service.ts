import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/auth.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(private http: HttpClient) { }
    
    get(): Observable<any> {
      return this.http.get(`${environment.baseURL}/user/all`,);
    }
  
    // getAllUsers
    getAllUsers() {
      return this.http.get<any>(`${environment.baseURL}/user/all`, )
      .pipe(map(data => {
        return data;
      }));
    }
    
    // updateUser
    updateUser(firstName: any, lastName: any, email: any, mobile: any, dob: any ) {
      const data = JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "mobile": mobile,
        "dob": dob,
      });
      return this.http.put<any>(`${environment.baseURL}/user/update`, data, {headers:{'Content-Type':'application/json'}})
      .pipe(map(data => {
        return data;
      }));
    }
  
    // updateImportUser
    updateImportUser(alldata:any) {
      const data = JSON.stringify({
        "data": alldata
      });
      return this.http.put<any>(`${environment.baseURL}/user/import-update`, data, {headers:{'Content-Type':'application/json'}})
      .pipe(map(data => {
        return data;
      }));
    }
    
    // getSigleUser
    getSigleUser(id : any) {
      return this.http.get<any>(`${environment.baseURL}/user/`+ id, )
      .pipe(map(data => {
        return data;
      }));
    }
    
    // changePassword
    changePassword(id : any, currentPassword : any,newPassword:any) {
      const data = JSON.stringify({
        "currentPassword": currentPassword,
        "newPassword": newPassword,
      });
      
      return this.http.put<any>(`${environment.baseURL}/user/change-password/` + id, data, {headers:{'Content-Type':'application/json'}})
      .pipe(map(data => {
        return data;
      }));
    }
}
