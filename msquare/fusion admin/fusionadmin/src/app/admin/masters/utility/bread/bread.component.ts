import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { Thumbs } from 'swiper';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  @ViewChild('tdsCertificateChild') tdsCertificateChild!: ElementRef;
  breadCrumbItems!: Array<{}>;
  pageTitle = "Create Utility Master";
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
  isElectricity=false;
  utilityName:any="";
  billTypes:any=[];

  baseURL=environment.baseURL;
  label = 'Create Utility Master';
  loader = false;
  action = 1;
  cityList = [
    'City 1',
    'City 2'
  ];
  stateList = [
    'State 1',
    'State 2'
  ];
  edit=false;
  error=false;
  errorRent=false;

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
  division="";
  city="";
  
  allowedConsumption="";
  maximumConsumption="";
  utility="";
  status = "";

  branches:any=[];
  utilitiesL:any=[];
  zones:any=[];
  clusters:any=[];
  branch:any="";
  items:any=[];
  utilityL:any=[];
  states:any=[]
  divisions:any=[]
  item:any=[];
  

  constructor(public _location: Location,public apiS:ApiService,public toastr: ToastrService,public route:ActivatedRoute,public titleS:Title,public appC:AppComponent,public router:Router,
    public authS:AuthenticationService) {}

  ngOnInit(): void {

    this.apiS.getAllBranchForSuperAdmin().subscribe(data=>{
      this.branches = data.data;
    })
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

    this.apiS.getAllUtilityMaster().subscribe(data=>{
      this.utilityL = data.data;
    })

    this.route.params.subscribe((data:any)=>{
      if(data.action == 'create'){
        this.breadCrumbItems = [
          { label: 'Utility' },
          { label: 'Create Utility Master Product', active: true }
        ];
        this.label= "Create Utility Master Product";
          this.titleS.setTitle("Create Utility Master Product - "+this.appC.title);
      }else{
        this.edit=true;
        this.breadCrumbItems = [
          { label: 'Utility' },
          { label: 'Edit Utility Master Product', active: true }
        ];
        this.label= "Edit Utility Master Product";
          this.titleS.setTitle("Edit Utility Master Product - "+this.appC.title);
        this.route.queryParams.subscribe((editParam:any)=>{
          this.id = editParam.id;
          this.apiS.getSingleUtility(editParam.id).subscribe(res=>{
            this.item = res.data;
            this.date =new Date(res.data.date).getFullYear()+"-"+("0"+((new Date(res.data.date).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.date).getDate()).slice(-2);
            this.branch = res.data.branch?._id;
            
            for(let i =0;i<res.data.utilities.length;i++){
              res.data.utilities[i].utilityStartDate = new Date(res.data.utilities[i].utilityStartDate).getFullYear()+"-"+("0"+((new Date(res.data.utilities[i].utilityStartDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.utilities[i].utilityStartDate).getDate()).slice(-2)
            }
            this.items = res.data.utilities;
            this.premisesType =res.data.premisesType;
            this.propertyType = res.data.propertyType;
            this.branchCode=res.data.branchCode;
            this.branchName=res.data.branchName;
            this.tdsAmount=res.data.tdsAmount;
            this.tdsCertificate=res.data.tdsCerrtificate;
            this.cluster=res.data.cluster;
            this.zone=res.data.zone;
            this.utility=res.data.utility?._id;
            this.isElectricity = res.data.utility?.isElectricity;
            this.billTypes = res.data.utility?.billTypes;
            this.address=res.data.address;
            this.state=res.data.state;
            this.division = res.data.division;

            this.city=res.data.city;
            this.pincode=res.data.pincode;
            this.status = res.data.status;
            this.utilityStartDate=new Date(res.data.utilityStartDate).getFullYear()+"-"+("0"+((new Date(res.data.utilityStartDate).getMonth()*1)+(1*1))).slice(-2)+"-"+("0"+new Date(res.data.utilityStartDate).getDate()).slice(-2);
            this.utilityCycle = res.data.utilityCycle;

          })
        });
      }
    });
  }

  add(){
    
    this.items.push({meterId:'',name:'',billType:'',initialReading:'',allowedConsumption:'',maximumConsumption:'',utilityStartDate:'',utilityCycle:'',tdsAmount:'',tdsCertificate:''});
  }

  
  delete(i:any){
    this.items.splice(i,1);
  }

  getUtilityMaster(event:any){
    this.billTypes = [];
    this.isElectricity = false;
    this.error=false;
    this.errorRent=false;
    this.apiS.getAllUtilityByBranchAndUtility(this.branch,event).subscribe(data=>{
      if(data.data.length > 0){
        this.error = true;
      }else{
        this.error = false;
        this.apiS.getSingleUtilityMaster(event).subscribe(res=>{
          this.isElectricity = res.data.isElectricity;
          this.billTypes = res.data.billTypes;
        })
      }
    })
    this.apiS.getAllRent(1,{facility:{$in:event},branchCode:this.branchCode},"","","").subscribe(res=>{
      if(res.data.length > 0){
        this.errorRent = true;
      }else{
        this.errorRent = false;
      }
    });
    
  }


  save(){
    this.loader=true;
    if(this.error){
      this.toastr.error(this.branchName + " with selected utility is already existed.");
      this.loader=false;
      return;
    }

    if(this.errorRent){
      this.toastr.error(this.branchName + " with selected facility is included in rent.");
      this.loader=false;
      return;
    }

    if(this.items.length == 0){
      this.toastr.error("Atleast 1 meter is required");
      this.loader=false;
      return;
    }

    for(let i=0;i<this.items.length;i++){
      if(this.items[i].meterId == ''  && this.isElectricity){
        this.toastr.error("Customer Id is required");
        this.loader=false;
        return;
      }
      if(this.items[i].maximumConsumption < 2501){
        this.toastr.error("Maximum Consumption must be greater than 2500");
        this.loader=false;
        return;
      }
    }

    let resultToReturn = false;
    for (let i = 0; i < this.items.length; i++) {
      // Inner for loop
      for (let j = 0; j < this.items.length; j++) {
          // Skip self comparison
          if (i !== j) {
              // Check for duplicate
              if (this.items[i].meterId === this.items[j].meterId) {
                  resultToReturn = true;
                  // Terminate inner loop
                  break;
              }
          }
          // Terminate outer loop
          if (resultToReturn) {
              break;
          }
      }
  }
    if(resultToReturn) {
      this.toastr.error("Unique Customer Id is required");
        this.loader=false;
        return;
    }

    if(this.edit){
      let updatedData = {
        "premisesType":this.premisesType,
        "propertyType":this.propertyType,
        "date":this.date,
        "branchCode":this.branchCode,
        "branchName":this.branchName,
        "tdsAmount":this.tdsAmount,
        "utility":this.utility,
        "tdsCertificate":this.tdsCertificate,
        "cluster":this.cluster,
        "utilities":this.items,
        "address":this.address,
        "state":this.state,
        "division":this.division,
        "city":this.city,
        "pincode":this.pincode,
        "zone":this.zone,
        "branch":this.branch,
        "utilityCycle":this.utilityCycle,
        "utilityStartDate":this.utilityStartDate,
        "status":this.status
      }
      const data = JSON.stringify(updatedData);
      this.apiS.updateUtility(data,this.id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          const aData = JSON.stringify({
            "user": this.authS.currentUserValue.id,
            "utility":this.id,
            "currentData":this.item,
            "updatedData":updatedData
          })
          this.apiS.createActivity(aData).subscribe(uResult => {
            if (uResult.status === 'error') {
              this.toastr.error(uResult.message);
              this.loader = false;
            } else {
              this.toastr.success("New Record Updated Successfully");
              this.loader = false;
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
      const data = JSON.stringify({
        "premisesType":this.premisesType,
        "propertyType":this.propertyType,
        "date":this.date,
        "branch":this.branch,
        "branchCode":this.branchCode,
        "branchName":this.branchName,
        "tdsAmount":this.tdsAmount,
        "tdsCertificate":this.tdsCertificate,
        "cluster":this.cluster,
        "utilities":this.items,
        "utility":this.utility,
        "address":this.address,
        "state":this.state,
        "division":this.division,
        "city":this.city,
        "pincode":this.pincode,
        "zone":this.zone,
        "utilityCycle":this.utilityCycle,
        "utilityStartDate":this.utilityStartDate,
        "status":this.status
      });
      this.apiS.createUtility(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("New Record Created Successfully");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/masters/utility']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
   
  }

  getBranch(event:any){
    this.branch = this.branches[event]._id;
    this.premisesType = this.branches[event].premisesType;
    this.propertyType = this.branches[event].propertyType;
    this.branchCode = this.branches[event].code;
    this.branchName = this.branches[event].name;
    this.address = this.branches[event].address;
    this.zone = this.branches[event].zone;
    this.cluster = this.branches[event].cluster;
    this.state = this.branches[event].state;
    this.division = this.branches[event].division;
    this.apiS.getMeterByBranch(this.branches[event]._id).subscribe(data=>{
      this.utilitiesL = data.data;
    })
    this.utilities="";
    if(this.branch != '' && this.utility != ''){
      this.error=false;
      this.errorRent=false;
      this.apiS.getAllUtilityByBranchAndUtility(this.branch,this.utility).subscribe(data=>{
        if(data.data.length > 0){
          this.error = true;
        }else{
          this.error = false;
          this.apiS.getSingleUtilityMaster(this.utility).subscribe(res=>{
            this.isElectricity = res.data.isElectricity;
            this.billTypes = res.data.billTypes;
          })
        }
      })
      this.apiS.getAllRent(1,{facility:{$in:this.utility},branchCode:this.branchCode},"","","").subscribe(res=>{
        if(res.data.length > 0){
          this.errorRent = true;
        }else{
          this.errorRent = false;
        }
      });
    }
  
  }

  uploadTdsCertificate(event: any,i:any): void {
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        if (event.target.files[0].size > 300 * 1024) {
          this.toastr.error('File size exceeds the limit of 300 KB.');
          this.tdsCertificateChild.nativeElement.value = "";
          return; 
        }
        this.apiS.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.items[i].tdsCertificate =res.data.url;
          }
        });
      
    }
  }

  clearFilter(){
    this.premisesType="";
    this.propertyType="";
        this.date="";
        this.branchCode="";
        this.branchName="";
        this.tdsAmount=0;
        this.tdsCertificate="";
        this.cluster="";
        this.utilities="";
        this.utilityStartDate="";
        this.utilityCycle="";
        this.address="";
        this.state="";
        this.division = "";

        this.city="";
        this.pincode="";
        this.zone="";
        this.items=[];
        this.allowedConsumption="";
        this.maximumConsumption="";
        this.branch="";
  }


}
