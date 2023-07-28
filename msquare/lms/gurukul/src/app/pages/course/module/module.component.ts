import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseModulePipe } from 'src/app/core/pipes/course-module.pipe';
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
  courseId:any="";
  courseIndex:any="";
  baseURL = environment.baseURL;
  constructor(public apiS:ApiService,public authS:AuthenticationService,public route:ActivatedRoute,
    private dataService:DataService) { }

  ngOnInit(): void {
    this._fetchData();
  }

  _fetchData(){
    const courseModulePipe = new CourseModulePipe();
    this.route.params.subscribe((data:any)=>{
      this.courseIndex = data.index;
      this.dataService.getMyCoursesData().subscribe(data=>{
        let modules = data.data[this.courseIndex].modules;
        modules.forEach((element:any) => {
          const per = courseModulePipe.transform(element);
          element.percentage = per;
        })
        this.module = modules;
        this.dataService.getMyCoursesModulesDoneData(data.data[this.courseIndex]._id).subscribe(data=>{
          this.counts = data.data;
        });
        const cdata = JSON.stringify({
          "isWatch": true
        })
        this.apiS.updateCoursesWatchForCourse(cdata,data.data[this.courseIndex]._id).subscribe(result =>{
          data.data[this.courseIndex].isWatch = true;
        })
      })

    })
    
   
  }

  submitRating(id:any,item:any,rating:any){
    item.rating = rating;
    const data = JSON.stringify({
      "modules.$.rating":item.rating,
      "modules.$.submitRating":true 
    })
    this.apiS.updateCoursesWatchForModule(data,this.id,id).subscribe(data=>{
      if(data.status){
      }else{
      }
    })
  }

}
