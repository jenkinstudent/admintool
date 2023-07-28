import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
 // Login Form
 passresetForm!: FormGroup;
 submitted = false;
 fieldTextType!: boolean;
 error = '';
 returnUrl!: string;
 // set the current year
 year: number = new Date().getFullYear();

 constructor(private formBuilder: FormBuilder,private toast: ToastrService,private auths:AuthenticationService) { }

 ngOnInit(): void {
   /**
    * Form Validatyion
    */
    this.passresetForm = this.formBuilder.group({
     email: ['', [Validators.required]]
   });
 }

 // convenience getter for easy access to form fields
 get f() { return this.passresetForm.controls; }

 /**
  * Form submit
  */
  onSubmit() {
   this.submitted = true;
   if(this.f?.['email'].value !== ''){
    this.auths.forgotpassword(this.f?.['email'].value).subscribe(res=>{
      this.toast.success(res.message);
    },error=>{
      this.toast.error(error.message);
    })
   }else{
      this.toast.error("Email is mandatory");
    }

   // stop here if form is invalid
   if (this.passresetForm.invalid) {
     return;
   }
 }


}
