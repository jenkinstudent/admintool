import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-shakti',
  templateUrl: './shakti.component.html',
  styleUrls: ['./shakti.component.scss']
})
export class ShaktiComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  @ViewChild('table') table: any;
  dataTable: any;
  branches:any = [];
  totalBranches = 0;
  hasMore = true;
  page = 1;
  loading = true;
  clusters:any=[];
  zones:any=[];
  divisions:any=[];
  states:any=[];
  searchTerm:any="";
  records:any=[];
  uploadfilename="";
  arrayBuffer:any=[];
  uploadfile:boolean= false;
  loader:boolean = false;
  baseURL= environment.baseURL;

  constructor(public api:ApiService,public router:Router,public toastr:ToastrService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Masters' },
      { label: 'Shakti' , active: true }
    ];

    this.getData();
  }

  getData(){
    this.getBranch();
    this.api.getAllCluster().subscribe(res=>{
      this.clusters = res.data;
    });
    this.api.getAllDivision().subscribe(res=>{
      this.divisions = res.data;
    });
    this.api.getAllZone().subscribe(res=>{
      this.zones = res.data;
    });
    this.api.getAllState().subscribe(res=>{
      this.states = res.data;
    })
  }

  getBranch(){
    this.loading = true;
    this.api.getAllBranch(this.page,"","","",this.searchTerm).subscribe(res=>{
      this.branches = res.data;
      this.totalBranches = res.totalRecords;
      this.hasMore = res.hasMore;
      this.page = res.page;
      this.loading = false;
    });
  }

  inputFileClick() {
    document.getElementById('file')?.click();
  }

  selectImportFile(event:any){
    this.loader = true;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws); 
      this.records = data;
    };
    
    setTimeout(() => {
      if(this.records.length > 0){
        for(let i=0;i<this.records.length;i++){
          const bdata = JSON.stringify({
            name:this.records[i].name,
            code:this.records[i].code,
            zone:this.records[i].zone,
            division:this.records[i].division,
            cluster:this.records[i].cluster,
            state:this.records[i].state
          })
          this.api.createBranch(bdata).subscribe(branchData => {
            if (branchData.status === 'error') {
              this.toastr.error(branchData.message);
              this.loader = false;
            } else {
              const data = JSON.stringify({
                "name":this.records[i].name,
                "code":this.records[i].code,
                "email":this.records[i].email,
                "password":(this.records[i].password).toString(),
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
              this.api.createUser(data).subscribe(result => {
                if (result.status === 'error') {
                  this.toastr.error(result.message);
                  this.loader = false;
                } else {
                  if(i == (this.records.length - 1)){
                    this.toastr.success("User Created Successfully");
                    this.loader = false;
                  }
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
      } else {
        this.toastr.error("Excel contains 0 data.");
      }
    }, 300);
    
  }

  edit(id: any) {
    this.router.navigate(['/admin/masters/shakti/action/edit'], {
      queryParams: {
        id: id
      }
    })
  }

  changeStatus(event:any,id:any,index:any){
    let status = 'Active';
      if(!event.target.checked){
        status = 'Inactive';
      }
      const data=JSON.stringify({
        status:status
      });
      this.api.updateBranch(data,id).subscribe(data=>{
        this.branches[index].status = status;
        if(status == 'Inactive'){
          this.toastr.success("Status Updated");
        }else if(status == 'Active'){
          this.toastr.success("Status Updated");
        }
      });
  }

  searchBranch(event:any){
    this.searchTerm = event.target.value;
    this.getBranch();
  }

  nextPage(){
    this.page += 1;
    this.getBranch();
  }

  previousPage(){
    this.page -= 1;
    this.getBranch();
  }

}
