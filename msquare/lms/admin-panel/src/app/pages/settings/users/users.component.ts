import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @ViewChild("filtetcontent") filtetcontent!:TemplateRef<any>;
  fieldTextType!: boolean;
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  userArr:any=[];
  label = "Create User"
  
  firstName = "";
  lastName = "";
  email = "";
  mobile = "";
  password = "";
  salutation = "";

  id="";
  edit = false;


  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public auth: AuthenticationService, public excelS: ExcelService,private offcanvasService: NgbOffcanvas,
    public modalService:NgbModal) {
    this.title.setTitle("Users - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Settings' },
      { label: 'Users' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.userArr = [];
    this.api.getAllAdminUsers().subscribe(data=>{
      this.userArr = data.data; 
    })
  }

  openCreate(){
    this.offcanvasService.open(this.filtetcontent, { position: 'end' });
  }

  openEdit(item:any){
    this.label = "Edit User"
    this.edit = true;
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.mobile = item.mobile;
    this.email = item.email;
    this.id = item._id;
    this.offcanvasService.open(this.filtetcontent, { position: 'end' });
  }

  submit(){
    if(this.edit){
      const data = JSON.stringify({
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        mobile:this.mobile,
        roles:"admin"
      });

      this.api.updateAdminUser(data,this.id).subscribe(res=>{
        this.toast.success(res.message);
        this.offcanvasService.dismiss();
        this.getData();
        this.clear();
      },error=>{
        console.log(error);
        this.toast.error(error.message);
      });
    } else {
      const data = JSON.stringify({
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.email,
        "mobile": this.mobile,
        "password": this.password,
        "roles" :"admin",
      });
      this.api.createUser(data).subscribe(res=>{
        this.toast.success(res.message);
        this.offcanvasService.dismiss();
        this.getData();
        this.clear();
      },error=>{
        console.log(error);
        this.toast.error(error.message);
      });
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  generatePassword(){
    var length = 10;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var password = "";
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    
    this.password = password;
    this.fieldTextType = true;
  }

  clear(){
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.mobile = "";
    this.password = "";
    this.salutation = "";

    this.id = "";
    this.edit = false;
  }
}
