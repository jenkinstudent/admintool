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
