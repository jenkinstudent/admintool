import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-training-glimpse',
  templateUrl: './training-glimpse.component.html',
  styleUrls: ['./training-glimpse.component.scss']
})
export class TrainingGlimpseComponent {
  @ViewChild("fileinput") fileinput!: ElementRef;
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  notificationArr:any = [];
  uploadImage=false;
  uploadImageName="";
  image="";
  imageError="";
  imageModal="";
  baseURL=environment.baseURL;
  createBox = false;

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService,public modalService: NgbModal) {
    this.title.setTitle("Training Glimpse - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Engage' },
      { label: 'Training Glimpse' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.notificationArr=[];
    this.api.getAllTrainingGlimpse().subscribe(data=>{
      this.notificationArr = data.data; 
    })
  }

  uploadImageFile(event:any){
    this.uploadImage= true;
    this.uploadImageName= event.target.files[0].name;
    var reader = new FileReader();
    reader.onload =  (e:any)=> {
        $('#thum').attr('src', e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    let img = new Image()
    img.src = window.URL.createObjectURL(event.target.files[0])
    img.onload = () => {
        if(img.width == 1000 && img.height == 880){
            this.api.uploadFile(fileData).subscribe(data=>{
                if(data.status){
                  this.image = data.data.url;
                }
              });
            return true;
        }
        this.toast.error("Please upload file in 1000px x 880px");
        this.uploadImageName = "";
        this.uploadImage=false;
        return true;
    }
  }

  showModal(image:any,content:any){
    this.imageModal=image;
    this.modalService.open(content,{centered:true})
  }

  save(){
    this.clearError();
    if(this.image == ""){
      this.toast.error("Image required");
      return
    }
    const data = JSON.stringify({
      "image":this.image
    })
      this.api.createTrainingGlimpse(data).subscribe(result=>{
        if(result.status){
            this.toast.success("Saved Successfully");
            this.clearForm();
            this.getData();
        } else {
          this.toast.error(result.message);
        }
      });
    
  }
  clearForm(){
    this.uploadImage=false;
    this.uploadImageName="";
    this.image="";
    this.fileinput.nativeElement.value = "";
    this.createBox = false;
  }
  clearError(){
    this.imageError="";
  }

  deleteData(id:any){
    this.api.deleteTrainingGlimpse(id).subscribe(data=>{
      if(data.status == "success"){
        this.toast.success(data.message);
        this.getData();
      }else{
        this.toast.error(data.message);
      }
    })
  }

}
