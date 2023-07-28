import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramModulePipe } from 'src/app/core/pipes/program-module.pipe';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  module:any=[];
  counts:any=[];

  id:any="";
  index:any="";
  courseId:any="";
  courseIndex:any="";
  baseURL = environment.baseURL;
  constructor(public apiS:ApiService,public authS:AuthenticationService,public route:ActivatedRoute,private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    this.route.params.subscribe((data:any)=>{
      this.index = data.index;
      this.courseIndex = data.courseIndex;
      this.dataService.getMyLearningActivityData().subscribe(data=>{
        data.data[this.index].programId?.courses[this.courseIndex].courseId?.modules.forEach((element:any) => {
          element.percentage = 100;
        });
        this.module =  data.data[this.index].programId?.courses[this.courseIndex].courseId?.modules;
        this.dataService.getMyLearningActivityCoursesModulesDoneData(data.data[this.index].programId?._id,
          data.data[this.index].programId?.courses[this.courseIndex].courseId?._id).subscribe(res =>{
          this.counts = res.data
        })
      })

    });
  }


}
