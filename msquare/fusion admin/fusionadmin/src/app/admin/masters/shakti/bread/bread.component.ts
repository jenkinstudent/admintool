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
  pageTitle = "Create Branch Master";
  statusList = [
    'Active',
    'Inactive'
  ];
  permisesType =[
    'Commercial',
    'Domestic'
  ];
  clusterList =[
    'Cluster 1',
    'Cluster 2'
  ];
  zoneList =[
    'Zone 1',
    'Zone 2'
  ];
  utilityList =[
    'Utility 1',
    'Utility 2'
  ];

  baseURL=environment.baseURL;
  label = 'Create Branch Master';
  loader = false;
  action = '';
  cityList = [
    'City 1',
    'City 2'
  ];
  stateList = [
    'State 1',
    'State 2'
  ];
  edit=false;
  create=false;

  id="";
  branchCode = "";
  branchName = "";
  date = "";
  tdsAmount = 0;
  tdsCertificate = "";
  utilityStartDate:any;
  utilityCycle:any;
  utilities:any;
  address = "";
  premisesType= "";
  propertyType="";
  pincode = "";
  cluster="";
  zone="";
  state="";
  city="";
  status = "";
  division="";
  email:any="";
  password:any="";
  userId:any="";

  branches:any=[];
  utilitiesL:any=[];
  zones:any=[];
  clusters:any=[];
  divisions:any=[];
  states:any=[];
  branch:any="";

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router) {}

  ngOnInit(): void {

    this.apiS.getAllZone().subscribe(data=>{
      this.zones = data.data;
    })

    this.apiS.getAllCluster().subscribe(data=>{
      this.clusters = data.data;
    })

    this.apiS.getAllDivision().subscribe(data=>{
      this.divisions = data.data;
    })

    this.apiS.getAllState().subscribe(data=>{
      this.states = data.data;
    })

    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.action = 'create';
        this.breadCrumbItems = [
          { label: 'Branch' },
          { label: 'Create Branch', active: true }
        ];
        this.label= "Create Branch";
          this.titleS.setTitle("Create Branch - "+this.appC.title);
          this.create = true;
      }else if(data.action == 'edit'){
          this.action = 'edit';
          this.breadCrumbItems = [
            { label: 'Branch' },
            { label: 'Edit Branch', active: true }
          ];
          this.label= "Edit Branch";
            this.titleS.setTitle("Edit Branch - "+this.appC.title);
          this.route.queryParams.subscribe((editParam:any)=>{
            this.id = editParam.id;
            this.apiS.getSingleBranch(editParam.id).subscribe(res=>{
              this.premisesType =res.data.premisesType;
              this.propertyType = res.data.propertyType;
              this.branchCode=res.data.code;
              this.branchName=res.data.name;
              this.cluster=res.data.cluster;
              this.zone=res.data.zone;
              this.state=res.data.state;
              this.division=res.data.division;
              this.address=res.data.address;
              this.pincode =res.data.pincode;
              this.apiS.getSingleUserByBranch(this.branchCode).subscribe(data=>{
                if(data.data.length > 0){
                  this.edit=true;
                  this.create=false;
                  this.userId = data.data[0]._id;
                  this.email = data.data[0].email;
                  this.password = data.data[0].password;
                }else{
                  this.edit = false;
                  this.create=false;
                  this.password = "";
                  this.email= "";
                  this.userId = "";
                }
              })
            })
          
           
          });
          
        }
      
    });
  }

  save(){
    this.loader=true;
    if(this.edit && !this.create){
      const bdata = JSON.stringify({
        name:this.branchName,
        zone:this.zone,
        division:this.division,
        cluster:this.cluster,
        state:this.state,
        address:this.address,
        pincode:this.pincode
      })
      this.apiS.updateBranch(bdata,this.id).subscribe(branchData => {
        if (branchData.status === 'error') {
          this.toastr.error(branchData.message);
          this.loader = false;
        } else {
          const data = JSON.stringify({
            "email":this.email
          });
          this.apiS.updateUser(data,this.userId).subscribe(result => {
            if (result.status === 'error') {
              this.toastr.error(result.message);
              this.loader = false;
            } else {
              this.toastr.success("Branch Updated Successfully");
              this.loader = false;
              this.clearFilter();
              this.router.navigate(['/admin/masters/shakti']);
            }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }else if(!this.edit && this.create){
      const bdata = JSON.stringify({
        name:this.branchName,
        code:this.branchCode,
        zone:this.zone,
        division:this.division,
        cluster:this.cluster,
        state:this.state,
        address:this.address,
        pincode:this.pincode
      })
      this.apiS.createBranch(bdata).subscribe(branchData => {
        if (branchData.status === 'error') {
          this.toastr.error(branchData.message);
          this.loader = false;
        } else {
          const data = JSON.stringify({
            "name":this.branchName,
            "code":this.branchCode,
            "email":this.email,
            "password":this.password,
            "role":"branch", 
            "designation":{
              "id":"Branch",
              "name":"Branch",
              "role":"Branch"
            },
            "permissions":{
              branch:[branchData.data._id]
            }
          });
          this.apiS.createUser(data).subscribe(result => {
            if (result.status === 'error') {
              this.toastr.error(result.message);
              this.loader = false;
            } else {
              this.toastr.success("User Created Successfully");
              this.loader = false;
              this.clearFilter();
              this.router.navigate(['/admin/masters/shakti']);
            }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }else{
      const bdata = JSON.stringify({
        name:this.branchName,
        zone:this.zone,
        division:this.division,
        cluster:this.cluster,
        state:this.state,
        address:this.address,
        pincode:this.pincode
      })
      this.apiS.updateBranch(bdata,this.id).subscribe(branchData => {
        if (branchData.status === 'error') {
          this.toastr.error(branchData.message);
          this.loader = false;
        } else {
          const data = JSON.stringify({
            "name":this.branchName,
            "code":this.branchCode,
            "email":this.email,
            "password":this.password,
            "role":"branch",
            "permissions":{
              branch:[this.id]
            }
          });
          this.apiS.createUser(data).subscribe(result => {
            if (result.status === 'error') {
              this.toastr.error(result.message);
              this.loader = false;
            } else {
              this.toastr.success("User Created Successfully");
              this.loader = false;
              this.clearFilter();
              this.router.navigate(['/admin/masters/shakti']);
            }
          },error=>{
            this.toastr.error(error.message);
            this.loader = false;
          });
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
   
  }

  

  clearFilter(){
    this.premisesType="";
    this.propertyType = "";
    this.branchCode="";
    this.branchName="";
    this.cluster="";
    this.address="";
    this.division="";
    this.zone="";
    this.pincode="";
    this.state=""
  }



}
