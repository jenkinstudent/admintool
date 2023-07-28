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
  label = "";
  edit = false;
  id = "";
  loader = false;
  photo = "";
  description = "";
  isDefault = false;
  youtubeLink = "";
  uploadPhotoS = false;
  uploadPhotoName = "";

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe) {
    this.title.setTitle("CEO Message - Fusion Microfinance");
  }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      if(data.activity == 'create'){
        this.edit = false;
        this.label= "Create CEO Message";
        this.title.setTitle("Create CEO Message - Fusion Microfinance");
      }else{
        this.edit = true;
        
        this.label= "Edit CEO Message";
        this.title.setTitle("Edit CEO Message - Fusion Microfinance");
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.api.singleCEO(editParam.id).subscribe(res=>{
            console.log(res);  
            this.isDefault = res.data.default;
            this.description = res.data.description;          
            this.photo = res.data.photo;
            this.youtubeLink = res.data.youtubeLink;      

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
      this.toast.error("Description required");
      return;
    }

    if(this.photo == ""){
      this.toast.error("Photo required");
      return;
    }

    if(this.edit){
      const data = JSON.stringify({
        "description":this.description,
        "youtubeLink":this.youtubeLink,
        "default":this.isDefault,
        "photo":this.photo
      })
  
      this.api.updateCEO(data,this.id).subscribe(result=>{
        if(result.status =='success'){
          this.toast.success(result.message);
        }else{
          this.toast.error(result.message);
        }
      })
    }else{
      const data = JSON.stringify({
        "description":this.description,
        "youtubeLink":"https://www.youtube.com/embed/"+this.youtubeLink,
        "default":this.isDefault,
        "photo":this.photo
      })

      this.api.createCEO(data).subscribe(result=>{
        if(result.status =='success'){
          this.toast.success(result.message);
          this.description ="";
          this.youtubeLink="";
          this.photo = "";
          this.isDefault = false;
        }else{
          this.toast.error(result.message);
        }
      })
    }
  }

}
