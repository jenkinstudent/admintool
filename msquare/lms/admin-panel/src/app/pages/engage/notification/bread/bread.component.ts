import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent {
  empData:any=[];
  programData:any=[];
  groupData:any=[];
  uploadImage=false;
  uploadImageName="";
  image="";
  imageError="";
  imageModal="";

  notTitle="";
  messageEditor= "";

  messageText="";
  segment="All";
  titleError="";
  messageError="";
  segmentPrgError="";
  segmentDepError="";
  segmentGroupError="";

  program="select";
  department="select";
  group="select";

  loader = false;
  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe) {
    this.title.setTitle("Create Notification - Fusion Microfinance");
  }

  ngOnInit(): void {
    
    this.getData();
    
  }

  getData(){
    this.api.allProg().subscribe(data=>{
      this.programData = data.data;
    });
    this.api.allGroups().subscribe(data=>{
      this.groupData = data.data;
    });
    this.api.getAllUsers().subscribe(data=>{
      this.empData = data.data.map((item:any) => item.department)
      .filter((value:any, index:any, self:any) => self.indexOf(value) === index)
    })

  }

  back(){
    window.history.back()
  }

  

  sendNotification(){
    this.clearError();
    if(this.notTitle == ""){
      
      return;
    }

    if(this.messageText == ""){
      
      return;
    }

    if(this.segment == "Program" && this.program == ""){
      
      return;
    }
    if(this.segment == "Department" && this.department == ""){
      
      return
    }
    if(this.segment == "Group" && this.group == ""){
      
      return
    }
    
    if(this.segment == "All"){
      this.api.createNotification(this.notTitle,this.messageText,this.segment,"",this.image).subscribe(result=>{
        if(result.status){
            this.toast.success(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.toast.error(result.message);
        }
      });
    }else if(this.segment == "Program"){
      this.api.createNotification(this.notTitle,this.messageText,this.segment,this.program,this.image).subscribe(result=>{
        if(result.status){
            this.toast.success(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.toast.error(result.message);
        }
      });
    }else if(this.segment == "Department"){
      this.api.createNotification(this.notTitle,this.messageText,this.segment,this.department,this.image).subscribe(result=>{
        if(result.status){
            this.toast.success(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.toast.error(result.message);
        }
      });
    }else if(this.segment == "Group"){
      this.api.createNotification(this.notTitle,this.messageText,this.segment,this.group,this.image).subscribe(result=>{
        if(result.status){
            this.toast.success(result.message);
            this.clearForm();
            this.getData();
        } else {
          this.toast.error(result.message);
        }
      });
    }
  }
  
  uploadImageFile(event:any){
    this.uploadImage= true;
    this.uploadImageName= event.target.files[0].name;
    if (event.target.files) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      
      this.api.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.image = res.data.url;
          // this.myFileInput.nativeElement.value = '';
        }
      });
    
  }
  }

  clearForm(){
    this.notTitle="";
    this.messageText="";
    this.segment="All";
    this.program="";
    this.department="";
    this.group="";
    this.uploadImage=false;
    this.uploadImageName="";
    this.image="";
  }
  clearError(){
    this.titleError = "";
    this.messageError = "";
    this.segmentDepError = "";
    this.imageError="";
    this.segmentGroupError="";
    this.segmentPrgError = "";
  }

}
