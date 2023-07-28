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
  id:any="";
  index:any="";
  counts:any=[];

  courseId:any="";
  courseIndex:any="";
  cIndex:any="";
  baseURL = environment.baseURL;
  constructor(public apiS:ApiService,public authS:AuthenticationService,public route:ActivatedRoute,
    private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    const programModulePipe = new ProgramModulePipe();
    this.route.params.subscribe((data:any)=>{
      this.index = data.index;
      this.courseIndex = data.courseIndex;
      this.dataService.getMyProgramsData().subscribe(data=>{
        let modules = data.data[this.index].courses[this.courseIndex].module;
        modules.forEach((element:any) => {
          const per = programModulePipe.transform(element);
          element.percentage = per;
        })
        this.module = modules;
        this.dataService.getMyProgramsCoursesModulesDoneData(data.data[this.index]._id,data.data[this.index].courses[this.courseIndex].courseId?._id).subscribe(data=>{
          this.counts = data.data
         });
         const pdata = JSON.stringify({
          "courses.$.isWatch": true
        })
        this.apiS.updateProgramsWatchForCourse(pdata,data.data[this.index]._id,data.data[this.index].courses[this.courseIndex].courseId?._id).subscribe(result =>{
          data.data[this.index].courses[this.courseIndex].isWatch = true;
        })
      })
     
    });
   

  }

}
