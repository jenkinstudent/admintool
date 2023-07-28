import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit{

  edit = false;
  label = "";
  id = "";
  loader = false;

  to : any = [];
  type = "";
  subject = "";
  message = "";
  attachments : any = [];

  users : any = [];
  select:any = "";
  empData : any = [];
  groupData : any = [];
  
  public Editor = ClassicEditor;
  config = ClassicEditor.defaultConfig;

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe) {
  }

  ngOnInit(): void {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'alignment',                                                 // <--- ADDED
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'undo',
          'redo'
      ]
      },
      height:'100px'
    }
    this.route.params.subscribe((data:any)=>{
      if(data.activity == 'create'){
        this.edit = false;
        this.label= "Create Email";
        this.title.setTitle("Create Email - Fusion Microfinance");
      }
    });
    // this.api.getAllUsersByPagination(1,this.searchTerm,this.statusFilter).subscribe(data=>{
    //   this.page = data.page;
    //   this.totalPages = data.totalPages;
    //   this.hasMore = data.hasMore;
    //   this.employeesData = data.data;
    //   this.loading = false;
    // });
    // this.api.getAllDepartments().subscribe(data=>{
    //   this.empData = data.data;
    // })
    this.api.allGroups().subscribe(data=>{
      this.groupData = data.data;
    });
  }

  back(){
    window.history.back()
  }

  getIndividual(event:any){
    this.select = this.users[event].firstName + " "+ this.users[event].lastName;
    this.to.push(this.users[event]._id);
  }

  getByGroup(event:any){
    this.api.singleGroup(event).subscribe(data=>{
      this.select = data.data.name;
    })
    this.api.getAllUsersByGroup(event).subscribe(data=>{
      for(let i =0;i<data.data.length;i++){
        this.to.push(data.data[i]._id)
      }
    })
  }

  getByDept(event:any){
    this.select = event;
    this.api.getAllUsersByDept(event).subscribe(data=>{
      for(let i =0;i<data.data.length;i++){
        this.to.push(data.data[i]._id)
      }
    })
  }


  save(){
    
    // if(this.description == ""){
      
    //   return;
    // }

    // if(this.photo == ""){
      
    //   return;
    // }

    // if(this.date == ""){
      
    //   return;
    // }
    // if(this.type == ""){
      
    //   return;
    // }
    // if(this.category == ""){
      
    //   return;
    // }

    // if(this.edit){
    //   this.api.updateNews(this.description,this.photo, this.date,this.type,this.category,this.id).subscribe(result=>{
    //     if(result.status){
    //       this.toast.success(result.message);
    //     }else{
    //       this.toast.error(result.message);
    //     }
    //   })
    // } else {
    //   this.api.createNews(this.description,this.photo,this.date,this.type,this.category).subscribe(result=>{
    //     if(result.status){
    //       this.toast.success(result.message);
    //       this.description ="";
    //       this.date="";
    //       this.photo = "";
    //       this.uploadPhotoName= "";
    //       this.uploadPhotoS = false;
    //       this.category="";
    //       this.type ="";
    //     }else{
    //       this.toast.error(result.message);
    //     }
    //   })
    // }

  }


}
