import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit{

  @ViewChild('documentFileChild') documentFileChild!: ElementRef;
  edit = false;
  label = "";
  id = "";
  
  loader = false;

  name = "";
  points = "";
  photo = "";  

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe,
    public modalService:NgbModal) {
    this.title.setTitle("Reward Product - Fusion Microfinance");
  }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      if(data.activity == 'create'){
        this.edit = false;
        this.label= "Create Reward Product";
        this.title.setTitle("Create Reward Product - Fusion Microfinance");
      }else{
        this.edit = true;
        
        this.label= "Edit Reward Product";
        this.title.setTitle("Edit Reward Product - Fusion Microfinance");
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.api.getSingleRedeemItems(editParam.id).subscribe(res=>{
            this.name = res.data.name;
            this.points = res.data.points;
            this.photo = res.data.photo;
          })
        });
      }
    });
  }

  back(){
    window.history.back()
  }

  uploadPhoto(event:any){
    let fileData:FormData = new FormData();
    fileData.append('file', event.target.files[0]);
    this.api.uploadFile(fileData).subscribe(data=>{
      if(data.status){
        this.photo = data.data.url;
      }
    });
  }

  save(){
    
    if(this.name == ""){
      this.toast.error("Enter name")
      return;
    }

    if(this.points == ""){
      this.toast.error("Enter points")
      return;
    }

    if(this.photo == ""){
      this.toast.error("Enter photo")
      return;
    }

    if(this.edit){
      const data = JSON.stringify({
        "name":this.name,
        "points":this.points,
        "photo":this.photo
      })
      this.api.updateRedeemItems(data,this.id).subscribe(result=>{
        if(result.status){
          this.toast.success(result.message);
        }else{
          this.toast.error(result.message);
        }
      })
    } else {
      const data = JSON.stringify({
        "name":this.name,
        "points":this.points,
        "photo":this.photo
      })
      this.api.createRedeemItems(data).subscribe(result=>{
        if(result.status){
          this.toast.success(result.message);
          this.clear();
        }else{
          this.toast.error(result.message);
        }
      })
    }

  }

  showModal(content:any){
    this.modalService.open(content,{centered:true});
  }


  clear(){
    this.name ="";
    this.points="";
    this.photo = "";
    this.documentFileChild.nativeElement.value = "";
    this.router.navigate(['/pages/engage/reward-products']);
  }

}
