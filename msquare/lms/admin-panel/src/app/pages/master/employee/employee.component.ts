import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { UserProfileService } from 'src/app/core/services/user.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import * as moment from 'moment-timezone';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  @ViewChild('table') table: any;
  @ViewChild("importButton") importButton!: ElementRef;
  dataTable:any;
  printData:any=[];
  kpi:any = [];
  data:any=[];
  searchTerm:any="";
  page:any="";
  totalPages:any="";
  hasMore:boolean = false;
  importLoader=false;

  statusFilter:any = 1;
  breadCrumbItems!: Array<{}>;
  emp:any=[];
  employeesData:any = [];
  loading = false;
  
  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService) {
    this.title.setTitle("Employee Master - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.getData();
    this.getKPI();
    this.breadCrumbItems = [
      { label: 'Master' },
      { label: 'Employee' , active: true }
    ];
  }

  getKPI(){
    this.api.getUserHeadKPI().subscribe(res=>{
      this.kpi = res;
    })
  }

  getData(){
    // this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(1,this.searchTerm,this.statusFilter).subscribe(data=>{
      this.page = data.page;
      this.totalPages = data.totalPages;
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
    this.api.getAllUsers().subscribe(data=>{
      this.printData=[];
      for(let i=0;i<data.data.length;i++){
        this.printData.push({
          "sr": i+1,
          "employeeCode": data.data[i]['employeeCode'],
          "firstName": data.data[i]['firstName'],
          "lastName": data.data[i]['lastName'],
          "email": data.data[i]['email'],
          "mobile": data.data[i]['mobile'],
          "gender": data.data[i]['gender'],
          "department": data.data[i]['department'],
          "designation": data.data[i]['designation'],
          "cluster": data.data[i]['cluster'],
          "state": data.data[i]['stateEmp'],
          "activeWallApproval": data.data[i]['activeWallApproval'],
          "group":(data.data[i]['group'] == undefined || data.data[i]['group'] == '')?"":"G"+data.data[i]['groupDetails'][0]?.code,
          "status": (data.data[i]['status'] == 1)?"Active":"Pending"
        })
      }
      // setTimeout(() =>{
      //   this.dataTable = $(this.table.nativeElement);
      //   this.dataTable.DataTable();
      // },300);
      this.loading = false;
    });
  }

  filterByStatus(event:any){
    this.statusFilter = undefined;
    this.statusFilter = event.target.value;
    this.getData();
    console.log(this.statusFilter);
    
  }

  onFileChange(ev: any) {
    this.importLoader=true;
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial["sheet"] = XLSX.utils.sheet_to_json(sheet, {
          raw: false,
          header: sheet ? 0 : 1,
          dateNF: "dd/mm/yyyy"
        });
        return initial;
      }, {});
      this.data =jsonData.sheet;
      
      this.user.updateImportUser(this.data).subscribe(data=>{
        if(data.status== "success"){
          this.getData();
          this.importLoader = false;
          this.toast.success(data.message);
        }
        this.importButton.nativeElement.value = "";
      })
    }
    reader.readAsBinaryString(file);
    
  }

  next(){
    this.page = (this.page*1) + (1*1);
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(this.page,this.searchTerm,this.statusFilter).subscribe(data=>{
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  previous(){
    this.page = (this.page*1) - (1*1);
    this.employeesData = [];
    this.loading = true;
    this.api.getAllUsersByPagination(this.page,this.searchTerm,this.statusFilter).subscribe(data=>{
      this.hasMore = data.hasMore;
      this.employeesData = data.data;
      this.loading = false;
    });
  }

  inputFileClick() {
    document.getElementById('file')?.click();
}


  changeEmployeeStatus(id:string,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateStatusUser(id,status).subscribe(data=>{
      if(status == "0"){
        this.toast.error("User Status Updated");
      }else if(status == "1"){
        this.toast.success("User Status Updated");
      }
      
    });
  }

  changeEmployeeActiveWallStatus(id:string,event:any){
    let status = "1";
    if(!event.target.checked){
      status = "0";
    }

    this.api.updateActiveWallStatusUser(id,status).subscribe(data=>{
      if(status == "0"){
        this.toast.error("User Status Updated");
      }else if(status == "1"){
        this.toast.success("User Status Updated");
      }
      
    });
  }

  syncEmployee(){
    this.toast.info("Sync Request Sent");
    this.api.syncEmployee().subscribe(data=>{
      this.toast.success("Sync Success");
      this.getData();
    });
  }
  editEmployee(id:any){
      this.router.navigate(['/pages/master/employee/action/edit'],{
        queryParams:{id:id}
      });
  }

  deleteProfilePhoto(item:any){
    Swal.fire({
      title: 'You are about to delete a profile photo ?',
      icon: 'warning',
      showCancelButton: true,
      width:'500px',
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No'
    }).then((result:any) => {
      if (result.value) {
        const data = JSON.stringify({
          profilephoto:""
        })
        this.api.updateSingleUser(data,item._id).subscribe(data=>{
          if(data.status){
            item.profilephoto = "";
              this.toast.success("Profile Photo Deleted Successfully");
          } else {
            this.toast.error(data.message);
          }
        })
      }
    });
   
  }
  
  exportAsXLSX():void {
    const dToday = moment().tz('Asia/Kolkata');
    const toToday = dToday.format('YYYY-MM-DD-HH-mm-ss');
    this.excelS.exportAsExcelFile(this.printData, 'Employee Master Data '+ toToday);
  }

  search(event:any){
    this.searchTerm = event.target.value;
    this.getData();
  }
}

