import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ExcelService } from 'src/app/core/services/excel.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  breadCrumbItems!: Array<{}>;
  searchTerm = "";
  
  addS = false;
  update = false;
  name = "";
  nameError = "";
  codeError="";
  groups:any=[];
  groupId="";
  code=0;

  constructor(private title: Title,public http: HttpClient,public api:ApiService,public toast:ToastrService,public router:Router,public user: UserProfileService, public excelS: ExcelService) {
    this.title.setTitle("Group Master - Fusion Microfinance");
  }
  
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Master' },
      { label: 'Group' , active: true }
    ];
    this.getData();
  }

  getData(){
    this.groups=[];
    this.api.getIncrementalCodeGroup().subscribe(data=>{
      this.code = data.data.code;
    });
    this.api.allGroups().subscribe(data=>{
      this.groups=data.data;
    
    })
  }
  editData(id:any){
    this.router.navigate(['/pages/master/group/action/edit'],{
      queryParams:{id:id}
    });
    
  }

  delete(id:any){
    this.api.deleteGroup(id).subscribe(res=>{
      this.toast.success("Group Deleted");
      this.getData();
    });
  }
}
