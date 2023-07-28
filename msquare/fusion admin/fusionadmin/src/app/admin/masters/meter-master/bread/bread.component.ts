import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  pageTitle = "Create Meter Master";

  baseURL=environment.baseURL;
  label = 'Create Meter Master';
  loader = false;
  action = 1;
  edit=false;

  id="";
  name:any="";
  meterId:any="";
  initialReading:any="";
  branch:any="";

  branches:any=[];

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router) {}

  ngOnInit(): void {

    this.apiS.getAllBranch().subscribe(data=>{
      this.branches = data.data;
    })
    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.breadCrumbItems = [
          { label: 'Meter' },
          { label: 'Create Meter', active: true }
        ];
        this.label= "Create Meter Master";
          this.titleS.setTitle("Create Meter Master - "+this.appC.title);
      }else{
        this.edit=true;
        this.breadCrumbItems = [
          { label: 'Meter' },
          { label: 'Edit Meter', active: true }
        ];
        this.label= "Edit Meter Master";
          this.titleS.setTitle("Edit Meter Master - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleMeter(editParam.id).subscribe(res=>{
            this.name=res.data.name;
            this.meterId=res.data.meterId;
            this.initialReading=res.data.initialReading;
            this.branch=res.data.branch?._id;
          })
        });
      }
    });
  }

  save(){
    this.loader=true;
    if(this.edit){
      const data = JSON.stringify({
        "name":this.name,
        "meterId":this.meterId,
        "initialReading":this.initialReading,
        "branch":this.branch
      });
      this.apiS.updateMeter(data,this.id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("New Record Updated Successfully");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/masters/meter']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }else{
      const data = JSON.stringify({
        "name":this.name,
        "meterId":this.meterId,
        "initialReading":this.initialReading,
        "branch":this.branch
      });
      this.apiS.createMeter(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("New Record Created Successfully");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/masters/meter']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
   
  }


  clearFilter(){
    this.name="";
    this.meterId="";
    this.initialReading="";
    this.branch="";
  }


}
