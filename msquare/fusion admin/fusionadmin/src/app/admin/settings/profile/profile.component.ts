import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  oldPass="";
  newPass="";
  confirmPass="";
  
   selectValue = ['Illustrator', 'Photoshop', 'CSS', 'HTML', 'Javascript', 'Python', 'PHP'];
  constructor(public authS:AuthenticationService,public toastr:ToastrService,public apiS:ApiService) { }

  ngOnInit(): void {
  }

  changePass(){
    if(this.newPass != this.confirmPass){
      this.toastr.error("Please Enter Same New and Confirm Password");
      return;
    }
    const data =  JSON.stringify({
      "oldPass":this.oldPass,
      "password":this.newPass
    })
    this.apiS.changePassword(data).subscribe(data=>{
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.toastr.success("Password Changed Successfully")
        this.oldPass="";
        this.newPass="";
        this.confirmPass="";
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }


}
