import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  breadCrumbItems!: Array<{}>;
  loader = false;

  edit:boolean=false;
  empId="";
  empCode="";
  employeeId="";
  empSalutation="";
  empFirstName="";
  empLastName="";
  empEmail="";
  empMobile="";
  empDOB:any;
  empGender="";
  empDepartment="";
  empState="";
  empBranch="";
  empCluster="";
  empDesignation="";
  empSalutationError="";
  empFirstNameError="";
  empLastNameError="";
  empEmailError="";
  empMobileError="";
  empDOBError="";
  empGenderError="";
  empDepartmentError="";
  empStateError="";
  empBranchError="";
  empClusterError="";
  empDesignationError="";

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService, public route: ActivatedRoute,public datepipe:DatePipe) {
    this.title.setTitle("Employee Master - Fusion Microfinance");
  }

  ngOnInit(): void {
    
    this.breadCrumbItems = [
      { label: 'Master' },
      { label: 'Employee' , active: true }
    ];

    this.route.params.subscribe((data:any)=>{
      if(data.action == "edit"){
        this.edit = true;
        this.route.queryParams.subscribe((data:any)=>{
          this.empId = data.id;
          this.getEmployeeById();
        })
      }
    })
  }

  getEmployeeById(){
    this.api.singleUser(this.empId).subscribe(data=>{
      this.empCode = data.data.employeeCode;
      this.employeeId = data.data.employeeId;
      this.empSalutation = data.data.salutation;
      this.empFirstName = data.data.firstName;
      this.empLastName = data.data.lastName;
      this.empEmail = data.data.email;
      this.empMobile = data.data.mobile;
      this.empDOB = this.datepipe.transform(data.data.dob, 'yyyy-MM-dd','IST');
      this.empState = data.data.stateEmp;
      this.empCluster = data.data.cluster;
      this.empBranch = data.data.branch;
      this.empDesignation = data.data.designation;
      this.empGender = data.data.gender;
      this.empDepartment = data.data.department;
    });
  }
  back(){
    window.history.back()
  }
  editEmployee(){
    this.clearError();

    if(this.empSalutation == ""){
      this.empSalutationError = "has-error";
      return;
    }

    if(this.empFirstName == ""){
      this.empFirstNameError = "has-error";
      return;
    }

    if(this.empLastName == ""){
      this.empLastNameError = "has-error";
      return;
    }
    if(this.empEmail == ""){
      this.empEmailError = "has-error";
      return;
    }
    if(this.empMobile == ""){
      this.empMobileError = "has-error";
      return;
    }
    if(this.empGender == ""){
      this.empGenderError = "has-error";
      return;
    }
    if(this.empDOB == "" || this.empDOB == undefined){
      this.empDOBError = "has-error";
      return;
    }
    if(this.empDepartment == ""){
      this.empDepartmentError = "has-error";
      return;
    }

    this.api.updateUser(this.empFirstName,this.empLastName,this.empSalutation,this.empEmail,this.empMobile,this.empDOB,this.empGender,this.empDepartment,this.empId).subscribe(data=>{

      if(data.status){
          this.toast.success(data.message);
      } else {
        this.toast.error(data.message);
      }
    })
  }
  clearError(){
    this.empSalutationError="";
    this.empFirstNameError="";
    this.empLastNameError="";
    this.empEmailError="";
    this.empMobileError="";
    this.empDOBError="";
    this.empGenderError="";
    this.empDepartmentError="";
  }
  clearForm(){
    this.empSalutation="";
    this.empFirstName="";
    this.empLastName="";
    this.empEmail="";
    this.empMobile="";
    this.empDOB="";
    this.empGender="";
    this.empDepartment="";
  }
}
