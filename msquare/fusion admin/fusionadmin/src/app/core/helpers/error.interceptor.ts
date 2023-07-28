import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401  || err.status === 403) {
              //  auto logout if 401 response returned from api
              let currentUser = this.authenticationService.currentUserValue;
              if (currentUser && currentUser.rememberMe) {
                this.authenticationService.refreshToken(currentUser.refreshToken).subscribe(user=>{
                  
                });
              }else {
                this.authenticationService.logout();
                location.reload();
              }
            }
            const error = err.error.error || err.statusText;
            return throwError(error);
        }))
    }
}
