import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
            if (currentUser) {
                
                if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {

                    switch(currentUser.role){
                        case 'admin':
                            this.router.navigate(['/admin']);
                            break;
                        case 'branch':
                            this.router.navigate(['/branch']);
                            break;
                    }
                }

                

                return true;
            }
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
