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
  id = "";
  label = "";
  edit = false;
  loader = false;

  name = "";
  nameError = "";
  codeError="";
  groups:any=[];
  code=0;

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe) {
    this.title.setTitle("Group Master - Fusion Microfinance");
  }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.edit = false;
        this.label= "Create Group";
        this.title.setTitle("Create Group - Fusion Microfinance");
        this.getIncrementalCode();
      }else{
        this.edit = true;
        
        this.label= "Edit Group";
        this.title.setTitle("Edit Group - Fusion Microfinance");
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.api.singleGroup(editParam.id).subscribe(res=>{
            this.name = res.data.name;
            this.code = res.data.code;

          })
        });
      }
    });

    
  }

  getIncrementalCode(){
    this.api.getIncrementalCodeGroup().subscribe(data=>{
      this.code = data.data.code;
    });
  }

  back(){
    window.history.back()
  }

  save(){

    if(this.name == ""){
      this.toast.error("Group Name is Mandatory");
      return;
    }

    if(this.edit){
  
      this.api.updateGroup(this.name,this.id).subscribe(result=>{
        if(result.status){
          this.toast.success(result.message);
        }else{
          this.toast.error(result.message);
        }
      });

    }else {
  
      this.api.createGroup(this.name,this.code).subscribe(result=>{
        if(result.status){
          this.toast.success(result.message);
          this.name ="";
          this.code=0;
          this.codeError="";
          this.nameError="";
          this.getIncrementalCode();
          
        }else{
          this.toast.error(result.message);
        }
      })
    }


  }

  
  
}
