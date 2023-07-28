import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 loader = false;
 empData:any=[];
 employeeCode:any="";
 salutation:any="";
 firstName:any="";
 lastName:any="";
 mobile:any="";
 dob:any="";
 department:any="";
 gender:any="";
 email:any="";
 state:any="";
 cluster:any="";
 branch:any="";
 designation:any="";
 password:any="";
 confirm_password:any="";
 fieldTextType!: boolean;
 fieldTextType1!: boolean;
 constructor(public apiS:ApiService,public toast:ToastrService,public router:Router,private dataService:DataService) {
  }

 ngOnInit(): void {
   this.getData();
 }

 getData(){
   this.dataService.getUsers().subscribe(data=>{
     this.empData = data.data.map((item:any) => item.department)
     .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
   })
 }
 register(){
   if(this.employeeCode.toString().toUpperCase() == ""){
     this.toast.error("Please enter employee code")
     return;
   }
   if(this.firstName == ""){
    this.toast.error("Please enter first name")
     return;
   }
   if(this.lastName == ""){
    this.toast.error("Please enter last name")
     return;
   }
   if(this.mobile == ""){
    this.toast.error("Please enter mobile no.")
     return;
   }
   if(this.mobile.toString().length != 10){
    this.toast.error("Please enter 10 digit mobile no.")
     return;
   }
   if(this.dob == ""){
    this.toast.error("Please enter date of birth")
     return;
   }
   if(this.department == ""){
    this.toast.error("Please enter department")
     return;
   }
   if(this.gender == ""){
    this.toast.error("Please enter gender")
     return;
   }
   if(this.state == ""){
    this.toast.error("Please enter state")
     return;
   }
  //  if(this.cluster == ""){
  //   this.toast.error("Please enter cluster")
  //    return;
  //  }
   if(this.branch == ""){
    this.toast.error("Please enter branch")
     return;
   }
   if(this.designation == ""){
    this.toast.error("Please enter designation");
     return;
   }

   if(this.email == ""){
    this.toast.error("Please enter email");
     return;
   }

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email) == false) {
      this.toast.error("Please! Enter valid email.");
      return;
    }

   if(this.password == ""){
    this.toast.error("Please enter password");
     return;
   }
   if(this.confirm_password == ""){
    this.toast.error("Please enter confirm password");
     return;
   }
   if(this.password != this.confirm_password){
    this.toast.error("Please enter same password and confirm password");
     return;
   }

   this.apiS.createUserRequests(this.employeeCode.toString().toUpperCase(),this.salutation,this.firstName,this.lastName,this.email,this.password,
     this.mobile,this.dob,this.gender,this.department,this.state,this.cluster,this.branch,this.designation).subscribe(res=>{
     if(res.status == "success"){
       this.clearForm();
       this.toast.success(res.message);
       this.apiS.createNotification("Employee Registration","Employee signup request received","Admin","").subscribe(data=>{
       });
       this.router.navigate(['/auth/login']);
     } else {
       this.toast.error(res.message);
     }
   });
 }

 clearForm(){
   this.employeeCode="";
   this.firstName="";
   this.lastName="";
   this.mobile="";
   this.dob="";
   this.department="";
   this.gender="";
   this.email="";
   this.password="";
   this.confirm_password="";
 }


 toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
toggleFieldTextType1() {
  this.fieldTextType1 = !this.fieldTextType1;
}

}
