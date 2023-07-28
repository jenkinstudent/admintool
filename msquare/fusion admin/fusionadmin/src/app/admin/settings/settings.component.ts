import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  createR = false;
  editR = false;
  createU = false;
  editU = false;
  user:any;
  branch:any;
  cluster:any;
  state:any;
  division:any;
  zone:any;

  searchTerm:any = "";
  searchTermU:any = "";

  users:any=[];
  branches:any=[];
  clusters:any=[];
  divisions:any=[];
  states:any=[];
  zones:any=[];
  designations:any=[];

  levels:any=[];

  selectUser:any="";
  selectBranch:any="";
  designationS:any="";
  roleName:any="";
  isUtility:any=false;
  maxBillAmt:any="";
  canRaiseEscalated:any=false;
  isRent:any=false;
  utilitySlab:any="";
  rentSlab:any="";
  maxRentAmt:any="";

  userName:any="";
  email:any="";
  password:any="";
  designation:any="";
  mobile:any="";
  role:any="";
  roleProfile:any="";
  status:any="";

  roleId:any="";
  userId:any="";
  item:any=[];
  selectRole:any="";
  selectedUser:any = "";

  
  constructor(public authS:AuthenticationService,public apiS:ApiService,public toastr:ToastrService,public userS:UserProfileService,
    public modalService:NgbModal) { }
  ngOnInit(): void {
    
    this._fetchdata();
  }

  groupingHelper(item:any){return item.state}

  _fetchdata(){
    this.apiS.getAdminUser().subscribe(data=>{
      this.users = data.data;
    });

    this.apiS.getAllApprovalLevels().subscribe(data=>{
      this.levels=data.data;
    });

    this.apiS.getAllBranchForSuperAdmin().subscribe(data=>{
      this.branches = data.data;
    });

    this.apiS.getAllCluster().subscribe(data=>{
      this.clusters = data.data;
    });

    this.apiS.getAllDivision().subscribe(data=>{
      this.divisions = data.data;
    });

    this.apiS.getAllState().subscribe(data=>{
      this.states = data.data;
    });

    this.apiS.getAllZone().subscribe(data=>{
      this.zones = data.data;
    });
  }

  changeUtility(event:any){
    this.isUtility = true;
    if(!event.target.checked){
      this.isUtility = false;
    }
  }

  changeRent(event:any){
    this.isRent = true;
    if(!event.target.checked){
      this.isRent = false;
    }
  }


  changeRaiseEscalated(event:any){
    this.canRaiseEscalated = true;
    if(!event.target.checked){
      this.canRaiseEscalated = false;
    }
  }

  getUserRole(event:any){
    this.user = [];
    this.user.push(event);
    this.apiS.getSingleUser(event).subscribe(data=>{
      this.selectRole = data.data.designation.role;
    })
  }

  getUserByDesignation(event:any){
    this.user = [];
    // for(let i = 0; i < event.length; i++){
      this.apiS.getSingleUserByDesignation(event).subscribe(data=>{
        for(let j=0;j<data.data.length;j++){
          this.user.push(data.data[j]._id);
        }
      })
    // }
  }

  getBranchByCluster(event:any){
    this.branch = [];
    for(let i = 0; i < event.length; i++){
      this.apiS.getBranchByCluster(event[i]).subscribe(data=>{
        for(let j=0;j<data.data.length;j++){
          this.branch.push(data.data[j]._id);
        }
      })
    }
  }

  getBranchByDivision(event:any){
    this.branch = [];
    for(let i = 0; i < event.length; i++){
      this.apiS.getBranchByDivision(event[i]).subscribe(data=>{
        for(let j=0;j<data.data.length;j++){
          this.branch.push(data.data[j]._id);
        }
      })
    }
  }

  getBranchByState(event:any){
    this.branch = [];
    for(let i = 0; i < event.length; i++){
      this.apiS.getBranchByState(event[i]).subscribe(data=>{
        for(let j=0;j<data.data.length;j++){
          this.branch.push(data.data[j]._id);
        }
      })
    }
  }

  getBranchByZone(event:any){
    this.branch = [];
    for(let i = 0; i < event.length; i++){
      this.apiS.getBranchByZone(event[i]).subscribe(data=>{
        for(let j=0;j<data.data.length;j++){
          this.branch.push(data.data[j]._id);
        }
      })
    }
  }


  editUser(i:any){
    this.editU = true;
    this.createU = true;
    this.userId = this.users[i]._id;
    this.userName = this.users[i].name;
    this.email = this.users[i].email;
    this.status = this.users[i].status;
    this.mobile = this.users[i].mobile;
    this.designation = this.users[i].designation;
    this.role = this.users[i].roleO?._id;
    this.roleProfile = this.users[i].roleProfile;
  }

  openModal(content:any,item:any){
    this.modalService.open(content, { size: 'md'});
    this.item = item;

  }



  save(i:any){
    if(this.levels[i].min >= this.levels[i].max){
      this.toastr.error("Invalid Min and Max Value");
      return;
    }
    if(this.levels[i]._id == undefined || this.levels[i]._id == '' || this.levels[i]._id == null){
      const data = JSON.stringify({
        "min": this.levels[i].min,
        "max": this.levels[i].max
      });
      this.apiS.createApprovalLevels(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.levels[i]._id = result.data._id;
        } else {
          this.toastr.success("Saved Successfully");
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }else{
      const data = JSON.stringify({
        "min": this.levels[i].min,
        "max": this.levels[i].max
      });
      this.apiS.updateApprovalLevels(data,this.levels[i]._id).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
        } else {
          this.toastr.success("Updated Successfully");
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
    
    
  }

  delete(i:any){
    this.apiS.deleteApprovalLevels(this.levels[i]._id).subscribe(data=>{
      if (data.status === 'error') {
        this.toastr.error(data.message);
      } else {
        this.levels.splice(i,1);
        this.toastr.success("Deleted Successfully");
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }

  getadmin(event:any){
    this.designation = this.userS.admin[event];
  }

  getfieldadmin(event:any){
    this.designation = this.userS.fieldadmin[event];
  }

  getbusiness(event:any){
    this.designation = this.userS.business[event];
  }

  getFinanceDesignation(event:any){
    this.designation = this.userS.financedesignation[event];
  }

  add(){
    this.levels.push({_id:'',min:0,max:0});
  }

  createUser(){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email) == false) {
      this.toastr.error("Enter a valid email");
      return;
    }

    if(this.editU){
      const data = JSON.stringify({
        "name":this.userName,
        "email":this.email,
        "mobile":this.mobile,
        "designation":this.designation,
        "roleProfile":this.roleProfile
      });
      this.apiS.updateUser(data,this.userId).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
        } else {
          this.toastr.success("User Updated Successfully");
          this.createU = false;
          this.editU = false;
          this.userName="";
          this.email="";
          this.mobile="";
          this.role="";
          this.roleProfile="";
          this.password="";
          this.users =[];
          this.apiS.getAdminUser().subscribe(data=>{
            this.users = data.data;
          });
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }else{
      const data = JSON.stringify({
        "name":this.userName,
        "email":this.email,
        "mobile":this.mobile,
        "password":this.password,
        "designation":this.designation,
        "role":"admin",
        "roleProfile":this.roleProfile,
        "issuperadmin":false
      });
      this.apiS.createUser(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
        } else {
          this.toastr.success("User Created Successfully");
          this.createU = false;
          this.editU = false;
          this.userName="";
          this.email="";
          this.mobile="";
          this.role="";
          this.password="";
          this.users =[];
          this.apiS.getAdminUser().subscribe(data=>{
            this.users = data.data;
          });
        }
      },error=>{
        this.toastr.error(error.message);
      });
    }
  }

  allocatePermissions(){
    const data = JSON.stringify({
      user:this.user,
      permissions:{
        isUtility: this.isUtility,
        isRent: this.isRent,
        utilitySlab:this.utilitySlab,
        rentSlab:this.rentSlab,
        branch:this.branch
      }
    });
    this.apiS.updateUserPermissions(data).subscribe(result => {
      if (result.status === 'error') {
        this.toastr.error(result.message);
      } else {
        this.toastr.success("Permission Allocated Successfully");
        
        this.users =[];
        this.user = [];
        this.selectedUser ="";
        this.selectRole ="";
        this.branch = [];
        this.isUtility = false;
        this.isRent = false;
        this.maxBillAmt = 0;
        this.maxRentAmt = 0;
        this.utilitySlab = "";
        this.rentSlab = "";
        this.canRaiseEscalated = false;
        this.apiS.getAdminUser().subscribe(data=>{
          this.users = data.data;
        });
      }
    },error=>{
      this.toastr.error(error.message);
    });
  }

  clearU(){
    this.userName="";
    this.email="";
    this.mobile="";
    this.role="";
    this.password="";
    this.roleProfile="";
    this.designation="";
  }

  click(){
    
  }


  changeStatus(event:any,id:any,index:any){
    let status = 'Active';
      if(!event.target.checked){
        status = 'Inactive';
      }
      const data=JSON.stringify({
        status:status
      });
      this.apiS.updateUser(data,id).subscribe(data=>{
        this.users[index].status = status;
        if(status == 'Inactive'){
          this.toastr.error("Status Updated");
        }else if(status == 'Active'){
          this.toastr.success("Status Updated");
        }
      });
  }
}
