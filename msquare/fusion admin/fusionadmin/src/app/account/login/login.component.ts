import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
// Login Form
loginForm!: FormGroup;
submitted = false;
fieldTextType!: boolean;
error = '';
rememberMe =true;
returnUrl!: string;
year: number = new Date().getFullYear();

constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService,private router: Router, public toast:ToastrService,
  private route: ActivatedRoute,public auth:AuthenticationService, public title: Title, public appC: AppComponent,) {
    title.setTitle("Login | "+ appC.title)
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // this.router.navigate(['/']);
    }
   
   }

ngOnInit(): void {
  /**
   * Form Validatyion
   */
   if(localStorage.getItem("email") != "" && localStorage.getItem("email") != undefined){
     this.loginForm = this.formBuilder.group({
       email: [localStorage.getItem("email"), [Validators.required, Validators.email]],
       password: ['', [Validators.required]],
     });
   }else{
     this.loginForm = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required]],
     });
   }
  
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

get f() { return this.loginForm.controls; }

 onSubmit() {
  this.submitted = true;
  if(this.f['email'].value !== '' && this.f['password'].value !== ''){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.f['email'].value) == false) {
      this.toast.error("Enter a valid Email");
    }else{
      this.auth.userSignIn(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
       if(this.rememberMe){
         localStorage.removeItem("remember");
         localStorage.removeItem("email");
         localStorage.setItem("remember","true");
         localStorage.setItem("email",this.f['email'].value);
       }        
       window.location.replace(this.returnUrl);
     },
     error => {
      if(error.status == "0"){
        this.toast.error(error.statusText);
      } else {
        this.toast.error(error.message);
      }
     });
    }
  }else{
    this.toast.error("Enter Email and Password");
  }
 }

 toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

}
