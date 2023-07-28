import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NgbDateStruct, NgbCalendar, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('dateInput', { static: true }) dateInput!: ElementRef;
  model!: NgbDateStruct;
  
  employeeCode:any="";
  mobile:any="";
  dob:any="";
  confirm_password:any="";
  new_password:any="";
  fieldTextType!: boolean;
  fieldTextType1!: boolean;

  placeholderText = 'Date of Birth'

  constructor(public authService:AuthenticationService,public toast:ToastrService,public router:Router,private calendar: NgbCalendar,private renderer: Renderer2) { 
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.dateInput.nativeElement, 'placeholder', 'YYYY-MM-DD');
  }
  modelS(){
    console.log(this.model)
  }
  create(){
    if(this.employeeCode == ""){
      this.toast.error("Please employee code.");
      return;
    }

    if(this.dob == ""){
      this.toast.error("Please enter date of birth.");
      return;
    }
    if(this.mobile == ""){
      this.toast.error("Please enter mobile no.");
      return;
    }
    if(this.new_password == ""){
      this.toast.error("Please enter new password.");
      return;
    }
    if(this.confirm_password == ""){
      this.toast.error("Please enter confirm password.");
      return;
    }

    if(this.confirm_password != this.new_password){
      this.toast.error("Please enter same new and confirm password");
      return;
    }

    this.authService.userForgotPassword(this.employeeCode.toString().toUpperCase(),this.dob,this.mobile,this.new_password).subscribe(data=>{
      if(data.status){
        this.toast.success(data.message);
        this.router.navigate(['/auth/login']);
      }else{
        this.toast.error(data.message);
      }
    });
  }
  
  back(){
    window.history.back();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

}
