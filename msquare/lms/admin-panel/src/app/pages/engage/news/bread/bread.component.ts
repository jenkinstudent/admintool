import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent {
  edit = false;
  label = "";
  id = "";
  uploadPhotoS = false;
  uploadPhotoName = "";
  photo = "";
  loader = false;

  
  public Editor = ClassicEditor;
  config = ClassicEditor.defaultConfig;

  description = "";
  date = "";
  imageModal = "";
  type = "";
  category:any="";

  

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe) {
    this.title.setTitle("News - Fusion Microfinance");
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
        this.label= "Create News";
        this.title.setTitle("Create News - Fusion Microfinance");
      }else{
        this.edit = true;
        
        this.label= "Edit News";
        this.title.setTitle("Edit News - Fusion Microfinance");
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.api.singleNews(editParam.id).subscribe(res=>{
            console.log(res);  
            this.description = res.data.description;
            this.type = res.data.type;
            this.photo = res.data.photo;
            this.category=res.data.category;
            this.date =  moment(res.data.date).tz('Asia/Kolkata').format('YYYY-MM-DD');

          })
        });
      }
    });
  }

  back(){
    window.history.back()
  }

  uploadPhoto(event:any){
    this.uploadPhotoS= true;
    this.uploadPhotoName= event.target.files[0].name;
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.api.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.photo = data.data.url;
      }
    });
  }

  save(){
    
    if(this.description == ""){
      
      return;
    }

    if(this.photo == ""){
      
      return;
    }

    if(this.date == ""){
      
      return;
    }
    if(this.type == ""){
      
      return;
    }
    if(this.category == ""){
      
      return;
    }

    if(this.edit){
      this.api.updateNews(this.description,this.photo, this.date,this.type,this.category,this.id).subscribe(result=>{
        if(result.status){
          this.toast.success(result.message);
        }else{
          this.toast.error(result.message);
        }
      })
    } else {
      this.api.createNews(this.description,this.photo,this.date,this.type,this.category).subscribe(result=>{
        if(result.status){
          this.toast.success(result.message);
          this.description ="";
          this.date="";
          this.photo = "";
          this.uploadPhotoName= "";
          this.uploadPhotoS = false;
          this.category="";
          this.type ="";
        }else{
          this.toast.error(result.message);
        }
      })
    }

  }

}
