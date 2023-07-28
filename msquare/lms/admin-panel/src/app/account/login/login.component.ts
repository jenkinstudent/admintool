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
import { ApiService } from 'src/app/core/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  email:any = '';
  password = '';
  loader = false;
  returnUrl = "";
  rememberMe = false;
  language="English - EN";

 // Login Form
 loginForm!: FormGroup;
 submitted = false;
 fieldTextType!: boolean;
 error = '';
 showNavigationArrows: any;

 constructor(private formBuilder: FormBuilder,public toastr:ToastrService,public translate:TranslateService,public title:Title,public route:ActivatedRoute,public authS:AuthenticationService, public appComponent: AppComponent) {
  this.title.setTitle("Login - Fusion Microfinance");
  if(localStorage.getItem("credential") != "" && localStorage.getItem("credential") != undefined){
    this.email = localStorage.getItem("credential");
  }
  }

 ngOnInit(): void {
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
 }

 changelang(){
  this.translate.use(this.language);  
  }

login(){
  this.loader = true;

  if(this.email == ''){
    this.loader = false;
    this.toastr.error("Please Enter Email");
    return;
  }

  if(this.password == ''){
    this.loader = false;
    this.toastr.error("Please Enter Password");
    return;
  }

  if(this.language == ''){
    this.loader = false;
    this.toastr.error("Please Select Language");
    return;
  }

  this.authS.userSignIn(this.email, this.password).pipe(first()).subscribe(data => {
    this.loader = false;
    if(this.rememberMe){
      localStorage.removeItem("remember");
      localStorage.removeItem("credential");
      localStorage.setItem("remember","true");
      localStorage.setItem("credential",this.email);
    }         
    localStorage.setItem("language",this.language);
    window.location.replace(this.returnUrl);
  },
  error => {
    if(error.status == "0"){
      this.toastr.error(error.statusText);
    } else {
      this.toastr.error(error.message);
    }
    this.loader = false;
  });
}
  toggleFieldTextType() {
   this.fieldTextType = !this.fieldTextType;
 }

}
